import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import ActivityInput from "../cards/ActivityInput";
import MoodInput from "../cards/MoodInput";
import { RecentEntries } from "../RecentEntries";
import { formatName } from "@/lib/utils";

function EntriesPage() {
  /**
   * tiles and component backgrounds
   * primary card: #e3e8ff
   * secondary card: #f3e8ff
   *
   * text colors
   * Primary Text (Headings & Important Labels): #1e1e2e (dark navy)
   * Secondary Text (Subheadings, Descriptions): #374151 (grayish dark blue)
   * Muted Text (Dates, Less Important Info): #64748b (cool gray)
   *
   * accent colors
   * Happy: #22c55e (green)
   * Neutral: #f59e0b (orange)
   * Sad: #ef4444 (red)
   */
  const { user, isSignedIn } = useUser();
  if (user && isSignedIn) {
    let username = user.username ? user.username : "User";
    username = formatName(username);
    return (
      <>
        <p className='text-center text-4xl py-4'>Welcome, {username}!</p>

        <div className='flex gap-4 px-[10rem]'>
          <div className='w-fit flex flex-col items-center gap-4'>
            <div className='flex flex-col items-center w-full bg-[#e0f2fe] text-black rounded-lg p-8 gap-2 shadow-md'>
              <p className='text-3xl'>
                “One of the keys to happiness is a bad memory.”
              </p>
              <p className='italic text-lg'>Rita Mae Brown</p>
            </div>
            <div className='w-full bg-[#e0f2fe] rounded-lg p-4 shadow-md'>
              <h2 className='text-black font-semibold text-lg'>
                Track your activity and mood
              </h2>
              <div className='flex justify-between'>
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
