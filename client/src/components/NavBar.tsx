import { UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const { isSignedIn } = useUser();
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <div className="flex px-[4%] md:px-8 items-center h-16 border-b-[3px] border-[#cab904] font-comfortaa">
        <div className="hidden md:flex gap-8 font-extrabold w-[16rem]">
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/entries" className="hover:underline">
            Entries
          </Link>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </div>
        <div className="md:hidden w-[16rem] relative">
          <img
            src="icons/navbar/hamburger.svg"
            alt=""
            className={
              (openMenu ? "opacity-0 scale-y-[0%] pointer-events-none" : "") +
              " z-[11] w-7 !h-7 transition-all duration-500 cursor-pointer"
            }
            onClick={() => setOpenMenu(true)}
          />
          <img
            src="icons/navbar/xmark.svg"
            alt=""
            className={
              (openMenu
                ? "opacity-1"
                : "opacity-0 rotate-90 pointer-events-none") +
              " absolute top-0 z-[11] w-7 !h-7 transition-all duration-500 cursor-pointer"
            }
            onClick={() => setOpenMenu(false)}
          />
        </div>
        <div className="font-bold text-xl uppercase mx-auto">Uplift</div>
        <div className="w-[16rem] flex justify-end font-extrabold">
          {isSignedIn ? (
            <UserButton
              showName
              appearance={{
                variables: {
                  borderRadius: "0.5rem",
                  fontFamily: "Nunito",
                },
                elements: {
                  userButtonOuterIdentifier: {
                    fontFamily: "Comfortaa",
                  },
                  userPreviewMainIdentifier: {
                    fontFamily: "Comfortaa",
                  },
                  userButtonTrigger__open: {
                    boxShadow: "none",
                    "&:focus, &:hover, &:active": {
                      boxShadow: "none",
                    },
                  },
                  userButtonTrigger: {
                    boxShadow: "none",
                    "&:focus, &:hover, &:active": {
                      boxShadow: "none",
                    },
                  },
                },
              }}
            />
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
      <div
        className={
          (openMenu ? "translate-x-0" : "-translate-x-full") +
          " fixed z-[10] top-16 left-0 md:hidden flex flex-col gap-8 py-6 px-10 bg-white transform transition-all duration-[500ms] rounded-br-lg font-comfortaa font-extrabold"
        }
      >
        <Link
          to="/dashboard"
          className="hover:underline"
          onClick={() => setOpenMenu(false)}
        >
          Dashboard
        </Link>
        <Link
          to="/entries"
          className="hover:underline"
          onClick={() => setOpenMenu(false)}
        >
          Entries
        </Link>
        <Link
          to="/"
          className="hover:underline"
          onClick={() => setOpenMenu(false)}
        >
          Home
        </Link>
      </div>
    </>
  );
}

export default Navbar;
