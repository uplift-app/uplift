import { act, render, screen } from "@testing-library/react";
import DashBoard from "./../../components/pages/DashBoard";
import { beforeEach, describe, expect, it, vi, Mock } from "vitest";
import { useUser } from "@clerk/clerk-react";
import { AnalysisDataProvider } from "./../../contexts/AnalysisDataContext";

// ✅ Mock Clerk authentication
vi.mock("@clerk/clerk-react", () => ({
  useUser: vi.fn(),
  RedirectToSignIn: () => <div>Redirecting...</div>,
}));

// ✅ Mock child components
vi.mock("@/components/cards/ChartViewer", () => ({
  default: () => <div>ChartViewer</div>,
}));
vi.mock("@/components/cards/PositiveEffects", () => ({
  default: () => <div>PositiveEffects</div>,
}));
vi.mock("@/components/cards/MoodLevel", () => ({
  default: () => <div data-testid="mock-mood-levels">MoodLevels</div>,
}));
vi.mock("@/components/YearOfPixels", () => ({
  default: () => <div>YearOfPixels</div>,
}));

vi.mock("@/components/ui/carousel", () => ({
  __esModule: true,
  Carousel: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-carousel">{children}</div>
  ),
  CarouselContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-carousel-content">{children}</div>
  ),
  CarouselItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-carousel-item">{children}</div>
  ),
  CarouselPrevious: () => (
    <button data-testid="mock-carousel-prev">Prev</button>
  ),
  CarouselNext: () => <button data-testid="mock-carousel-next">Next</button>,
}));

describe("DashBoard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders dashboard when user is signed in", async () => {
    (useUser as Mock).mockReturnValue({
      user: { username: "testUser" },
      isSignedIn: true,
    });

    await act(async () => {
      render(
        <AnalysisDataProvider>
          <DashBoard />
        </AnalysisDataProvider>
      );
    });

    expect(screen.getByText("Welcome, testUser!")).toBeInTheDocument();
    expect(screen.getByText("Average Mood Level")).toBeInTheDocument();
    expect(screen.getByTestId("mock-mood-levels")).toBeInTheDocument();
    expect(screen.getByText("ChartViewer")).toBeInTheDocument();
    expect(screen.getByText("PositiveEffects")).toBeInTheDocument();
    expect(screen.getByText("YearOfPixels")).toBeInTheDocument();
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
