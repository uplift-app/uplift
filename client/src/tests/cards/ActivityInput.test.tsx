import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ActivityInput from "../../components/cards/ActivityInput";
import { getActivityTypes, postActivity } from "@/lib/ApiService";
import { beforeEach, describe, expect, it, vi, Mock } from "vitest";
import { format } from "date-fns";

//! worth noting that AI has been used for debugging and working out how to test certain aspects (such as clerk) so please review the test files with a pinch of salt.

// Mock Clerk hooks so that useAuth returns a fake token.
// This prevents the "useAuth can only be used within the <ClerkProvider /> component" error.
vi.mock("@clerk/clerk-react", () => {
  return {
    // Provide a dummy ClerkProvider that simply renders children.
    ClerkProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    // Mock useAuth to return an object with getToken.
    useAuth: () => ({
      getToken: async () => "fake-token",
    }),
  };
});

// Mock the API functions
vi.mock("@/lib/ApiService", () => ({
  getActivityTypes: vi.fn(),
  postActivity: vi.fn(),
}));

const activitySelectLabel = "select an activity";
const timeSelectLabel = "select a time";
const mockActivityTypes = ["Running", "Swimming", "Add a custom activity"];

describe("ActivityInput", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders correctly", () => {
    render(<ActivityInput />);
    expect(screen.getByText("Activity")).toBeInTheDocument();
    expect(screen.getByText("What did you do?")).toBeInTheDocument();
    expect(screen.getByText(format(new Date(), "PPP"))).toBeInTheDocument();
    expect(screen.getByText(activitySelectLabel)).toBeInTheDocument();
    expect(screen.getByText("33 minutes.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("fetches activity types on mount", async () => {
    (getActivityTypes as Mock).mockResolvedValue(mockActivityTypes);

    render(<ActivityInput />);

    await waitFor(() => {
      expect(getActivityTypes).toHaveBeenCalledTimes(1);
    });

    // Open the select dropdown
    fireEvent.click(screen.getByText(activitySelectLabel));

    // Check if the activity types are rendered
    mockActivityTypes.forEach((activity) => {
      const elements = screen.getAllByText(activity);
      expect(elements.length).toBeGreaterThan(0);
      elements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
    });
  });

  it("updates activity duration when slider is changed", async () => {
    render(<ActivityInput />);

    // Find the slider
    const slider = screen.getByRole("slider");

    // Ensure initial value is correct
    expect(screen.getByText("33 minutes.")).toBeInTheDocument();

    // Trigger slider change via keyboard
    await userEvent.click(slider);
    await userEvent.keyboard(
      "{ArrowRight}{ArrowRight}{ArrowRight}{ArrowRight}{ArrowRight}"
    );

    // Wait for the UI update
    await waitFor(() => {
      expect(screen.getByText("38 minutes.")).toBeInTheDocument();
    });
  });

  it("updates activity type when an activity is selected", async () => {
    (getActivityTypes as Mock).mockResolvedValue(mockActivityTypes);

    render(<ActivityInput />);

    await waitFor(() => {
      expect(getActivityTypes).toHaveBeenCalledTimes(1);
    });

    // Open the select dropdown
    fireEvent.click(screen.getByText(activitySelectLabel));

    // Select an activity
    fireEvent.click(screen.getByText("Running"));

    expect(screen.getByText("Running")).toBeInTheDocument();
  });

  it('shows custom activity input when "Add a custom activity" is selected', async () => {
    (getActivityTypes as Mock).mockResolvedValue(mockActivityTypes);

    render(<ActivityInput />);

    await waitFor(() => {
      expect(getActivityTypes).toHaveBeenCalledTimes(1);
    });

    // Open the select dropdown
    fireEvent.click(screen.getByText(activitySelectLabel));

    // Find and select "Add a custom activity"
    const customActivityOptions = await screen.findAllByText(
      "Add a custom activity"
    );
    const customActivityOption =
      customActivityOptions[customActivityOptions.length - 1];
    expect(customActivityOption).toBeInTheDocument();
    fireEvent.click(customActivityOption);

    // Ensure the custom input for "Add a custom activity" is displayed
    await waitFor(() => {
      expect(screen.getByText("Add a custom activity")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Bowling")).toBeInTheDocument();
    });
  });

  it("submits the activity form", async () => {
    (getActivityTypes as Mock).mockResolvedValue(mockActivityTypes);
    (postActivity as Mock).mockResolvedValue({});

    render(<ActivityInput />);

    // Wait for activity types to be fetched
    await waitFor(() => {
      expect(getActivityTypes).toHaveBeenCalledTimes(1);
    });

    // Open the time select dropdown and select "All Day"
    fireEvent.click(screen.getByText(timeSelectLabel));
    const allDayOption = await screen.findByText("All Day");
    fireEvent.click(allDayOption);

    // Ensure the time selection has updated
    await waitFor(() => {
      expect(screen.getByText("All Day")).toBeInTheDocument();
    });

    // Open the activity select dropdown and select "Running"
    fireEvent.click(screen.getByText(activitySelectLabel));
    const runningOption = await screen.findByText("Running");
    fireEvent.click(runningOption);

    // Ensure the activity selection has updated
    await waitFor(() => {
      expect(screen.getByText("Running")).toBeInTheDocument();
    });

    // Find the slider
    const slider = screen.getByRole("slider");

    // Simulate increasing slider value using keyboard
    await userEvent.click(slider);
    await userEvent.keyboard(
      "{ArrowRight}{ArrowRight}{ArrowRight}{ArrowRight}{ArrowRight}"
    );

    // Wait for the duration value to update
    await waitFor(() => {
      expect(screen.getByText("38 minutes.")).toBeInTheDocument();
    });

    // Ensure the submit button is enabled
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeEnabled();

    // Prevent potential errors from scrollIntoView
    global.HTMLElement.prototype.scrollIntoView = vi.fn();

    // Click the submit button
    fireEvent.click(submitButton);

    // Verify postActivity is called with the correct form state and the fake token.
    await waitFor(() => {
      expect(postActivity).toHaveBeenCalledWith(
        {
          activityType: "Running",
          duration: 38,
          activityTime: "all day",
          date: expect.any(Date),
        },
        "fake-token"
      );
    });
  });

  it("handles API errors when fetching activity types", async () => {
    const mockError = new Error("Failed to fetch activity types");
    (getActivityTypes as Mock).mockRejectedValue(mockError);

    render(<ActivityInput />);

    await waitFor(() => {
      expect(getActivityTypes).toHaveBeenCalledTimes(1);
    });

    // Check if the error is logged
    expect(console.error).toHaveBeenCalledWith(
      "Failed to fetch activity types"
    );
  });

  it("handles API errors when submitting the activity form", async () => {
    const mockError = new Error("Failed to post activity");
    (getActivityTypes as Mock).mockResolvedValue(mockActivityTypes);
    (postActivity as Mock).mockRejectedValue(mockError);

    // Spy on console.error to verify error logging
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<ActivityInput />);

    // Wait for activity types to be fetched
    await waitFor(() => {
      expect(getActivityTypes).toHaveBeenCalledTimes(1);
    });

    // Open the time select dropdown and select "All Day"
    fireEvent.click(screen.getByText(timeSelectLabel));
    const allDayOption = await screen.findByText("All Day");
    fireEvent.click(allDayOption);

    // Ensure the time selection has updated
    await waitFor(() => {
      expect(screen.getByText("All Day")).toBeInTheDocument();
    });

    // Open the activity select dropdown using the test id
    const selectTrigger = screen.getByTestId("select-trigger");
    await userEvent.click(selectTrigger);

    // Select an activity
    const runningOption = await screen.findByText("Running");
    await userEvent.click(runningOption);

    // Click the submit button
    const submitButton = screen.getByRole("button", { name: "Submit" });
    await userEvent.click(submitButton);

    // Wait for the error to be logged
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    // Verify that the logged error contains "Failed to post activity"
    const loggedErrors = consoleErrorSpy.mock.calls.map((call) => call[0]);
    expect(
      loggedErrors.some((err) => err.includes("Failed to post activity"))
    ).toBe(true);

    // Restore console.error after the test
    consoleErrorSpy.mockRestore();
  });
});

