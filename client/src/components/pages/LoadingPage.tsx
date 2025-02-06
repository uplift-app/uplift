import { RotatingLines } from "react-loader-spinner";
function LoadingPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="justify-self-center">
        <RotatingLines
          strokeColor="hsl(var(--fontColor)"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
      <div className="text-center">This content is loading, please wait.</div>
    </div>
  );
}

export default LoadingPage;
