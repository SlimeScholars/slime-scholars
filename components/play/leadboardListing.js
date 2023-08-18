import { gameData } from "../../data/gameData.js";

export default function LeadboardListing({ users, currentType }) {

    if (currentType === "friends") {
        console.log(users);
        return (
            <div className="overflow-auto" id="friends-listing">
                {Array.isArray(users) ? (
                    users.map((user, index) => (
                        <div className="flex flex-row items-center" key={user.id}>
                            <div className="grow-0 px-4">{index+1}</div>
                            <div className="rounded-full">
                                <div className="relative">
                                    <img src={"/assets/pfp/backgrounds/"+gameData.items[user.pfpBg].pfp}
                                        className="absolution inset-0 w-full h-full"></img>
                                    <img src={"/assets/pfp/slimes/blue-slime.png"}
                                        className="relative z-10"></img>
                                <div/>
                            </div>
                            <div className="grow">{user.username}</div>
                            <div className="grow-0">{user.exp} exp</div>
                        </div>
                    ))
                ) : (
                    <p>No users to display.</p>
                )}
            </div>
        );
    } else {
        // TODO
    }
}