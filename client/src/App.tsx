import { useEffect } from "react";
import ActivityInput from "./components/ActivityInput";
import MoodInput from "./components/MoodInput";
import { getAnalysis } from "./lib/ApiService";
import { useAnalysisDataContext } from "./contexts/AnalysisDataContext";

function App() {
  const { setAnalysisData } = useAnalysisDataContext();
  useEffect(() => {
    getAnalysis().then((data) => setAnalysisData(data));
  }, []);

  return (
    <div className="flex items-center justify-center">
      <ActivityInput />
      <MoodInput />
    </div>
  );
}

export default App;
