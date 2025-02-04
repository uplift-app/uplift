import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./../../components/pages/HomePage";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

describe("HomePage", () => {
  it("renders the homepage correctly", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText("Uplift")).toBeInTheDocument();
    expect(screen.getByText("Track Your Moods & Behaviours")).toBeInTheDocument();
    expect(
      screen.getByText("Stay mindful of your emotions, recognize patterns, and gain insights into your well-being. Uplift your inner self.")
    ).toBeInTheDocument();
    expect(screen.getByText("📊 Visualize mood trends over time")).toBeInTheDocument();
    expect(screen.getByText("📅 Set reminders for daily check-ins")).toBeInTheDocument();
    expect(screen.getByText("🔒 Secure and private journaling")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Get Started" })).toBeInTheDocument();
  });

  it("navigates to dashboard when 'Get Started' is clicked", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const getStartedButton = screen.getByRole("link", { name: "Get Started" });

    expect(getStartedButton).toHaveAttribute("href", "/dashboard");

    await userEvent.click(getStartedButton);
  });
});
