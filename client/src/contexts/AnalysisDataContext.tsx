import {
  AnalysisData,
  AnalysisDataContextType,
  AnalysisDataProviderProps,
} from "@/lib/interfaces";
import { createContext, useContext, useState } from "react";

export const AnalysisDataContext = createContext<
  AnalysisDataContextType | undefined
>(undefined);

export const AnalysisDataProvider = ({
  children,
}: AnalysisDataProviderProps) => {
  const [analysisData, setAnalysisData] = useState<AnalysisData>(
    {} as AnalysisData
  );

  return (
    <AnalysisDataContext.Provider value={{ analysisData, setAnalysisData }}>
      {children}
    </AnalysisDataContext.Provider>
  );
};

export const useAnalysisDataContext = (): AnalysisDataContextType => {
  const context = useContext(AnalysisDataContext);
  if (!context) {
    throw new Error(
      "useAnalysisDataContext must be used within a AnalysisDataProvider"
    );
  }
  return context;
};
