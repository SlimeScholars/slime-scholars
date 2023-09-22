import Image from "next/image";
import React, { useState, useEffect } from "react";
import Button from "./button";

export default function Nav({ user, setUser }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [accountContent, setAccountContent] = useState(
    <>
      <Button text="Login" onClick="/login" style="Secondary" />
      <Button text="Sign Up" onClick="/signup" style="Primary" />
    </>
  );

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const onLogOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
    }
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      setAccountContent(
        <Button text="Log Out" onClick={onLogOut} style="Primary" />
      );
    } else {
      setAccountContent(
        <>
          <Button text="Login" onClick="/login" style="Secondary" />
          <Button text="Sign Up" onClick="/signup" style="Primary" />
        </>
      );
    }
  }, [user]);

  return (
    <nav className="w-screen fixed top-0 h-36 bg-transparent flex flex-row justify-between items-center px-4 lg:px-10">
      <a className="flex justify-center items-center h-auto" href="/">
        <Image
          src="/assets/icons/logo.png"
          alt="Slime Scholars Logo"
          height={0}
          width={0}
          sizes='100vw'
          className="mb-2 w-[270px] h-auto"
        />
      </a>
      {/*FIXME
        disabling menu button since we have not made the pages for them yet
      
      <div className="lg:hidden relative flex items-center justify-center">
        <button onClick={toggleDropdown} className="py-2 px-3 mx-2 font-light focus:outline-none font-bold rounded-lg duration-300 hover:scale-105 ease-in-out bg-bg-light ring-primary ring-1 text-primary hover:bg-[#E44DCC] hover:text-bg-light mb-1 text-center"
        >
          Menu
        </button>
        {showDropdown && (
          <ul className="absolute top-full right-2 z-20 bg-white p-4 rounded shadow-md">
            <li className="text-2xl font-light mb-2 text-primary">
              <a href="/">Home</a>
            </li>
            <li className="text-2xl font-light mb-2 text-primary">
              <a href="/#about">About</a>
            </li>
            <li className="text-2xl font-light mb-2 text-primary">
              <a href="/#mission">Mission</a>
            </li>
            <li className="text-2xl font-light text-primary">
              <a href="/#contact">Contact</a>
            </li>
          </ul>
        )}
      </div>

      <ul className="hidden lg:flex flex-row justify-evenly items-center w-[30%] space-x-3">
        <li className="text-2xl font-light">
          <a href="/">Home</a>
        </li>
        <li className="text-2xl font-light">
          <a href="/#about">About</a>
        </li>
        <li className="text-2xl font-light">
          <a href="/#mission">Mission</a>
        </li>
        <li className="text-2xl font-light">
          <a href="/#contact">Contact</a>
        </li>
      </ul>
      */}
      <div className="hidden lg:flex">
        <Button text="Login" onClick="/login" style="Secondary" />
        <Button text="Sign Up" onClick="/signup" style="Primary" />
      </div>

    </nav>
  );
}

