import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import EntriesPage from "@/components/pages/EntriesPage";
import { useUser } from "@clerk/clerk-react";
import { getQuote } from "@/lib/ApiService";

vi.mock("@clerk/clerk-react", () => ({
  useUser: vi.fn(),
  RedirectToSignIn: () => <div>Redirecting to sign in...</div>,
}));

vi.mock("@/lib/ApiService", () => ({
  getQuote: vi.fn(),
  errorHandler: vi.fn(),
}));

vi.mock("@/components/cards/ActivityInput", () => ({
  default: () => <div data-testid="activity-input">ActivityInput</div>,
}));

vi.mock("@/components/cards/MoodInput", () => ({
  default: () => <div data-testid="mood-input">MoodInput</div>,
}));

vi.mock("@/components/cards/RecentEntries", () => ({
  RecentEntries: () => <div data-testid="recent-entries">RecentEntries</div>,
}));

describe("EntriesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly when user is signed in", async () => {
    (useUser as Mock).mockReturnValue({
      isSignedIn: true,
      user: { username: "TestUser" },
    });
    await act(async () => {
      render(<EntriesPage />);
    });

    expect(
      screen.getByText("Track your activity and mood")
    ).toBeInTheDocument();
    expect(screen.getByTestId("activity-input")).toBeInTheDocument();
    expect(screen.getByTestId("mood-input")).toBeInTheDocument();
    expect(screen.getByTestId("recent-entries")).toBeInTheDocument();
  });

  it("renders a quote correctly when API returns a quote", async () => {
    (useUser as Mock).mockReturnValue({
      isSignedIn: true,
      user: { username: "TestUser" },
    });

    (getQuote as Mock).mockResolvedValue([
      {
        q: "One of the keys to happiness is a bad memory.",
        a: "Rita Mae Brown",
      },
    ]);

    await act(async () => {
      render(<EntriesPage />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("““One of the keys to happiness is a bad memory.”")
      ).toBeInTheDocument();
      expect(screen.getByText("Rita Mae Brown")).toBeInTheDocument();
    });
  });

  it("displays an error message when the quote API fails", async () => {
    (useUser as Mock).mockReturnValue({
      isSignedIn: true,
      user: { username: "TestUser" },
    });

    (getQuote as Mock).mockRejectedValue(new Error("API Error"));

    await act(async () => {
      render(<EntriesPage />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("““An error occurred while fetching the quote.”")
      ).toBeInTheDocument();
    });
  });

  it("redirects to sign-in when user is not authenticated", async () => {
    (useUser as Mock).mockReturnValue({
      user: null,
      isSignedIn: false,
    });

    await act(async () => {
      render(<EntriesPage />);
    });

    expect(screen.getByText("Redirecting to sign in...")).toBeInTheDocument();
  });
});
