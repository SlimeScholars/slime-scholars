import Image from "next/image";
import { gameData } from "../../../data/gameData";
import { showToastError } from "../../../utils/toast";
import axios from "axios";
import cookies from "../../../services/cookies/cookies";

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
  setUserFriends,
  usersOnlist,
  toDo,
  setUser,
  user,
  setSentFriendRequests,
  colorPalette,
  searchContent,
  findingLoading,
}) {
  const handleManageFriend = (friendId) => {
    const token = cookies.get("slime-scholars-webapp-token")

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
    }
    // Find friends
    else {
      axios
        .post(
          "/api/user/friend/send",
          {
            friendId,
          },
          config
        )
        .then((response) => {
          setUserFriends(response.data.friends)

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
    if (usersOnlist === "empty for now") {
      friends = userFriends ? userFriends : [];
    } else {
      friends = usersOnlist ? usersOnlist : [];
    }
    if (Array.isArray(friends)) {
      friends = friends.filter((friend) => {
        return friend._id !== user._id;
      });
    }
    // may need a loading screen here
    return (
      <div className="grid grid-cols-2 gap-4">
        {friends.length === 0 && (
          <p className="col-span-4">
            You have no friends by the name "{searchContent}"
          </p>
        )}
        {Array.isArray(friends) ? (
          friends.map((user, index) => {
            return (
              <div
                key={index}
                className="rounded-xl flex flex-row items-center p-4"
                style={{
                  background: colorPalette ? colorPalette.primary1 : "none",
                }}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <div className="relative">
                    <Image
                      src={
                        "/assets/pfp/backgrounds/" +
                        gameData.items[user.pfpBg].bg
                      }
                      alt={user.pfpBg}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="absolute inset-0 w-full h-full"
                    />
                    <Image
                      src={
                        "/assets/pfp/slimes/" +
                        gameData.slimes[user.pfpSlime].pfp
                      }
                      alt={user.pfpSlime}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="relative z-10 translate-y-1/4 scale-125 h-10 w-10"
                    />
                  </div>
                </div>
                <div className="grow px-4 relative">{user.username}</div>
                <button
                  className="rounded-lg w-10 h-10 flex justify-center items-center outline-none focus:outline-none text-3xl"
                  style={{
                    background: colorPalette ? colorPalette.primary2 : "none",
                  }}
                  onClick={() => handleManageFriend(user._id)}
                >
                  x
                </button>
              </div>
            );
          })
        ) : (
          <p>No friends to display.</p>
        )}
      </div>
    )

    {/* add friends */ }
  } else {
    return (
      <div className="grid grid-cols-2 gap-4">
        {findingLoading ? <p>Finding users...</p> :
          searchContent.trim().length === 0 ? <p>Search for a user to friend</p> :
            usersOnlist.length === 0 ? <p>No user found</p> : <></>}
        {!findingLoading && Array.isArray(usersOnlist) ? (
          usersOnlist.map((user, index) => {
            return (
              <div
                key={index}
                className="rounded-xl flex flex-row items-center p-4"
                style={{
                  background: colorPalette ? colorPalette.primary1 : "none",
                }}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <div className="relative">
                    <Image
                      src={
                        "/assets/pfp/backgrounds/" +
                        gameData.items[user.pfpBg].bg
                      }
                      alt={user.pfpBg}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="absolute inset-0 w-full h-full"
                      onClick={() => handleManageFriend(user._id)}
                    />
                    <Image
                      src={
                        "/assets/pfp/slimes/" +
                        gameData.slimes[user.pfpSlime].pfp
                      }
                      alt={user.pfpSlime}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="relative z-10 translate-y-1/4 scale-125 h-10 w-10"
                      onClick={() => handleManageFriend(user._id)}
                    />
                  </div>
                </div>
                <div className="grow px-4 relative">{user.username}</div>
                {(
                  <button
                    className="rounded-lg w-10 h-10 flex justify-center items-center outline-none focus:outline-none text-3xl absolute"
                    style={{
                      background: colorPalette ? colorPalette.primary2 : "none",
                    }}
                    onClick={() => handleManageFriend(user._id)}
                  >
                    <div className="mt-1">+</div>
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    );
  }
}
