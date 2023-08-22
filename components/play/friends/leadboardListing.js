import { gameData } from "../../../data/gameData.js";

export default function LeadboardListing({ users, userId }) {

    return (
        <div 
            className="overflow-y-auto max-h-96" 
            id="friends-listing">
            {Array.isArray(users) ? (
                users.map((user, index) => {
                    if (user._id === userId) { 
                        return (
                            <div className="flex flex-row items-center py-4 bg-red-300" key={index}>
                                <div className="grow-0 px-4">{index+1}</div>
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <div className="relative">
                                        <img src={"/assets/pfp/backgrounds/"+gameData.items[user.pfpBg].pfp}
                                            className="absolute inset-0"></img>
                                        <img src={"/assets/pfp/slimes/"+gameData.slimePfps[user.pfpSlime].pfp}
                                            className="relative z-10 translate-y-1/4 scale-125"></img>
                                    </div>
                                </div>
                                <div className="grow px-4">{user.username}</div>
                                <div className="grow-0 pr-4">{user.exp} exp</div>
                            </div>
                )} else {
                    return (
                        <div className="flex flex-row items-center py-4" key={index}>
                            <div className="grow-0 px-4">{index+1}</div>
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                <div className="relative">
                                    <img src={"/assets/pfp/backgrounds/"+gameData.items[user.pfpBg].pfp}
                                        className="absolute inset-0"></img>
                                    <img src={"/assets/pfp/slimes/"+gameData.slimePfps[user.pfpSlime].pfp}
                                        className="relative z-10 translate-y-1/4 scale-125"></img>
                                </div>
                            </div>
                            <div className="grow px-4">{user.username}</div>
                            <div className="grow-0 pr-4">{user.exp} exp</div>
                        </div>
                    )
                }
            })
            ) : (
                <p>No users to display.</p>
            )}
        </div>
    );
}