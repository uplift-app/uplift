import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MoodInput from "../../components/cards/MoodInput";
import { errorHandler, postMood } from "@/lib/ApiService";
import { beforeEach, describe, expect, it, vi, Mock } from "vitest";
import { format } from "date-fns";

vi.mock("@clerk/clerk-react", () => {
  return {
    ClerkProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

vi.mock("@/lib/ApiService", () => ({
  postMood: vi.fn(),
  errorHandler: vi.fn(),
}));

const moodSelectLabel = "Select a mood";
const timeSelectLabel = "Select a time";

describe("MoodInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders correctly with initial state", () => {
    render(<MoodInput />);
    // Header texts
    expect(screen.getByText("Mood")).toBeInTheDocument();
    expect(screen.getByText("How are you feeling?")).toBeInTheDocument();
    // Date is rendered (formatted with date-fns)
    expect(screen.getByText(format(new Date(), "PPP"))).toBeInTheDocument();
    // Select placeholders for mood and time
    expect(screen.getByText(moodSelectLabel)).toBeInTheDocument();
    expect(screen.getByText(timeSelectLabel)).toBeInTheDocument();
    // The submit button should be rendered and initially disabled because required fields are empty
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("updates moodTime selection", async () => {
    render(<MoodInput />);
    // Open the moodTime select dropdown
    fireEvent.click(screen.getByText(timeSelectLabel));
    // Select an option (e.g., "Morning")
    const morningOption = await screen.findByText("Morning");
    fireEvent.click(morningOption);
    // The selected moodTime ("Morning") should be displayed
    await waitFor(() => {
      expect(screen.getByText("Morning")).toBeInTheDocument();
    });
  });

  it("updates moodType selection", async () => {
    render(<MoodInput />);
    // Open the moodType select dropdown
    fireEvent.click(screen.getByText(moodSelectLabel));
    // Select "Happiness" from the options
    const happinessOption = await screen.findByText("Happiness");
    fireEvent.click(happinessOption);
    // "Happiness" should now be shown as the selected mood type
    await waitFor(() => {
      expect(screen.getByText("Happiness")).toBeInTheDocument();
    });
  });

  it("updates slider intensity and emoji", async () => {
    render(<MoodInput />);
    // The slider should be in the document (it has role "slider")
    const slider = screen.getByRole("slider");
    // Initially, intensity is 5 so the emoji should be the one for 5 (code point 0x1f610)
    const neutralEmoji = String.fromCodePoint(0x1f610);
    expect(screen.getByText(neutralEmoji)).toBeInTheDocument();

    // Simulate a slider change by sending an ArrowRight event to increase intensity
    await userEvent.click(slider);
    // Increase intensity from 5 to 6
    await userEvent.keyboard("{ArrowRight}");
    // For intensity 6, the emoji should update to the one with code point 0x1f60a (smiling face)
    const smileEmoji = String.fromCodePoint(0x1f60a);
    await waitFor(() => {
      expect(screen.getByText(smileEmoji)).toBeInTheDocument();
    });
  });

  it("enables submit button when moodTime and moodType are selected", async () => {
    render(<MoodInput />);
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeDisabled();

    // Select a moodTime option
    fireEvent.click(screen.getByText(timeSelectLabel));
    const allDayOption = await screen.findByText("All Day");
    fireEvent.click(allDayOption);
    await waitFor(() => {
      expect(screen.getByText("All Day")).toBeInTheDocument();
    });

    // Select a moodType option
    fireEvent.click(screen.getByText(moodSelectLabel));
    const stressOption = await screen.findByText("Stress");
    fireEvent.click(stressOption);
    await waitFor(() => {
      expect(screen.getByText("Stress")).toBeInTheDocument();
    });

    // Now the submit button should be enabled
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });

  it("submits the mood form and resets the form on success", async () => {
    (postMood as Mock).mockResolvedValue({});
    render(<MoodInput />);

    // Select moodTime ("Evening")
    fireEvent.click(screen.getByText(timeSelectLabel));
    const eveningOption = await screen.findByText("Evening");
    fireEvent.click(eveningOption);
    await waitFor(() => {
      expect(screen.getByText("Evening")).toBeInTheDocument();
    });

    // Select moodType ("Energy")
    fireEvent.click(screen.getByText(moodSelectLabel));
    const energyOption = await screen.findByText("Energy");
    fireEvent.click(energyOption);
    await waitFor(() => {
      expect(screen.getByText("Energy")).toBeInTheDocument();
    });

    // Adjust the slider intensity from 5 to 7.
    const slider = screen.getByRole("slider");
    await userEvent.click(slider);
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");
    // For intensity 7, the emoji should be the one with code point 0x1f61d
    const intensity7Emoji = String.fromCodePoint(0x1f61d);
    await waitFor(() => {
      expect(screen.getByText(intensity7Emoji)).toBeInTheDocument();
    });

    // The submit button should now be enabled.
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeEnabled();

    // Click the submit button.
    await userEvent.click(submitButton);

    // Verify that postMood is called with the expected payload and the fake token.
    await waitFor(() => {
      expect(postMood).toHaveBeenCalledWith(
        expect.objectContaining({
          moodType: "energy",
          intensity: 7,
          moodTime: "evening",
          date: expect.any(Date),
        })
      );
    });

    // On successful submission, the form should reset, disabling the submit button.
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it("handles errors during mood submission by logging the error", async () => {
    const error = "Failed to post mood";
    (postMood as Mock).mockRejectedValue(error);

    // const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<MoodInput />);

    // Set moodTime and moodType so that the form can be submitted.
    fireEvent.click(screen.getByText(timeSelectLabel));
    const afternoonOption = await screen.findByText("Afternoon");
    fireEvent.click(afternoonOption);
    await waitFor(() => {
      expect(screen.getByText("Afternoon")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(moodSelectLabel));
    const happinessOption = await screen.findByText("Happiness");
    fireEvent.click(happinessOption);
    await waitFor(() => {
      expect(screen.getByText("Happiness")).toBeInTheDocument();
    });

    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeEnabled();

    // Click the submit button. The error is now caught and logged.
    await userEvent.click(submitButton);

    // Verify that console.error was called with the expected error message.
    await waitFor(() => {
      expect(errorHandler).toHaveBeenCalledWith("Failed to post mood");
    });
  });
});
