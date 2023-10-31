import Image from "next/image";
import { gameData } from "../../data/gameData";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";

export default function Navbar({ colorPalette, setUser, user }) {
  const router = useRouter();
  const dropdown = useRef(null);
  const [open, setOpen] = useState(false);
  const btn_tw =
    "px-5 py-2 rounded-lg bg-pink-500 hover:bg-pink-400 transition-all duration-150 text-white text-lg font-bold";
  const options = [
    {
      label: "My Slimes",
      onClick: () => {
        router.push("/play");
      },
    },
    {
      label: "Learn",
      onClick: () => {
        router.push("/courses");
      },
    },
    {
      label: "Settings",
      onClick: () => {
        router.push("/settings");
      },
    },
    {
      label: "Logout",
      onClick: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("jwt");
        }
        setUser(null);
      },
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        dropdown.current &&
        !dropdown.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("mouseup", handleClickOutside);
    return () => {
      window.removeEventListener("mouseup", handleClickOutside);
    };
  }, [open]);

  const userTypes = ["", "Student", "Parent", "Teacher", "Admin"]
  const userColors = ["#ffffff", "#e1eff0", "#e5e1f0", "#e1f0e3", "#f0e1ef"]

  console.log(user)

  return (
    <>
      <div
        className="flex flex-row px-2 items-center justify-between w-full h-[calc(4.9rem_-_4px)]"
        style={{
          backgroundColor: "black",
        }}
      >
        <section>
          <a className="flex justify-center items-center h-auto transition-all duration-150 course-nav-title" href="/">
            <Image
              src="/assets/icons/logo-light.png"
              alt="Slime Scholars Logo"
              height={0}
              width={0}
              sizes="100vw"
              className="w-[225px] h-auto pl-4"
            />
          </a>
        </section>
        {user ? (
          <section className="flex flex-row gap-1 font-bold text-xl items-center text-white">
            <div className="flex flex-col gap-[-5px] justify-center items-end">
              <div className="text-[0.85em] font-light font-galindo">
                {user && user.username && user.username.trim().length > 0 ? 
                  <span>{user.username}</span> : 
                  <span>[No Username]</span>}
              </div>
              <div className="text-[0.7em] mt-[-0.5em] font-light italic"
              style={{
                color: user ? userColors[user.userType] : userColors[0]
              }}
              >{user ? userTypes[user.userType] : userTypes[0]}</div>
            </div>
            <button
              onClick={() => {
                setOpen((prev) => !prev);
              }}
              style={{
                backgroundColor: `${
                  colorPalette ? colorPalette.text1 : "#ffffff"
                }`,
                padding: "0.7rem",
              }}
              className={`hover:opacity-80 rounded-full p-3 overflow-hidden relative box-border 
                w-[5.6rem] h-[5.6rem] scale-[0.65]
                course-nav-icon transition-all duration-150`}
            >
              <div
                className="grid grid-rows-2 gap-[0.5rem]"
              >
                {user && user.pfpSlime ? (
                  <div className="relative flex items-center justify-center">
                    <div className="absolute h-32 w-32 overflow-hidden">
                      <Image
                        src={
                          "/assets/pfp/backgrounds/" +
                          gameData.items[user.pfpBg].pfp
                        }
                        alt={user.pfpBg}
                        height={0}
                        width={0}
                        className="absolute h-32 w-32"
                      />
                    </div>
                    <Image
                      src={
                        "/assets/pfp/slimes/" +
                        gameData.slimes[user.pfpSlime].pfp
                      }
                      alt={user.pfpSlime}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="relative z-10 translate-y-1/3 scale-150 w-[3.5rem] h-[3.5rem]"
                    />
                  </div>
                ) : (
                  <div className="default-image">
                    {"/assets/pfp/slimes/blue-slime.png"}
                  </div>
                )}
              </div>
            </button>
            <div
              className={`flex flex-col absolute bg-white z-[500] top-[5rem] right-[2rem] rounded-none transition-all duration-100 
                                 origin-top ${
                                   open ? "scale-y-100" : "scale-y-0"
                                 } drop-shadow font-normal`}
              ref={dropdown}
            >
              {options.map((item) => (
                <button
                  key={item.label}
                  className="text-gray-500 hover:bg-fuchsia-100 px-8 py-2 w-full h-full transition-all duration-150 text-md font-bold"
                >
                  <span onClick={item.onClick}>{item.label}</span>
                </button>
              ))}
            </div>
          </section>
        ) : (
          <section className="hidden lg:flex lg:z-10 p-2 pr-5 gap-4">
            <button
              className={btn_tw}
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </button>
            <button
              className={btn_tw}
              onClick={() => {
                router.push("/signup");
              }}
            >
              Sign Up
            </button>
          </section>
        )}
      </div>
      <div
        className="w-full h-[4px] bg-gradient-to-b from-black to-black/[0.5]"
        style={{
          backgroundColor: !colorPalette ? "" : colorPalette.secondary2 + "40",
        }}
      />
    </>
  );
}
