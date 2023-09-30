import Image from "next/image";
import React, { useState, useEffect } from "react";
import Button from "./button";

export default function Nav({ user, setUser }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const onLogOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
    }
    setUser(null);
  };

  return (
    <nav className="w-screen static top-0 h-18 bg-transparent flex flex-row justify-between items-center px-4 lg:px-10 -mb-[2rem]">
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
      <div className="hidden lg:flex lg:z-10">
        {user ?
          <Button text="Log Out" onClick={onLogOut} style="Primary" /> :
          <>
            <Button text="Login" onClick="/login" style="Secondary" />
            <Button text="Sign Up" onClick="/signup" style="Primary" />
          </>
        }

      </div>

    </nav>
  );
}

