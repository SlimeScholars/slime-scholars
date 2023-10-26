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

  return (
    <>
      <div
        className="flex flex-row px-2 items-center justify-between w-full h-[calc(4.9rem_-_4px)]"
        style={{
          backgroundColor: "black",
        }}
      >
        <section>
          <a className="flex justify-center items-center h-auto" href="/">
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
            <div className="text-md">{user ? user.username : ""}</div>
            <button
              onClick={() => {
                setOpen((prev) => !prev);
              }}
              style={{
                backgroundColor: `${
                  colorPalette ? colorPalette.text1 : "#ffffff"
                }`,
                border: `2px solid ${
                  colorPalette ? colorPalette.text1 + "80" : "#ffffff80"
                }`,
                padding: "0.7rem",
              }}
              className={`hover:opacity-80 rounded-full p-3 overflow-hidden relative box-border 
                2xl:w-[5.6rem] 2xl:h-[5.6rem] max-xl:w-[3.6rem] max-xl:h-[3.6rem] scale-[0.65]`}
            >
              <div
                className="flex gap-[1rem] max-xl:grid max-xl:grid-cols-3 max-xl:grid-rows-2 
                    max-xl:gap-[0.5rem]"
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
                      className="relative z-10 translate-y-1/3 scale-150 w-[3.5rem] h-[3.5rem] max-xl:w-[2rem] max-xl:h-[2rem] max-xl:scale-300"
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
