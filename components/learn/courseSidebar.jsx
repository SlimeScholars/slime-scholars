import Image from "next/image";
import NextRewardTimer from "../play/slimes/NextRewardTimer";
import { gameData } from "../../data/gameData";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { useRouter } from "next/router";
//import { useState } from "react"

export default function CourseSidebar({ colorPalette, open, setOpen, user }) {
  const router = useRouter();

  return (
    <div
      className={`relative h-full transition-all duration-150 p-4 w-[250px] 2xl:w-[300px] z-[80]
        ${open ? "translate-x-0" : "translate-x-[-235px] 2xl:translate-x-[-280px]"}`}
    >
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundColor: !colorPalette ? "" : colorPalette.secondary1 + "C0",
        }}
      />
      <button
        className={`z-[100] absolute top-[50%] left-[100%] w-[4rem] h-[24rem] translate-y-[calc(-50%_-_2rem)]
            flex flex-row items-center justify-start cursor-pointer`}
        onClick={() => {
          setOpen(!open);
        }}
        style={{
          backgroundColor: "transparent", //!colorPalette ? "" : colorPalette.primary2 + "E0",
        }}
      >
        <div
          className="z-[100] rounded-r-lg flex items-center justify-center w-[1rem] h-[24rem]"
          onClick={() => {
            setOpen(!open);
          }}
          style={{
            backgroundColor: "transparent",
          }}
        />
        <div
          className="z-[100] rounded-r-lg flex items-center justify-center w-[1.5rem] h-[8rem] translate-x-[-1rem]"
          style={{
            backgroundColor: !colorPalette ? "" : colorPalette.secondary1,
          }}
        >
          <BsFillGrid3X3GapFill className={`sidebar-arrow`} />
        </div>
      </button>
      <section
        className={`relative flex flex-col z-50 p-4 rounded-lg 
            justify-between h-[calc(100vh_-_5rem_-_1.5rem)]`}
        style={{
          backgroundColor: !colorPalette ? "" : colorPalette.secondary2 + "70",
        }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div
              className="flex rounded-full py-1 px-6 w-full justify-center"
              style={{
                backgroundColor: `${
                  colorPalette ? colorPalette.black + "55" : "#475569"
                }`,
                color: `${colorPalette ? colorPalette.text1 : "#ffffff"}`,
                boxShadow: `${
                  colorPalette
                    ? "0px 0px 20px " + colorPalette.white + "0F"
                    : ""
                }`,
              }}
            >
              {user && (
                <div className="flex flex-row items-center">
                  <Image
                    src="/assets/icons/slime-gel.png"
                    alt="slime gel"
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="2xl:h-[1.7rem] 2xl:w-[1.7rem] h-[1.4rem] w-[1.4rem] 2xl:ml-1 mr-2 -mt-0.5"
                  />
                  <p className="max-xl:pr-5 max-xl:text-sm">{user.slimeGel}</p>
                </div>
              )}
            </div>
            <div
              className="flex rounded-full py-1 px-6 w-full mt-1.5 justify-center"
              style={{
                backgroundColor: `${
                  colorPalette ? colorPalette.black + "55" : "#475569"
                }`,
                color: `${colorPalette ? colorPalette.text1 : "#ffffff"}`,
                boxShadow: `${
                  colorPalette
                    ? "0px 0px 20px " + colorPalette.white + "0F"
                    : ""
                }`,
              }}
            >
              {user && (
                <div className="flex flex-row items-center">
                  <Image
                    src="/assets/icons/flower.png"
                    alt="flowers"
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="2xl:h-[1.7rem] 2xl:w-[1.7rem] h-[1.4rem] w-[1.4rem] 2xl:ml-1 mr-2 -mt-0.5"
                  />
                  <p className="max-xl:text-sm">
                    {user.flowers === null ? 0 : user.flowers}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="">
            <NextRewardTimer />
          </div>
        </div>
        <div>
          <div
            className="w-full bg-white/[0.65] rounded-full text-center text-lg mb-2 py-1
                    transition-all duration-150"
          >
            My Slimes
          </div>
          <div className="flex flex-row flex-wrap">
            {user &&
              Array.isArray(user.roster) &&
              user.roster.map((char, index) => {
                if (char === null) {
                  return (
                    <div
                      className="relative w-[calc(50%_-_0.75rem)] m-1"
                      key={index}
                    >
                      <div
                        className={`relative rounded-lg`}
                        style={{
                          border: `5px solid ${
                            colorPalette ? colorPalette.primary2 : "#ffffff"
                          }`,
                        }}
                      >
                        <div className="absolute w-full h-full text-center flex items-center justify-center text-3xl font-bold">
                          +
                        </div>
                        <Image
                          src={"/assets/pfp/slimes/shadow-slime.png"}
                          alt="Slime"
                          height={0}
                          width={0}
                          sizes="100vw"
                          className="h-auto w-[80%] mx-auto mb-3"
                        />
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    className="relative w-[calc(50%_-_0.75rem)] m-1"
                    key={index}
                  >
                    <div
                      className={`relative rounded-lg ${
                        gameData.rarityColours[char.rarity].bg
                      }`}
                      style={{
                        border: `5px solid ${
                          colorPalette ? colorPalette.primary2 : "#ffffff"
                        }`,
                      }}
                    >
                      <Image
                        src={
                          "/assets/pfp/slimes/" +
                          gameData.slimes[char.slimeName].static
                        }
                        alt={char.slimeName}
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="h-auto w-[80%] mx-auto mb-3"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
