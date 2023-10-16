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
  bg,
  refetchUser,
}) {
  const [inRoster, setInRoster] = useState(false);
  useEffect(() => {
    let flag = false;
    user.roster.map((char, index) => {
      if (char !== null && char._id === slime._id) {
        flag = true;
      }
    });
    setInRoster(flag);
  }, [slime, user]);

  const handleClick = (id) => {
    setLoading(true);
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
          apiKey: process.env.API_KEY,
        },
      };
      axios
        .put("/api/slime/change-roster", { roster }, config)
        .then((response) => {
          setLoading(false);
          refetchUser()
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
    <div
      className="flex flex-col"
      style={{
        color: bg.text1,
      }}
    >
      {inRoster ? (
        <div className="flex flex-row justify-between">
          <div>
            <p className="text-2xl mx-1"> Add to team</p>
          </div>
          <div>
            <button
              className="px-5 py-1 text-xl rounded-lg"
              style={{
                backgroundColor: bg.secondary1,
              }}
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
        </div>
      )}
      <p className="text-xl mb-2 mx-1 text-center mt-5">
        Choose a slime to replace
      </p>
      <div className="flex flex-row justify-around items-center">
        <Roster
          user={user}
          loading={loading}
          setLoading={setLoading}
          slime={slime}
          setUser={setUser}
          bg={bg}
          refetchUser={refetchUser}
        />
      </div>
    </div>
  );
}
