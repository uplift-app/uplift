import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import ActivityInput from "../cards/ActivityInput";
import MoodInput from "../cards/MoodInput";
import { RecentEntries } from "../RecentEntries";

function EntriesPage() {
  const { user, isSignedIn } = useUser();
  if (user && isSignedIn) {
    return (
      <>
        <div className="grid xl:grid-cols-[2fr_3fr] gap-4 items-stretch pt-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center w-full component-style gap-2 grow">
              <p className="text-3xl font-medium tracking-tight">
                “One of the keys to happiness is a bad memory.”
              </p>
              <p className="italic text-lg">Rita Mae Brown</p>
            </div>
            <div className="w-full component-style grow">
              <h2 className="heading-style pb-2">
                Track your activity and mood
              </h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <ActivityInput />
                <MoodInput />
              </div>
            </div>
          </div>
          <RecentEntries />
        </div>
      </>
    );
  } else {
    return <RedirectToSignIn />;
  }
}

export default EntriesPage;
