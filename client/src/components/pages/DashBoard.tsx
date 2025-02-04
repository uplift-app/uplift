import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import ChartViewer from "../cards/ChartViewer";
import { formatName } from "@/lib/utils";
import PositiveEffects from "../cards/PositiveEffects";
import MoodLevels from "../cards/MoodLevel";
import IntensityLevels from "../cards/IntensityLevel";
import YearOfPixels from "../YearOfPixels";

function DashBoard() {
  const { user, isSignedIn } = useUser();
  if (user && isSignedIn) {
    let username = user.username ? user.username : "User";
    username = formatName(username);
    return (
      <>
        <p className='text-center pb-4 text-4xl'>Welcome, {username}!</p>
        <div className='grid xl:grid-cols-[2fr_3fr] gap-4'>
          <div className='component-style rounded-lg p-4 xl:col-span-2'>
            <h2 className='heading-style pb-2'>Average Mood Levels</h2>
            <MoodLevels />
          </div>
          <div className='component-style rounded-lg p-4 xl:col-span-2'>
            <h2 className='heading-style pb-2'>Average Mood Intensities</h2>
            <IntensityLevels />
          </div>
          <ChartViewer />
          <PositiveEffects />
          <YearOfPixels />
          <div className='rounded-lg xl:col-span-2'>
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
