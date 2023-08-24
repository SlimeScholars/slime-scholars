import axios from "axios";
import { showToastError } from "../../../utils/toast";
import { gameData } from "../../../data/gameData";

export default function Roster({ user, loading, setLoading, slime, setUser }) {
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
        console.log(user.roster[i]);
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
    <div className="flex flex-row gap-1">
      {Array.isArray(user.roster) &&
        user.roster.map((char, index) => {
          // console.log(char);
          if (char === null) {
            return (
              <div className="relative" key={index}>
                <div className="overflow-hidden rounded-lg">
                  <div className="border-4 border-gray-400 rounded-md">
                    <button
                      onClick={() => {
                        handleClick(slime._id, index);
                      }}
                      className="h-20 w-20 mx-auto"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div className="relative" key={index}>
              <div className="overflow-hidden rounded-lg">
                <div
                  key={index}
                  className={`flex flex-col relative flex-wrap w-32 ${
                    gameData.rarityColours[char.rarity].bg
                  } ${gameData.rarityColours[char.rarity].bord}`}
                >
                  <button
                    onClick={() => {
                      handleClick(slime._id, index);
                    }}
                    className=""
                  >
                    <img
                      src={
                        "/assets/pfp/slimes/" +
                        gameData.slimePfps[char.slimeName].pfp
                      }
                      alt="Slime"
                      className="h-20 w-20 mx-auto"
                    />
                  </button>
                </div>
              </div>
              <div className="absolute bg-gray-400 h-5 w-10 -bottom-2.5 inset-x-0 mx-auto rounded-md items-center mt-2">
                {char.level === char.maxLevel ? (
                  <p className="text-center text-xs mt-1">Lvl. MAX </p>
                ) : (
                  <p className="text-center text-xs mt-1">Lvl. {char.level}</p>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
