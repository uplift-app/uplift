import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import ActivityInput from "../cards/ActivityInput";
import MoodInput from "../cards/MoodInput";
import ChartViewer from "../cards/ChartViewer";

function DashBoard() {
  const { user, isSignedIn } = useUser();
  if (user && isSignedIn) {
    const username = user.username
      ? user.username
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "User";
    return (
      <>
        <p className='justify-self-center text-4xl'>Welcome, {username}!</p>
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
