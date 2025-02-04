import React from "react";
import { render, screen } from "@testing-library/react";
import { RadialChart } from "./../components/RadialChart";
import { describe, it, expect } from "vitest";

//! basic render test as currently cannot find a way to test the percentage values due to shadcn / recharts

describe("RadialChart Component", () => {
  it("renders the RadialChart with correct mood type and percentage", () => {
    const moodType = "happiness";
    const currentValue = 7;

    render(<RadialChart currentValue={currentValue} moodType={moodType} />);

    expect(screen.getByText("happiness")).toBeInTheDocument();
  });

  it("renders 100% when currentValue is at max", () => {
    render(<RadialChart currentValue={10} moodType="energy" />);

    expect(screen.getByText("energy")).toBeInTheDocument();
  });

  it("renders 0% when currentValue is at minimum", () => {
    render(<RadialChart currentValue={0} moodType="stress" />);

    expect(screen.getByText("stress")).toBeInTheDocument();
  });
});
