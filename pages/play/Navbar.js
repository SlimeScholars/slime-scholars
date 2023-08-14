import React from "react";
import EarnFlwrBtn from '../../components/play/earnFlwrBtn';

const Navbar = () => {

  const types = [
    { title: 'shopping', id: 1},
    { title: 'friends', id: 2},
    { title: 'slimes', id: 3},
    { title: 'backpack', id: 4}
  ]

  return (
    <div className="flex flex-row items-center justify-between p-5">
      {/* earn flowers button */}
      <div className="p-8 bg-red-300 hover:bg-red-300/75">
        <EarnFlwrBtn />
      </div>
      <div className="flex flex-row space-x-2">
        <div className="flex flex-col justify-end">
          <div className="bg-[#5A5A5A] opacity-60 h-8 w-24 rounded-md"></div>
          <div className="bg-[#5A5A5A] opacity-60 h-8 w-12 rounded-md mt-1"></div>
        </div>
        {/* buttons and icons */}
        {
          types.map(type => {
            const imgLink = "/assets/icons/"+type.title+".png"
            return (
                <button 
                    onClick="../courses/index"
                    className="p-8 bg-red-300 rounded-full hover:bg-red-300/75">
                    <img src={imgLink} className="h-14 w-14">
                    </img>
                </button>
            );
          })
        }
      </div>
    </div>
  );
};

export default Navbar;
