import Image from "next/image.js";
import { gameData } from "../../../data/gameData.js";

export default function LeadboardListing({ users, userId }) {
  return (
    <div className="overflow-y-auto max-h-80" id="friends-listing">
      {Array.isArray(users) ? (
        users.map((user, index) => {
          if (user._id === userId) {
            return (
              <div
                className="flex flex-row items-center py-4 bg-red-300"
                key={index}
              >
                <div className="grow-0 px-4">{index + 1}</div>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <div className="relative">
                    <Image
                      src={
                        "/assets/pfp/backgrounds/" +
                        gameData.items[user.pfpBg].pfp
                      }
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
