import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import ChartViewer from "../cards/ChartViewer";
import PositiveEffects from "../PositiveEffects";
import MoodLevels from "../MoodLevel";

function DashBoard() {
  const { user, isSignedIn } = useUser();
  if (user && isSignedIn) {
    return (
      <>
        <p className="text-center p-4 text-4xl">Welcome, {user.username}!</p>
        <div className="w-fit mx-auto bg-[#e3e8ff] rounded-lg p-4">
          <h2 className="text-black font-semibold text-lg pb-2">
            Average Mood Level
          </h2>
          <MoodLevels />
        </div>
        <div className="flex gap-4 justify-center items-stretch py-4">
          <ChartViewer />
          <PositiveEffects />
        </div>
      </>
    );
  } else {
    return <RedirectToSignIn />;
  }
}

export default DashBoard;
