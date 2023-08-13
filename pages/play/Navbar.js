import React from "react";

const Navbar = () => {
  return (
    <div className="flex flex-row items-center justify-between p-5">
      {/* earn flowers button */}
      <div className="p-8 bg-red-300">
        <button>Earn Flowers</button>
      </div>
      <div className="flex flex-row space-x-2">
        <div className="flex flex-col justify-end">
          <div className="bg-[#5A5A5A] opacity-60 h-8 w-24 rounded-md"></div>
          <div className="bg-[#5A5A5A] opacity-60 h-8 w-12 rounded-md mt-1"></div>
        </div>
        {/* buttons and icons */}
        <button className="p-12 bg-red-300 rounded-full "></button>
        <button className="p-12 bg-red-300 rounded-full "></button>
        <button className="p-12 bg-red-300 rounded-full "></button>
        <button className="p-12 bg-red-300 rounded-full "></button>
      </div>
    </div>
  );
};

export default Navbar;
