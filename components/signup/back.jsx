import React from "react";
import { FaChevronCircleLeft } from "react-icons/fa";
import { HiHome } from "react-icons/hi";

export default function Back({to}) {
  return (
    <nav className="w-screen h-32 flex justify-start items-center fixed top-0">
      <a
        href={to}
        className="h-full flex justify-start items-center px-10 stretch"
      >
        <FaChevronCircleLeft className="text-3xl text-bg-light/90" />
        <p className="text-2xl ml-3 mr-2 pt-1 text-bg-light/90 font-galindo">
          Back to
        </p>
        <HiHome className="text-3xl text-bg-light/90" />
      </a>
    </nav>
  );
}
