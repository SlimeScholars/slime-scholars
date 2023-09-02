import { gameData } from "../../../data/gameData";
import { showToastError } from "../../../utils/toast";
import axios from "axios";

/**
 * @param   {table} userFriends - all friends of current user
 * @param   {table} usersOnlist - search result
 * @param   {string} toDo - acts as a flag indicating the functionality of ManageFriends Board
 *                          - "manage": return search friends bar on default
 *                          - "add": allow search across entire user database
 * @param   {function} setAlertMessage - create a pop up alert on change
 */

export default function FriendsEditor({
  userFriends,
  usersOnlist,
  toDo,
  setUserFriends,
  setSentFriendRequests,
}) {
  const handleManageFriend = (friendId) => {
    const token = localStorage.getItem("jwt");

    // Set the authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (toDo === "manage") {
      axios
        .post(
          "/api/user/friend/remove",
          {
            friendId,
          },
          config
        )
        .then((response) => {
          setUserFriends(response.data.friends);
          showToastError("Friend removed", true);
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.message
          )
            showToastError(error.response.data.message, true);
          else console.error("Error removing friend");
        });
    } else {
      axios
        .post(
          "/api/user/friend/send",
          {
            friendId,
          },
          config
        )
        .then((response) => {
          userFriends = response.data.friends;
          const updatedRequestListing = response.data.sentFriendRequests;
          setSentFriendRequests(updatedRequestListing);
          showToastError("Friend request sent", true);
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.message
          )
            showToastError(error.response.data.message);
          else console.error("Error removing friend");
        });
    }
  };
  if (toDo === "manage") {
    let friends = [];
    if (usersOnlist === "empty for now" || usersOnlist.length === 0) {
      friends = userFriends;
    } else {
      friends = usersOnlist;
    }
    // may need a loading screen here
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.isArray(friends) ? (
          friends.map((user, index) => {
            return (
              <div
                key={index}
                className="bg-red-200 rounded-xl flex flex-row items-center p-4"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <div className="relative">
                    <img
                      src={
                        "/assets/pfp/backgrounds/" +
                        gameData.items[user.pfpBg].pfp
                      }
                      className="absolute inset-0"
                    ></img>
                    <img
                      src={
                        "/assets/pfp/slimes/" +
                        gameData.slimeImgs[user.pfpSlime].pfp
                      }
                      className="relative z-10 translate-y-1/4 scale-125 h-10 w-10"
                    ></img>
                  </div>
                </div>
                <div className="grow px-4">{user.username}</div>
                <button
                  className="bg-red-400 rounded-lg p-2 hover:bg-red-300"
                  onClick={() => handleManageFriend(user._id)}
                >
                  X
                </button>
              </div>
            );
          })
        ) : (
          <p>No friends to display.</p>
        )}
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.isArray(usersOnlist) ? (
          usersOnlist.map((user, index) => {
            return (
              <div
                key={index}
                className="bg-red-200 rounded-xl flex flex-row items-center p-4"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <div className="relative">
                    <img
                      src={
                        "/assets/pfp/backgrounds/" +
                        gameData.items[user.pfpBg].pfp
                      }
                      className="absolute inset-0"
                    ></img>
                    <img
                      src={
                        "/assets/pfp/slimes/" +
                        gameData.slimeImgs[user.pfpSlime].pfp
                      }
                      className="relative z-10 translate-y-1/4 scale-125 h-10 w-10"
                    ></img>
                  </div>
                </div>
                <div className="grow px-4">{user.username}</div>
                {toDo == "manage" ? (
                  <button
                    className="bg-red-400 rounded-lg p-2 hover:bg-red-300"
                    onClick={() => handleManageFriend(user._id)}
                  >
                    X
                  </button>
                ) : (
                  <button
                    className="bg-red-400 rounded-lg p-2 w-10 h-10 hover:bg-red-300"
                    onClick={() => handleManageFriend(user._id)}
                  >
                    <span className="h-full material-symbols-outlined">
                      add
                    </span>
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p>No result to display.</p>
        )}
      </div>
    );
  }
}
