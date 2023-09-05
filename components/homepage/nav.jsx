import Image from "next/image";
import React from "react";
import Button from "./button";

import { useState, useEffect } from "react";

export default function Nav({ user, setUser }) {
  const [accountContent, setAccountContent] = useState(
    <>
      <Button text="Login" onClick="/login" style="Secondary" />
      <Button text="Sign Up" onClick="/signup" style="Primary" />
    </>
  )

  const onLogOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt')
    }
    setUser(null)
  }

  useEffect(() => {
    if (user) {
      setAccountContent(
        <>
          <Button text="Log Out" onClick={onLogOut} style="Primary" />
        </>
      )
    }
    else {
      setAccountContent(
        <>
          <Button text="Login" onClick="/login" style="Secondary" />
          <Button text="Sign Up" onClick="/signup" style="Primary" />
        </>
      )

    }
  }, [user])

  return (
    <nav className="w-screen fixed top-0 h-36 bg-transparent flex flex-row justify-between items-center px-10">
      <a className="flex justify-center items-center h-auto w-[30%]" href="/">
        <Image
          src="/assets/icons/logo.png"
          alt="Slime Scholars Logo"
          height={0}
          width={0}
          sizes='100vw'
          className="mb-2 h-auto w-auto w-[270px] h-[300px]"
        />
      </a>
      <ul className="flex flex-row justify-evenly items-center w-[30%]">
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
      <div className="flex justify-center items-center w-[30%]">
        {accountContent}
      </div>
    </nav>
  );
}
