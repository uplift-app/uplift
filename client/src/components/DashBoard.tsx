import { useUser } from "@clerk/clerk-react";
import ActivityInput from "./ActivityInput";
import MoodInput from "./MoodInput";
import { Navigate } from "react-router-dom";

function DashBoard() {
  const { user, isSignedIn } = useUser();
  if (!isSignedIn) {
    return <Navigate to='/login' replace />;
  }

  return (
    <>
      <p className='justify-self-center'>Welcome, {user.username}!</p>
      <div className='flex items-center justify-center pt-2'>
        <ActivityInput />
        <MoodInput />
      </div>
    </>
  );
}

export default DashBoard;
