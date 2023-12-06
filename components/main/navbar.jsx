import Image from "next/image";
import { gameData } from "../../data/gameData";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import ProfilePicture from "./profilePicture";
import useLogout from "../../hooks/useLogout";

export default function Navbar({ colorPalette, setUser, user }) {
  const router = useRouter();
  const dropdown = useRef(null);
  const [open, setOpen] = useState(false);

  const { logout } = useLogout();

  // const btn_tw =
  //   "px-5 py-2 rounded-sm transition-all duration-150 text-green-900 text-[1.35em] font-galindo";
  const options = [
    {
      label: "My Slimes",
      onClick: () => {
        router.push("/play");
      },
    },
    {
      label: "Learn",
      onClick: () => {
        router.push("/courses");
      },
    },
    {
      label: "Settings",
      onClick: () => {
        router.push("/settings");
      },
    },
    {
      label: "Logout",
      onClick: () => {
        router.push("/login");
        logout();
        setUser(null);
      },
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        dropdown.current &&
        !dropdown.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("mouseup", handleClickOutside);
    return () => {
      window.removeEventListener("mouseup", handleClickOutside);
    };
  }, [open]);

  const userTypes = ["", "Student", "Parent", "Teacher", "Admin"];
  const userColors = ["#ffffff", "#e1eff0", "#e5e1f0", "#e1f0e3", "#f0e1ef"];

  return (
    <nav className="flex fixed z-50 top-0 flex-row px-10 bg-stone-100 items-center justify-between w-full h-[calc(4.9rem_-_4px)]">
      <section>
        <a
          className="flex justify-center w-1/3items-center h-auto transition-all duration-150 course-nav-title"
          href="/"
        >
          <Image
            src="/assets/icons/logo.png"
            alt="Slime Scholars Logo"
            height={0}
            width={0}
            sizes="100vw"
            className="w-[225px] h-auto pl-4"
          />
        </a>
      </section>
      <ul className="flex flex-row justify-around w-1/2 items-center">
        <li className="hidden lg:flex">
          <a
            className="text-green-900 text-lg font-normal hover:mx-4 duration-300 ease-in-out"
            href="/about"
          >
            About Us
          </a>
        </li>
        <li className="hidden lg:flex">
          <a
            className="text-green-900 text-lg font-normal hover:mx-4 duration-300 ease-in-out"
            href="/#details"
          >
            Parents
          </a>
        </li>
        <li className="hidden lg:flex">
          <a
            className="text-green-900 text-lg font-normal hover:mx-4 duration-300 ease-in-out"
            href="/#details"
          >
            Teachers
          </a>
        </li>
        <li className="hidden lg:flex">
          <a
            className="text-green-900 text-lg font-normal hover:mx-4 duration-300 ease-in-out"
            href="/#contact"
          >
            Contact Us
          </a>
        </li>
      </ul>
      {user ? (
        <section className="flex flex-row gap-1 font-bold text-xl items-center text-green-900">
          <a href="/play" className="rounded-sm bg-primary px-4 py-2 font-bold">
            Play
          </a>
        </section>
      ) : (
        <section className="hidden lg:flex lg:z-10 p-2 pr-5 gap-4">
          <a
            href="/Log In"
            className="rounded-sm bg-white ring-primary ring-2 text-primary px-4 py-2 font-bold hover:px-5 duration-300 ease-in-out"
          >
            Log In
          </a>
          <a
            href="/signup"
            className="rounded-sm bg-primary px-4 py-2 text-white ring-2 ring-primary font-bold hover:px-5 duration-300 ease-in-out"
          >
            Sign Up
          </a>
        </section>
      )}
    </nav>
  );
}
