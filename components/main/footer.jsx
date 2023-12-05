import React from "react";
import { FiInstagram, FiTwitter } from "react-icons/fi";
import { RiTiktokLine } from "react-icons/ri";

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
      <div className="flex flex-row items-center justify-center">
        <a
          href="https://www.instagram.com/slime_scholars/"
          target="_blank"
          className="text-primary-light text-2xl mr-5"
        >
          <FiInstagram />
        </a>
        <a
          href="https://twitter.com/slime_scholars"
          target="_blank"
          className="text-primary-light text-2xl mr-5"
        >
          <FiTwitter />
        </a>
        <a
          href="https://www.tiktok.com/@slime_scholars"
          target="_blank"
          className="text-primary-light text-2xl"
        >
          <RiTiktokLine />
        </a>
      </div>
    </footer>
  );
}
