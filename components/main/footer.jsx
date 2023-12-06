import React from "react";
import { IoLogoInstagram, IoLogoTiktok, IoLogoTwitter } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="w-full py-10 bg-primary-dark flex flex-row items-center justify-between px-32">
      <p className="text-primary-light text-xs">
        © 2023 Slime Scholars. All rights reserved.
      </p>
      <a href="/privacy" className="text-primary-light text-xs">
        Privacy Policy
      </a>
      <a href="/terms" className="text-primary-light text-xs">
        Terms of Service
      </a>
      <div className="flex flex-row items-center justify-center space-x-3">
        <a href="/" target="_blank">
          <IoLogoInstagram className="text-primary-light text-2xl" />
        </a>
        <a href="/" target="_blank">
          <IoLogoTwitter className="text-primary-light text-2xl" />
        </a>
        <a href="/" target="_blank">
          <IoLogoTiktok className="text-primary-light text-2xl" />
        </a>
      </div>
    </footer>
  );
}
