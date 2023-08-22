import axios from "axios";
import { showToastError } from "../../../utils/toast";
// import { nameToSlime } from "../../../utils/nameToImg";

export default function Roster({ user, loading, setLoading, slime }) {
  if (loading) {
    return;
  }
  // console.log(nameToSlime());

  const handleClick = (id, index) => {
    try {
      if (id === null) {
        return;
      }
      const roster = [null, null, null, null];
      for (let i in user.roster) {
        if (user.roster[i] === null) {
          roster[i] = null;
        } else {
          roster[i] = user.roster[i]._id;
        }
      }
      roster[index] = id;
      const token = localStorage.getItem("jwt");

      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true);
      axios
        .post("/api/slime/change-roster", { roster }, config)
        .then((response) => {
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          showToastError(error.message);
          setLoading(false);
        });
    } catch (error) {
      showToastError(error.message);
      return;
    }
  };

  return (
    // if slime not selected, don't allow user to add
    <>
      {Array.isArray(user.roster) &&
        user.roster.map((char, index) => {
          console.log(char);
          if (char === null) {
            return (
              <div className="px-10 border-2 border-gray-400 rounded-md mt-1 pt-6 py-5">
                <button
                  // TODO add params later
                  onClick={() => {
                    handleClick(slime._id, index);
                  }}
                >
                  +
                </button>
              </div>
            );
          }
          return (
            <div className="flex flex-col border-2 border-gray-400 rounded-md p-1 bg-green-400 relative flex-wrap w-32">
              <button
                onClick={() => {
                  handleClick(slime._id, index);
                }}
                className="mb-3"
              >
                <img
                  src="/assets/graphics/slimes/slime-blue.png"
                  alt="Slime"
                  className="h-20 w-20 mx-auto"
                />
              </button>
              <div className="absolute bg-gray-400 h-5 w-10 bottom-0 inset-x-0 mx-auto rounded-md items-center mt-2">
                <p className="text-center text-xs mt-1">Lvl. {char.level}</p>
              </div>
            </div>
          );
        })}
    </>
  );
}
