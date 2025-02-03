import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import ActivityInput from "../cards/ActivityInput";
import MoodInput from "../cards/MoodInput";
import ChartViewer from "../cards/ChartViewer";
import YearOfPixels from "../YearOfPixels";

function DashBoard() {
  const { user, isSignedIn } = useUser();
  if (user && isSignedIn) {
    return (
      <>
        <p className='justify-self-center text-4xl'>
          Welcome, {user.username}!
        </p>
        <div className='flex items-center justify-center pt-2'>
          <ActivityInput />
          <MoodInput />
          <ChartViewer />
          <YearOfPixels />
        </div>
      </>
    );
  } else {
    return <RedirectToSignIn />;
  }
}

export default DashBoard;
