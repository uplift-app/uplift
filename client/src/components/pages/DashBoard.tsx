import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import ActivityInput from "../ActivityInput";
import MoodInput from "../MoodInput";
import ChartViewer from "../ChartViewer";

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
        </div>
      </>
    );
  } else {
    return <RedirectToSignIn />;
  }
}

export default DashBoard;
