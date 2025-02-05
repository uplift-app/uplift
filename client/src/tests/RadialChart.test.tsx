import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { RadialChart } from "./../components/inputs/RadialChart";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as utils from "@/lib/utils";

//! not testing for % values in the charts as this would involve mocking recharts

vi.mock("@/lib/utils", async () => {
  const actual = await vi.importActual<typeof utils>("@/lib/utils");
  return {
    ...actual,
    formatName: vi.fn(
      (name: string) => name.charAt(0).toUpperCase() + name.slice(1)
    ),
  };
});

describe("RadialChart Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the RadialChart with correct mood type", async () => {
    render(<RadialChart currentValue={7} moodType="happiness" />);

    await waitFor(() => {
      expect(screen.getByText("Happiness")).toBeInTheDocument();
    });
  });
});
