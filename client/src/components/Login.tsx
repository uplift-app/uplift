import { SignIn } from "@clerk/clerk-react";

function Login() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-3xl font-bold mb-6' />
      <SignIn />
    </div>
  );
}

export default Login;
