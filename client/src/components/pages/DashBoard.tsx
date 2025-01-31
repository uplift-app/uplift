import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import ActivityInput from "../cards/ActivityInput";
import MoodInput from "../cards/MoodInput";
import ChartViewer from "../cards/ChartViewer";
import { formatName } from "@/lib/utils";

function DashBoard() {
  const { user, isSignedIn } = useUser();
  if (user && isSignedIn) {
    let username = user.username ? user.username : "User";
    username = formatName(username);
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
