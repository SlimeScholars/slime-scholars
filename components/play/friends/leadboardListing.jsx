import Image from "next/image.js";
import { gameData } from "../../../data/gameData.js";

export default function LeadboardListing({ user, userRank, users, userId, colorPalette }) {
  return (
    <div id="friends-listing">
      {Array.isArray(users) ? (
        users.map((user, index) => {
          const pfpBg = user.pfpBg || ''; // Ensure pfpBg has a default value
          const pfpSlime = user.pfpSlime || ''; // Ensure pfpSlime has a default value
          if (user._id === userId) {
            return (
              <div
                className="flex flex-row items-center py-4 "
                style={{
                  background: colorPalette ? colorPalette.primary1 : "none",
                }}
                key={index}
              >
                <div className="grow-0 px-4">{userRank === undefined ? index + 1 : userRank}</div>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <div className="relative">
                    <Image
                      src={
                        "/assets/pfp/backgrounds/" +
                        gameData.items[pfpBg].pfp
                      }
                      alt={user.pfpBg}
                      height={0}
                      width={0}
                      sizes='100vw'
                      className="absolute inset-0 w-full h-full"
                    />
                    <Image
                      src={
                        "/assets/pfp/slimes/" +
                        gameData.slimeImgs[pfpSlime].pfp
                      }
                      alt={user.pfpSlime}
                      height={0}
                      width={0}
                      sizes='100vw'
                      className="relative z-10 translate-y-1/4 scale-125 h-10 w-10"
                    />
                  </div>
                </div>
                <div className="grow px-4">{user.username}</div>
                <div className="grow-0 pr-4">{user.exp} exp</div>
              </div>
            );
          } else {
            return (
              <div className="flex flex-row items-center py-4" key={index}>
                <div className="grow-0 px-4">{index + 1}</div>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <div className="relative">
                    <Image
                      src={
                        "/assets/pfp/backgrounds/" +
                        gameData.items[user.pfpBg].pfp
                      }
                      alt={user.pfpBg}
                      height={0}
                      width={0}
                      sizes='100vw'
                      className="absolute inset-0 w-full h-full"
                    />
                    <Image
                      src={
                        "/assets/pfp/slimes/" +
                        gameData.slimeImgs[user.pfpSlime].pfp
                      }
                      alt={user.pfpSlime}
                      height={0}
                      width={0}
                      sizes='100vw'
                      className="relative z-10 translate-y-1/4 scale-125 h-10 w-10"
                    />
                  </div>
                </div>
                <div className="grow px-4">{user.username}</div>
                <div className="grow-0 pr-4">{user.exp} exp</div>
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
