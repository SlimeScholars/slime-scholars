import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SlimeDetails from "../../components/play/slimes/SlimeDetails";
import SlimeInventory from "../../components/play/slimes/SlimeInventory";
import axios from "axios";
import { showToastError } from "../../utils/toast";
import RewardsPopUp from "../../components/play/slimes/RewardsPopUp";
import Image from "next/image";

export default function Slimes({
  loading,
  user,
  setLoading,
  setUser,
  colorPalette,
  refetchUser
}) {
  const [searchContent, setSearchContent] = useState("");
  const [filterSlimes, setFilterSlimes] = useState([]); // Filtered slimes based on search
  const [slime, setSlime] = useState("");

  const router = useRouter();
  const [chanceSlimes, setChanceSlimes] = useState([]);
  const [showRewardsPopup, setShowRewardsPopup] = useState(false);
  const [rewards, setRewards] = useState(0);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || user.userType !== 1) {
      router.push("/");
    }
  }, [user, loading]);

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
          refetchUser()
          setChanceSlimes(response.data.rewardMessages);
          setShowRewardsPopup(true);
          setRewards(response.data.rewards);
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

  useEffect(() => {
    if (user) {
      const searchSlimes = user.slimes.filter((slime) => {
        return slime.slimeName
          .toLowerCase()
          .includes(searchContent.toLowerCase());
      });
      setFilterSlimes(searchSlimes);
    }
  }, [searchContent]);

  const handleClosePopup = () => {
    setShowRewardsPopup(false);
  };

  return (
    <div>
      {showRewardsPopup && (
        <RewardsPopUp
          rewardMessages={chanceSlimes}
          onClose={handleClosePopup}
          rewards={rewards}
        />
      )}
      <div className="">
        {/* button here just to test the backend get-rewards */}

        {/* <div>
            <button
              className="p-2 bg-white"
              onClick={() => {
                handleClick();
              }}
            >
              {" "}
              Click Me
            </button>
          </div> */}

        <div
          style={{
            backgroundColor:
              !colorPalette ? "" : `${colorPalette.white}88`,
            color: !colorPalette ? "" : colorPalette.text1,
          }}
          className="flex flex-row rounded-lg items-center py-2 pl-6 pr-10"
        >
          <div className="grow-0 pl-4">
            <Image
              src="/assets/icons/slimes.png"
              alt='slimes'
              height={0}
              width={0}
              sizes='100vw'
              className="w-[4.5rem] h-[4.5rem]"
            />
          </div>
          <h2 className="grow pl-4 font-galindo text-2xl">Slimes</h2>
          <div className="grow-0 flex pr-4">
            <div
              style={{
                border:
                  colorPalette === undefined
                    ? ""
                    : `3px solid ${colorPalette.primary1}`,
                color: !colorPalette ? "" : colorPalette.primary1,
                backgroundColor:
                  !colorPalette ? "" : `${colorPalette.white}88`,
              }}
              className="rounded-md flex flex-row py-1 px-3 text-lg"
            >
              <input
                type="text"
                placeholder={"Search for a slime"}
                className="p-1 grow bg-transparent font-galindo ml-2 w-[14rem] focus:outline-0"
                onChange={(e) => setSearchContent(e.target.value)}
                style={{
                  color: colorPalette ? colorPalette.black : "",
                }}
              />
              <button className="h-full flex p-1 cursor-default"
                style={{
                  color: colorPalette ? colorPalette.black : "",
                }}
              >
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Slimes inventory, all users slimes */}
        <div
          className="pt-9 flex flex-row gap-9 items-start font-galindo"
        >
          <div
            className="basis-1/2 rounded-lg mb-10"
            style={{
              backgroundColor:
                !colorPalette ? "" : `${colorPalette.white}88`,
            }}
          >
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-8" style={{
              // minHeight: 'calc(100vh - 22rem)',
            }}>
              {/* loop through all slimes from user and display them */}
              {user && (
                <SlimeInventory
                  slimes={
                    filterSlimes.length > 0 ? filterSlimes : user.slimes
                  }
                  loading={loading}
                  setSlime={setSlime}
                  bg={colorPalette}
                />
              )}
            </div>
          </div>
          <div className=" basis-1/2 rounded-lg mb-10"
            style={{
              minHeight: 'calc(100vh - 22rem)',
            }}
          >
            {/* Get Slime details */}
            <SlimeDetails
              user={user}
              loading={loading}
              setLoading={setLoading}
              slime={slime}
              setSlime={setSlime}
              setUser={setUser}
              bg={colorPalette}
              refetchUser={refetchUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
