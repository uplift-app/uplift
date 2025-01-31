import "@testing-library/jest-dom/vitest";
import { afterEach, beforeAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  Element.prototype.hasPointerCapture = () => false;
  Element.prototype.setPointerCapture = () => false;
  Element.prototype.scrollIntoView = vi.fn();
});

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};