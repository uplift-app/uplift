import { useEffect } from "react";
import ActivityInput from "./components/ActivityInput";
import ChartViewer from "./components/ChartViewer";
import MoodInput from "./components/MoodInput";
import { getAnalysis } from "./lib/ApiService";
import { useAnalysisDataContext } from "./contexts/AnalysisDataContext";
import DataInsights from "./components/DataInsights";
import PositiveEffects from "./components/PositiveEffects";

function App() {
  const { setAnalysisData } = useAnalysisDataContext();
  useEffect(() => {
    getAnalysis().then((data) => setAnalysisData(data));
  }, []);

  return (
    <div className="flex items-center justify-center">
      <PositiveEffects />
      <DataInsights />
      {/* <ActivityInput />
      <MoodInput /> 
      <ChartViewer /> */}
    </div>
  );
}

export default App;
