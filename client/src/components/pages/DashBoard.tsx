import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import ChartViewer from "../cards/ChartViewer";
import PositiveEffects from "../PositiveEffects";
import MoodLevels from "../MoodLevel";
import YearOfPixels from "../YearOfPixels";

function DashBoard() {
  const { user, isSignedIn } = useUser();
  if (user && isSignedIn) {
    return (
      <>
        <p className="text-center pb-4 text-4xl">Welcome, {user.username}!</p>
        <div className="grid xl:grid-cols-[2fr_3fr] gap-4">
          <div className="component-style rounded-lg p-4 xl:col-span-2">
            <h2 className="heading-style pb-2">Average Mood Level</h2>
            <MoodLevels />
          </div>
          <PositiveEffects />
          <YearOfPixels />
          <div className="rounded-lg xl:col-span-2">
          <ChartViewer />
          </div>
        </div>
      </>
    );
  } else {
    return <RedirectToSignIn />;
  }
}

export default DashBoard;
