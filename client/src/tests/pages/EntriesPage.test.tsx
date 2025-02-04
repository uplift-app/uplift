import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import EntriesPage from "@/components/pages/EntriesPage";
import { useUser } from "@clerk/clerk-react";


vi.mock("@clerk/clerk-react", () => ({
  useUser: vi.fn(),
  RedirectToSignIn: () => <div>Redirecting to sign in...</div>,
}));

vi.mock("@/components/cards/ActivityInput", () => ({
  default: () => <div data-testid="activity-input">ActivityInput</div>,
}));

vi.mock("@/components/cards/MoodInput", () => ({
  default: () => <div data-testid="mood-input">MoodInput</div>,
}));

vi.mock("@/components/RecentEntries", () => ({
  RecentEntries: () => <div data-testid="recent-entries">RecentEntries</div>,
}));

describe("EntriesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly when user is signed in", () => {
    (useUser as Mock).mockReturnValue({
      user: { username: "testuser" },
      isSignedIn: true,
    });

    render(<EntriesPage />);

    expect(screen.getByText("Welcome, testuser!")).toBeInTheDocument();
    expect(screen.getByText("Track your activity and mood")).toBeInTheDocument();
    expect(screen.getByTestId("activity-input")).toBeInTheDocument();
    expect(screen.getByTestId("mood-input")).toBeInTheDocument();
    expect(screen.getByTestId("recent-entries")).toBeInTheDocument();
  });

  it("renders quote section", () => {
    (useUser as Mock).mockReturnValue({
      user: { username: "testuser" },
      isSignedIn: true,
    });

    render(<EntriesPage />);

    expect(screen.getByText("“One of the keys to happiness is a bad memory.”")).toBeInTheDocument();
    expect(screen.getByText("Rita Mae Brown")).toBeInTheDocument();
  });

  it("redirects to sign-in when user is not authenticated", () => {
    (useUser as Mock).mockReturnValue({
      user: null,
      isSignedIn: false,
    });

    render(<EntriesPage />);

    expect(screen.getByText("Redirecting to sign in...")).toBeInTheDocument();
  });
});
