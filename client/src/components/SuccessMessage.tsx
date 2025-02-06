import { Button } from "./ui/button";

interface SuccessMessageProps {
  edit?: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SuccessMessage({
  edit = false,
  setSuccess,
}: SuccessMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center my-12 gap-4 mx-auto lg:w-[11.6875rem]">
      <img src="icons/check.svg" alt="" className="w-10" />
      <p className="text-center">
        Your entry was successfully {edit ? "edited" : "uploaded"}!
      </p>
      <Button
        className="w-full justify-self-end"
        onClick={() => setSuccess(false)}
      >
        Close
      </Button>
    </div>
  );
}
