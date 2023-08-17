
import { switchButton } from "./switchButton";
import { LeadboardListing } from "./leadboardListing";

export default function Leaderbaord({userFriends}) {

    return (
        <div className="p-8">
            <div className="flex flex-col">
                <div className="grow text-xl">
                    Leaderboard
                </div>

                <div className="grow-0">
                    <div className="rounded-full border-4 border-red-200">
                        <switchButton />
                    </div>
                </div>
            </div>
            <div className="flex flex-col grow">
                <LeadboardListing userFriends={userFriends}/>
            </div>
        </div>
    )
}