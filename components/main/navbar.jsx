import React, { useState, useRef, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useLogout from "../../hooks/useLogout";
import { useWindowSize } from "@uidotdev/usehooks";
import { FiMenu } from "react-icons/fi";

export default function Navbar({ colorPalette, setUser, user }) {
  const router = useRouter();
  const { logout } = useLogout();
  const [isMobile, setIsMobile] = useState(false);
  const isClient = typeof window === "object";
  const [width, setWidth] = useState(
    isClient ? window.innerWidth : 10000, // default value for SSR
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (width < 1024 && !isMobile) {
      setIsMobile(true);
    } else if (width >= 1024 && isMobile) {
      setIsMobile(false);
    }

  }, [width]);

  const updateWindowSize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setIsMobile(true);
    }

    if (isClient) {
      // Add event listener on component mount
      window.addEventListener("resize", updateWindowSize);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener("resize", updateWindowSize);
      }
    }

  }, [isClient])

  if (isMobile) {
    return (
      <nav
        className={
          "fixed z-50 top-0 px-3 sm:px-5 md:px-8 bg-bg-light items-center justify-between w-full pb-5 overflow-hidden duration-500 ease-out " +
          (isMenuOpen ? "max-h-[600px]" : "max-h-20")
        }
      >
        <section className="w-full h-20 flex flex-row justify-between items-center">
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
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mr-4">
            <FiMenu className="text-3xl text-primary" />
          </button>
        </section>
        <ul className="flex flex-col bg-bg-light w-full justify-start font-bold items-start space-y-5 h-auto px-10 py-4">
          <li className="flex flex-row w-full justify-center">
            <Link
              className="text-green-900 w-full text-lg font-normal hover:tracking-wider hover:font-bold duration-300 ease-in-out"
              href="/about"
            >
              About Us
            </Link>
          </li>
          <li className="flex flex-row w-full justify-center">
            <Link
              className="text-green-900 w-full  text-lg font-normal hover:tracking-wider hover:font-bold duration-300 ease-in-out"
              href="/#details"
            >
              Parents
            </Link>
          </li>
          <li className="flex flex-row w-full justify-center">
            <Link
              className="text-green-900 w-full  text-lg font-normal hover:tracking-wider hover:font-bold duration-300 ease-in-out"
              href="/#details"
            >
              Teachers
            </Link>
          </li>
          <li className="flex flex-row w-full justify-center">
            <Link
              className="text-green-900 w-full  text-lg font-normal hover:tracking-wider hover:font-bold duration-300 ease-in-out"
              href="/#contact"
            >
              Contact Us
            </Link>
          </li>
        </ul>
        {user ? (
          <div className="w-full px-5 gap-5">
            <Link
              href="/play"
              className="px-6 my-1 py-3 bg-green-800/80 flex items-center justify-center"
            >
              <p className="text-white font-extrabold text-lg">Play</p>
            </Link>
            <button
              className="px-6 my-1 py-3 bg-primary/80 flex items-center justify-center"
              onClick={logout}
            >
              <p className="text-white font-extrabold text-lg">Log Out</p>
            </button>
          </div>
        ) : (
          <div className="w-full px-5 gap-5">
            <Link
              href="/login"
              className="px-6 my-1 py-3 bg-green-800/80 flex items-center justify-center"
            >
              <p className="text-white font-extrabold text-lg">Log In</p>
            </Link>
            <Link
              href="/signup"
              className="px-6 my-1 py-3 bg-primary/80 flex items-center justify-center"
            >
              <p className="text-white font-extrabold text-lg">Sign Up</p>
            </Link>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav className="flex fixed z-50 top-0 flex-row px-10 bg-bg-light items-center justify-between w-full h-20">
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
          <button
            className="btn-animated px-6 my-1 py-3 bg-primary/80 flex items-center justify-center"
            onClick={logout}
          >
            <svg>
              <rect x="0" y="0" fill="none" width="100%" height="100%" />
            </svg>
            <p className="text-white font-extrabold text-lg">Log Out</p>
          </button>
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
            <p className="text-white font-extrabold text-lg whitespace-nowrap">
              Log In
            </p>
          </Link>
          <Link
            href="/signup"
            className="btn-animated px-6 my-1 py-3 bg-primary/80 flex items-center justify-center"
          >
            <svg>
              <rect x="0" y="0" fill="none" width="100%" height="100%" />
            </svg>
            <p className="text-white font-extrabold text-lg whitespace-nowrap">
              Sign Up
            </p>
          </Link>
        </section>
      )}
    </nav>
  );
}
