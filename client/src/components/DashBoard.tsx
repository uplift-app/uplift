import ActivityInput from "./ActivityInput";
import MoodInput from "./MoodInput";

function DashBoard() {
  return (
    <div className='  flex items-center justify-center'>
      <ActivityInput />
      <MoodInput />
    </div>
  );
}

export default DashBoard;
