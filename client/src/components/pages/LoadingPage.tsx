import { RotatingLines } from "react-loader-spinner";
function LoadingPage() {
  return (
    <div>
      <div className='justify-self-center'>
        <RotatingLines
          strokeColor='hsl(var(--fontColor)'
          strokeWidth='5'
          animationDuration='0.75'
          width='96'
          visible={true}
        />
      </div>
      <p className='text-center'>This content is loading, please wait.</p>
    </div>
  );
}

export default LoadingPage;
