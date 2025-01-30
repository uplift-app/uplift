import { render, screen } from "@testing-library/react";
import MoodInput from "./../components/MoodInput";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { format } from "date-fns";

// Mock the API functions
vi.mock("@/lib/ApiService", () => ({
  postMood: vi.fn(),
}));

const moodSelectLabel = "select a mood";
const timeSelectLabel = "select a time";

describe("MoodInput", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders correctly", () => {
    render(<MoodInput />);
    expect(screen.getByText("Mood")).toBeInTheDocument();
    expect(screen.getByText("How are you feeling?")).toBeInTheDocument();
    expect(screen.getByText(format(new Date(), "PPP"))).toBeInTheDocument();
    expect(screen.getByText(moodSelectLabel)).toBeInTheDocument();
    expect(screen.getByText(timeSelectLabel)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });
});
