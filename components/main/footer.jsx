import React from "react";
import Link from "next/link";
import { IoLogoInstagram, IoLogoTiktok, IoLogoTwitter } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="w-full py-10 bg-primary-dark flex flex-row items-center justify-between px-5 md:px-10 lg:px-20 xl:px-32">
      <p className="text-primary-light text-xs">
        © 2023 Slime Scholars. All rights reserved.
      </p>
      <Link
        href="/privacy"
        className="text-primary-light hover:text-primary duration-150 ease-in-out text-xs"
      >
        Privacy Policy
      </Link>
      <Link
        href="/terms"
        className="text-primary-light hover:text-primary duration-150 ease-in-out text-xs"
      >
        Terms of Service
      </Link>
      <div className="flex flex-row items-center justify-center space-x-3">
        <a href="/" target="_blank">
          <IoLogoInstagram className="text-primary-light hover:text-primary duration-150 ease-in-out text-lg sm:text-xl md:text-2xl" />
        </a>
        <a href="/" target="_blank">
          <IoLogoTwitter className="text-primary-light hover:text-primary duration-150 ease-in-out text-lg sm:text-xl md:text-2xl" />
        </a>
        <a href="/" target="_blank">
          <IoLogoTiktok className="text-primary-light hover:text-primary duration-150 ease-in-out text-lg sm:text-xl md:text-2xl" />
        </a>
      </div>
    </footer>
  );
}
