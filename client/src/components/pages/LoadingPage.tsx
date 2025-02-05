import { RotatingLines } from "react-loader-spinner";
function LoadingPage() {
  return (
    <div>
      <RotatingLines
        strokeColor='grey'
        strokeWidth='5'
        animationDuration='0.75'
        width='96'
        visible={true}
      />
      <p>Your data is loading, please wait.</p>
    </div>
  );
}

export default LoadingPage;
