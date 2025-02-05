import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import ActivityInput from "../cards/ActivityInput";
import MoodInput from "../cards/MoodInput";
import { RecentEntries } from "../cards/RecentEntries";
import { formatName } from "@/lib/utils";
import { useEffect, useState } from "react";
import { errorHandler, getQuote } from "@/lib/ApiService";

function EntriesPage() {
  const { user, isSignedIn } = useUser();
  const [quote, setQuote] = useState<String | null>(null);
  const [author, setAuthor] = useState<String | null>(null);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await getQuote();
        if (!response) {
          throw new Error("Failed to fetch quote");
        } else {
          setQuote(response[0].q);
          setAuthor(response[0].a);
        }
      } catch (error) {
        errorHandler(error);
        setQuote("An error occurred while fetching the quote.");
      }
    }

    fetchQuote();
  }, []);

  if (user && isSignedIn) {
    let username = user.username ? user.username : "User";
    username = formatName(username);
    return (
      <>
        <div className="grid xl:grid-cols-[2fr_3fr] gap-4 items-stretch pt-2">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col justify-center items-center w-full component-style gap-2 grow">
              Quote of the day
              <p className="text-3xl font-medium tracking-tight text-center">
                “{quote || "Loading quote..."}”
              </p>
              <p className="italic text-lg">{author || ""}</p>
            </div>
            <div className="w-full component-style grow flex flex-col">
              <h2 className="heading-style pb-2">
                Track your activity and mood
              </h2>
              <div className="flex flex-col sm:flex-row gap-2 justify-self-center ">
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
