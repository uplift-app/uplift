import { SignUp } from "@clerk/clerk-react";

function Login() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-3xl font-bold mb-6' />
      <SignUp />
    </div>
  );
}

export default Login;
