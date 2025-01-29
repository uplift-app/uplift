import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Navbar() {
  const { isSignedIn } = useUser();
  return (
    <div className='border-b-4 border-yellow-500'>
      <div className='flex justify-between p-4'>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/'>Home</Link>
        {isSignedIn ? (
          <SignOutButton>
            <button className='text-red-500'>Logout</button>
          </SignOutButton>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
