import { gameData } from "../../data/gameData"
import Image from "next/image"

export default function ProfilePicture({user}){
    return user && user.pfpSlime ? 
    <div className="relative flex items-center justify-center">
        <div className="absolute h-32 w-32 overflow-hidden">
        <Image
            src={
            "/assets/pfp/backgrounds/" +
            gameData.items[user.pfpBg].bg
            }
            alt={user.pfpBg}
            height={0}
            width={0}
            sizes="100vw"
            className="absolute h-32 w-32"
        />
        </div>
        <Image
        src={
            "/assets/pfp/slimes/" +
            gameData.slimes[user.pfpSlime].pfp
        }
        alt={user.pfpSlime}
        height={0}
        width={0}
        sizes="100vw"
        className="relative z-10 translate-y-1/3 scale-150 w-[3.5rem] h-[3.5rem] max-xl:w-[3rem] max-xl:h-[2.5rem] max-xl:scale-350 max-xl:translate-y-1/2"
        />
    </div>
    : 
    // Handle the case when user or user.pfpSlime is null or undefined
    <div className="default-image">
        {"/assets/pfp/slimes/blue-slime.png"}
    </div>
}