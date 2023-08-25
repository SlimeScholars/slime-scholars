import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SlimeDetails from "../../components/play/slimes/SlimeDetails";
import SlimeInventory from "../../components/play/slimes/SlimeInventory";
import axios from "axios";
import { showToastError } from "../../utils/toast";
import { set } from "mongoose";
import RewardsPopUp from "../../components/play/slimes/RewardsPopUp";

export default function Slimes({ loading, user, setLoading, setUser }) {
  const [searchContent, setSearchContent] = useState("");
  const [slime, setSlime] = useState("");

  const router = useRouter();
  const [bg, setBg] = useState("bg-beach.png"); // Default background
  const [chanceSlimes, setChanceSlimes] = useState([]);
  const [showRewardsPopup, setShowRewardsPopup] = useState(false);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || user.userType !== 1) {
      router.push("/");
    }
  }, [user, loading]);

  const handleNavHome = (event) => {
    if (event.target.classList.contains("home")) {
      router.push("/play");
    }
  };

  const handleClick = () => {
    try {
      const token = localStorage.getItem("jwt");

      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true);
      axios
        .post("/api/slime/get-rewards", {}, config)
        .then((response) => {
          const newUser = {
            ...user,
            lastSlimeReward: response.data.lastSlimeReward,
            slimeGel: response.data.slimeGel,
          };
          setUser(newUser);
          // if there are chance abilities triggered give the user a popup
          if (response.data.rewardMessages.length > 0) {
            setChanceSlimes(response.data.rewardMessages);
            setShowRewardsPopup(true);
          }
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          showToastError(error.response.data.message);
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      showToastError(error.message);
      return;
    }
  };

  const handleClosePopup = () => {
    setShowRewardsPopup(false);
  };

  return (
    <div>
      {showRewardsPopup && (
        <RewardsPopUp
          rewardMessages={chanceSlimes}
          onClose={handleClosePopup}
        />
      )}
      <div className="pt-5 home" onClick={handleNavHome}>
        <div className="items-center justify-between">
          {/* button here just to test the backend get-rewards */}
          <div>
            <button
              className="p-2 bg-white"
              onClick={() => {
                handleClick();
              }}
            >
              {" "}
              Click Me
            </button>
          </div>
          <div className="flex flex-row bg-white/50 rounded-lg items-center">
            <div className="grow-0 pl-4">
              <img src="/assets/icons/slimes.png" className="h-20 w-20"></img>
            </div>
            <div className="grow pl-4 font-galindo text-xl">Slimes</div>
            <div className="grow-0 flex pr-4">
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
        <div
          className="pt-8 flex flex-row gap-4 items-start font-galindo home"
          onClick={handleNavHome}
        >
          <div className=" basis-1/2 ">
            <div className="bg-white/50 rounded-lg ">
              <div className="items-center">
                {/* loop through all slimes from user and display them */}
                {user && (
                  <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4">
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
          <div className=" basis-1/2 ">
            {/* Get Slime details */}
            <SlimeDetails
              user={user}
              loading={loading}
              setLoading={setLoading}
              slime={slime}
              setUser={setUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
