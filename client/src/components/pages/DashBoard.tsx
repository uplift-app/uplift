import { formatName } from "@/lib/utils";
import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import ChartViewer from "../cards/ChartViewer";
import IntensityLevels from "../cards/IntensityLevel";
import MoodLevels from "../cards/MoodLevel";
import PositiveEffects from "../cards/PositiveEffects";
import YearOfPixels from "../YearOfPixels";

function DashBoard() {
  const { user, isSignedIn } = useUser();
  if (user && isSignedIn) {
    const username = formatName(user.username || "User");
    return (
      <>
        <p className="text-center pb-4 text-4xl">Welcome, {username}!</p>
        <div className="grid xl:grid-cols-[4fr_5fr] gap-4">
          <div className="component-style rounded-lg p-4 xl:col-span-2">
            <h2 className="heading-style pb-2">Average Mood Level</h2>
            <MoodLevels />
          </div>
          <div className="component-style rounded-lg p-4 xl:col-span-2">
            <h2 className="heading-style pb-2">Average Mood Intensities</h2>
            <IntensityLevels />
          </div>
          <PositiveEffects />
          <YearOfPixels />
          <ChartViewer />
        </div>
      </>
    );
  } else {
    return <RedirectToSignIn />;
  }
}

export default DashBoard;
