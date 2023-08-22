import axios from "axios";
import { showToastError } from "../../../utils/toast";

export default function Roster({ user, loading, setLoading }) {
  if (loading) {
    return;
  }

  const handleClick = (id, index) => {
    try {
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
    <>
      {Array.isArray(user.roster) &&
        user.roster.map((slime, index) => {
          console.log(slime);
          if (slime === null) {
            return (
              <div className="px-10 border-2 border-gray-400 rounded-md mt-1 pt-6 py-5">
                <button
                  // TODO add params later
                  onClick={() => {
                    handleClick();
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
                  handleClick();
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
                <p className="text-center text-xs mt-1">Lvl. {slime.level}</p>
              </div>
            </div>
          );
        })}
    </>
  );
}
