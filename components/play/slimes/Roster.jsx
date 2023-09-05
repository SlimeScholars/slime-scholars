import axios from "axios";
import { showToastError } from "../../../utils/toast";
import { gameData } from "../../../data/gameData";
import Image from "next/image";

export default function Roster({ user, loading, setLoading, slime, setUser, bg }) {
  if (loading) {
    return;
  }
  // console.log(user);
  // console.log(slime._id);

  const handleClick = (id, index) => {
    try {
      if (id === null) {
        return;
      }
      const roster = [null, null, null, null];
      let swap = false;
      let cur_pos = -1;
      for (let i in user.roster) {
        if (user.roster[i] === null) {
          roster[i] = null;
        } else {
          roster[i] = user.roster[i]._id;
        }
        if (user.roster[i] !== null && user.roster[i]._id === id) {
          swap = true;
          cur_pos = i;
        }
      }
      if (swap) {
        let temp = roster[index];
        roster[index] = id;
        roster[cur_pos] = temp;
      } else {
        roster[index] = id;
      }
      // console.log(roster);
      // console.log(user.roster);
      const token = localStorage.getItem("jwt");

      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true);
      axios
        .put("/api/slime/change-roster", { roster }, config)
        .then((response) => {
          const newUser = { ...user, roster: response.data.roster };
          setUser(newUser);
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

  return (
    // if slime not selected, don't allow user to add
    <div className="grid grid-cols-4 gap-6">
      {Array.isArray(user.roster) &&
        user.roster.map((char, index) => {
          // console.log(char);
          if (char === null) {
            return (
              <div className="relative" key={index}>
                <button
                  onClick={() => {
                    handleClick(slime._id, index);
                  }}
                  className="h-full mx-auto rounded-lg w-full"
                  style={{
                    border: `5px solid ${bg.primary1}`,
                  }}
                >
                  +
                </button>
              </div>
            );
          }
          return (
            <div className="relative" key={index}>
              <button
                onClick={() => {
                  handleClick(slime._id, index);
                }}
                className={`relative rounded-lg ${gameData.rarityColours[char.rarity].bg}`}
                style={{
                  border: `5px solid ${bg.primary1}`,
                }}
              >
                <Image
                  src={
                    "/assets/pfp/slimes/" +
                    gameData.slimeImgs[char.slimeName].static
                  }
                  alt={char.slimeName}
                  height={0}
                  width={0}
                  sizes='100vw'
                  className="h-auto w-[80%] mx-auto mb-3"
                />
              </button>

              <div
                className="absolute -bottom-2.5 inset-x-0 mx-auto rounded-full items-center mt-2 w-fit justify-center px-3"
                style={{
                  backgroundColor: `${bg.primary1}`,
                  border: `3px solid ${bg.primary2}`,
                  color: bg.text2,
                }}
              >
                {slime.bonusLevel ? (
                  <p className="text-center text-sm mt-1">
                    Lvl. {slime.level === slime.maxLevel ? 'MAX' : slime.level} + {slime.bonusLevel}
                  </p>
                ) : (
                  <p className="text-center text-sm mt-1">
                    Lvl. {slime.level === slime.maxLevel ? 'MAX' : slime.level}
                  </p>
                )}
              </div>

            </div>
          );
        })}
    </div >
  );
}
