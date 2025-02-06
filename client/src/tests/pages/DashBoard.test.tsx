import { render, screen } from "@testing-library/react";
import DashBoard from "./../../components/pages/DashBoard";
import { beforeEach, describe, expect, it, vi, Mock } from "vitest";

vi.mock("@/components/cards/ChartViewer", () => ({
  default: () => <div>ChartViewer</div>,
}));
vi.mock("@/components/PositiveEffects", () => ({
  default: () => <div>PositiveEffects</div>,
}));
vi.mock("@/components/MoodLevel", () => ({
  default: () => <div>MoodLevels</div>,
}));

vi.mock("@clerk/clerk-react", () => ({
  useUser: vi.fn(),
  useAuth: () => ({
    getToken: async () => "fake-token",
  }),
  RedirectToSignIn: () => <div>Redirecting...</div>,
}));
import { useUser } from "@clerk/clerk-react";

import { AnalysisDataProvider } from "./../../contexts/AnalysisDataContext";

describe("DashBoard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders dashboard when user is signed in", () => {

    (useUser as Mock).mockReturnValue({
      user: { username: "testUser" },
      isSignedIn: true,
    });

    render(
      <AnalysisDataProvider>
        <DashBoard />
      </AnalysisDataProvider>
    );

    expect(screen.getByText("Welcome, testUser!")).toBeInTheDocument();

    expect(screen.getByText("Average Mood Level")).toBeInTheDocument();

    expect(screen.getByText("MoodLevels")).toBeInTheDocument();
    expect(screen.getByText("ChartViewer")).toBeInTheDocument();
    expect(screen.getByText("PositiveEffects")).toBeInTheDocument();
  });

  it("renders RedirectToSignIn when user is not signed in", () => {
    (useUser as Mock).mockReturnValue({
      user: null,
      isSignedIn: false,
    });

    render(
      <AnalysisDataProvider>
        <DashBoard />
      </AnalysisDataProvider>
    );

    expect(screen.getByText("Redirecting...")).toBeInTheDocument();
  });
});
