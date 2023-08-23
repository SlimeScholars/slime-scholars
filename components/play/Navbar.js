import React, { useState, useEffect } from "react";
import EarnFlwrBtn from "./earnFlwrBtn";
import { useRouter } from "next/router";
import axios from "axios";

/*
Parameter:
  current: the id of the web page that the user is currently on
*/

export function Navbar(props) {
  const types = [
    { title: "shopping", src: "shopping", id: 1 },
    { title: "friends", src: "friends", id: 2 },
    { title: "slimes", src: "slimes", id: 3 },
    { title: "inventory", src: "inventory", id: 4 },
  ];

  const router = useRouter();
  const current_id = parseInt(props.current, 10);

  // get user data to display flowers and slimeGel
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      router.push("/");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("/api/user", config)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log("navbar", error.message);
      });
  }, []);

  return (
    <div className="flex flex-row items-center justify-between">
      {/* earn flowers button */}
      <div className=" bg-red-300 hover:bg-red-300/75 rounded text-lg">
        <EarnFlwrBtn />
      </div>
      <div className="flex flex-row space-x-2">
        <div className="flex flex-col justify-center p-4">
          <div className="flex bg-white/75 opacity-60 h-8 w-24 rounded-md">
            {/* slime gel */}
            {user && (
              <div className="flex flex-row items-center justify-center">
                <img
                  src="/assets/icons/slime-gel.png"
                  alt="Icon"
                  className="h-4 w-4 ml-1 mr-2"
                />
                <p className="text-black font-galindo">{user.slimeGel}</p>
              </div>
            )}
          </div>
          <div className="flex bg-white/75 opacity-60 h-8 w-16 rounded-md mt-1 ml-8">
            {/* flowers */}
            {user && (
              <div className="flex flex-row items-center">
                <img
                  src="/assets/icons/slime-gel.png"
                  alt="Icon"
                  className="h-4 w-4 ml-1 mr-2"
                />
                <p className="text-black font-galindo">{user.flowers}</p>
              </div>
            )}
          </div>
        </div>
        {/* buttons and icons */}
        {types.map((type) => {
          const imgLink = "/assets/icons/" + type.src + ".png";
          const commonButtonClasses =
            "p-2 md:p-8 rounded-full hover:bg-red-300/75";
          const isActive = type.id === current_id;

          return (
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/play/" + type.title);
              }}
              className={`${
                isActive ? "bg-red-300" : "bg-white/50"
              } ${commonButtonClasses}`}
              key={type.id}
            >
              <img src={imgLink} className="h-10 w-10 md:h-14 md:w-14" alt="" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
