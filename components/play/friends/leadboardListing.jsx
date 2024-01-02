import Image from "next/image.js";
import { gameData } from "../../../data/gameData.js";
import { SmallProfilePicture} from "../../main/profilePicture.jsx";

export default function LeadboardListing({ user, userRank, users, userId, colorPalette }) {
  return (
    <div id="friends-listing">
      {Array.isArray(users) ? (
        users.map((opt_user, index) => {
          if (opt_user._id === userId) {
            return (
              <div
                className="flex flex-row items-center py-1"
                style={{
                  background: colorPalette ? colorPalette.primary1 : "none",
                }}
                key={index}
              >
                <div className="grow-0 px-4">{userRank === undefined ? index + 1 : userRank}</div>
                <div className="w-16 h-16 rounded-full overflow-hidden scale-75 ">
                  <SmallProfilePicture user={user}/>
                </div>
                <div className="grow px-4">{user.username}</div>
                <div className="grow-0 pr-4">{user.exp} exp</div>
              </div>
            );
          } else {
            return (
              <div className="flex flex-row items-center py-1" key={index}>
                <div className="grow-0 px-4">{index + 1}</div>
                <div className="w-16 h-16 rounded-full overflow-hidden scale-75">
                    <SmallProfilePicture user={opt_user}/>
                </div>
                <div className="grow px-4">{opt_user.username}</div>
                <div className="grow-0 pr-4">{opt_user.exp} exp</div>
              </div>
            );
          }
        })
      ) : (
        <p>No users to display.</p>
      )}
    </div>
  );
}
