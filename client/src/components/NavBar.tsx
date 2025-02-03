import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Navbar() {
  const { isSignedIn } = useUser();
  return (
    <div className='border-b-[3px] border-yellow-500'>
      <div className='flex p-4 items-center'>
        <div className='flex gap-8 font-semibold w-[16rem]'>
          <Link to='/dashboard' className='hover:underline'>
            Dashboard
          </Link>
          <Link to='/entries' className='hover:underline'>
            Entries
          </Link>
          <Link to='/' className='hover:underline'>
            Home
          </Link>
        </div>
        <div className='font-bold text-xl uppercase mx-auto'>Uplift</div>
        <div className='w-[16rem] flex justify-end'>
          {isSignedIn ? (
            <UserButton showName />
          ) : (
            <>
              <Link to='/register' className='px-2'>
                Sign up
              </Link>
              <Link to='/login'>Login</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
