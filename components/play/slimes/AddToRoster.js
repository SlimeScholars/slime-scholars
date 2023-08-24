import { useState, useEffect } from "react";
import Roster from "./Roster";
import axios from "axios";
import { showToastError } from "../../../utils/toast";

export default function AddToRoster({
  user,
  loading,
  setLoading,
  slime,
  setUser,
}) {
  const [inRoster, setInRoster] = useState(false);
  console.log(slime);
  useEffect(() => {
    let flag = false;
    user.roster.map((char, index) => {
      if (char !== null && char._id === slime._id) {
        // console.log("in roster: " + index);
        flag = true;
      }
    });
    setInRoster(flag);
    // console.log(inRoster);
  }, [slime, user]);

  const handleClick = (id) => {
    try {
      if (id === null) {
        return;
      }
      const roster = [null, null, null, null];
      for (let i in user.roster) {
        if (user.roster[i] === null) {
          roster[i] = null;
        } else if (user.roster[i]._id === id) {
          roster[i] = null;
        } else {
          roster[i] = user.roster[i]._id;
        }
      }

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
    <div className="flex flex-col px-8 py-4">
      {inRoster ? (
        <div className="flex flex-row justify-between">
          <div>
            <p className="text-md mx-1"> Add to team</p>
            <p className="text-xs mb-2 mx-1"> Choose a slime to replace</p>
          </div>
          <div>
            <button
              className="bg-pink-400 p-2 text-sm"
              onClick={() => {
                handleClick(slime._id);
              }}
            >
              Unequip
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-md mx-1"> Add to team</p>
          <p className="text-xs mb-2 mx-1"> Choose a slime to add/replace</p>
        </div>
      )}
      <div className="flex flex-row justify-around items-center">
        <Roster
          user={user}
          loading={loading}
          setLoading={setLoading}
          slime={slime}
          setUser={setUser}
        />
      </div>
    </div>
  );
}
