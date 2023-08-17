import React from "react";
import EarnFlwrBtn from './earnFlwrBtn';
import { useRouter } from "next/router"

/*
Parameter:
  current: the id of the web page that the user is currently on
*/

export function Navbar(props) {

  const types = [
    { title: 'shopping', id: 1},
    { title: 'friends', id: 2},
    { title: 'slimes', id: 3},
    { title: 'backpack', id: 4}
  ]

  const router = useRouter()
  const current_id = parseInt(props.current, 10)

  return (
    <div className="flex flex-row items-center justify-between">
      {/* earn flowers button */}
      <div className="p-8 bg-red-300 hover:bg-red-300/75 rounded text-lg">
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
            if (type.id !== current_id) {
            return (
                <button 
                    onClick={(e) => {
                      e.preventDefault()
                      router.push("/play/"+type.title)
                    }}
                    className="p-8 bg-white/50 rounded-full hover:bg-red-300/75"
                    key = {type.id}>
                    <img src={imgLink} className="h-14 w-14">
                    </img>
                </button>
            );}
            return (
              <button 
                    onClick={(e) => {
                      e.preventDefault()
                      router.push("/play/"+type.title)
                    }}
                    className="p-8 bg-red-300 rounded-full hover:bg-red-300/75"
                    key = {type.id}>
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