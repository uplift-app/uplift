import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AnalysisDataProvider } from "./contexts/AnalysisDataContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AnalysisDataProvider>
      <App />
    </AnalysisDataProvider>
  </StrictMode>
);
