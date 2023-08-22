import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../../components/play/Navbar";
import SlimeDetails from "../../components/play/slimes/SlimeDetails";
import SlimeInventory from "../../components/play/slimes/SlimeInventory";
import AddToRoster from "../../components/play/slimes/AddToRoster";
import { gameData } from "../../data/gameData";

export default function Slimes({ loading, user, setLoading }) {
  const [searchContent, setSearchContent] = useState("");
  const [slime, setSlime] = useState("");

  const router = useRouter();
  const [bg, setBg] = useState("bg-beach.png"); // Default background

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || user.userType !== 1) {
      router.push("/");
    } else {
      if (user.bg && gameData.items[user.bg].bg) {
        setBg(gameData.items[user.bg].bg);
      }
    }
  }, [user, loading]);

  return (
    <div
      className={`w-screen h-screen bg-cover bg-[url('/assets/backgrounds/${bg}')]`}
    >
      <div className="p-8 w-full h-full justify-center items-center backdrop-brightness-50">
        <Navbar current="3" className=""></Navbar>
        <div className="pt-5">
          <div className="items-center justify-between">
            <div className="flex flex-row bg-white/75 rounded-lg items-center">
              <div className="grow-0 pl-4">
                <img src="/assets/icons/slimes.png" className="h-20 w-20"></img>
              </div>
              <div className="grow pl-4 font-galindo text-xl">Slimes</div>
              <div className="grow-0 flex grow pr-4">
                <form
                  className="border-2 border-black flex bg-transparent rounded"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <input
                    type="text"
                    value={"Search for a slime"}
                    // placeholder=
                    className="p-1 grow bg-transparent text-m font-galindo ml-2"
                    onChange={(e) => setSearchContent(e.target.value)}
                  ></input>
                  <button type="submit" className="h-full flex p-1">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Slimes inventory, all users slimes */}
          <div className="pt-8 flex flex-row gap-4 items-start font-galindo">
            <div className="pr-4 basis-1/2 ">
              <div className="bg-white/75 rounded-lg">
                <div className="">
                  {/* loop through all slimes from user and display them */}
                  {user && (
                    <div className="flex flex-row gap-2 flex-wrap justify-center p-4 items-center">
                      <SlimeInventory
                        user={user}
                        loading={loading}
                        setSlime={setSlime}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 basis-1/2">
              {/* Get Slime details */}
              <div className=" bg-white/75 rounded-lg h-full">
                <div className="">
                  {/* Display the slime details of the slime that is clicked */}
                  <SlimeDetails slime={slime} />
                </div>
              </div>
              {/* Add slimes to roster */}
              <div className=" bg-white/75 rounded-lg h-full">
                <div className="">
                  {/* Add to Roster component */}
                  <AddToRoster
                    user={user}
                    loading={loading}
                    setLoading={setLoading}
                    slime={slime}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
