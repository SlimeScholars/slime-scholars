import Image from "next/image";
import Link from "next/link";
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
        <Link
          className="flex justify-center h-auto transition-all duration-200 course-nav-title"
          href="/"
        >
          <Image
            src="/assets/icons/logo.svg"
            alt="Slime Scholars Logo"
            height={0}
            width={0}
            sizes="100vw"
            className="w-[225px] h-auto pl-4"
          />
        </Link>
      </section>
      <ul className="flex flex-row justify-around w-1/2 items-center">
        <li className="hidden lg:flex">
          <Link
            className="text-green-900 text-lg font-normal hover:tracking-wider hover:font-bold duration-300 ease-in-out"
            href="/about"
          >
            About Us
          </Link>
        </li>
        <li className="hidden lg:flex">
          <Link
            className="text-green-900 text-lg font-normal hover:tracking-wider hover:font-bold duration-300 ease-in-out"
            href="/#details"
          >
            Parents
          </Link>
        </li>
        <li className="hidden lg:flex">
          <Link
            className="text-green-900 text-lg font-normal hover:tracking-wider hover:font-bold duration-300 ease-in-out"
            href="/#details"
          >
            Teachers
          </Link>
        </li>
        <li className="hidden lg:flex">
          <Link
            className="text-green-900 text-lg font-normal hover:tracking-wider hover:font-bold duration-300 ease-in-out"
            href="/#contact"
          >
            Contact Us
          </Link>
        </li>
      </ul>
      {user ? (
        <section className="flex flex-row gap-1 font-bold text-xl items-center text-green-900">
          <Link
            href="/play"
            className="btn-animated px-6 my-1 py-3 bg-green-800/80 flex items-center justify-center"
          >
            <svg>
              <rect x="0" y="0" fill="none" width="100%" height="100%" />
            </svg>
            <p className="text-white font-extrabold text-lg">Play</p>
          </Link>
        </section>
      ) : (
        <section className="hidden lg:flex lg:z-10 p-2 pr-5 gap-4">
          <Link
            href="/login"
            className="btn-animated px-6 my-1 py-3 bg-green-800/80 flex items-center justify-center"
          >
            <svg>
              <rect x="0" y="0" fill="none" width="100%" height="100%" />
            </svg>
            <p className="text-white font-extrabold text-lg">Log In</p>
          </Link>
          <Link
            href="/signup"
            className="btn-animated px-6 my-1 py-3 bg-primary/80 flex items-center justify-center"
          >
            <svg>
              <rect x="0" y="0" fill="none" width="100%" height="100%" />
            </svg>
            <p className="text-white font-extrabold text-lg">Sign Up</p>
          </Link>
        </section>
      )}
    </nav>
  );
}
