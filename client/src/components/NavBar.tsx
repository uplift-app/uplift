import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className='flex justify-between mb-8 border-b border-indigo-500 pb-4'>
      <Link to='/login'>Login</Link>
      <Link to='/'>Home</Link>
      <Link to='/dashboard'>Dashboard</Link>
    </div>
  );
}

export default Navbar;
