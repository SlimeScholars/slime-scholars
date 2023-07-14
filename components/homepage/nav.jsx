import Image from "next/image";
import React from "react";
import Button from "./button";

export default function Nav() {
  return (
    <nav className="w-screen fixed top-0 h-36 bg-transparent flex flex-row justify-between items-center px-10">
      <a className="flex justify-center items-center w-[30%]" href="/">
        <Image
          src="/assets/icons/logo.png"
          alt="Slime Scholars Logo"
          className="mb-2"
          width={270}
          height={300}
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
        <Button text="Login" onClick="/login" style="Secondary" />
        <Button text="Sign Up" onClick="/signup" style="Primary" />
      </div>
    </nav>
  );
}
