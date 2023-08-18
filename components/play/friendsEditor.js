import { gameData } from "../../data/gameData";

export default function FriendsEditor({ userFriends, friendsOnlist }) {

    if (friendsOnlist === "empty for now") {
        return (
            <div className="grid grid-cols-2 gap-4">
                {Array.isArray(userFriends) ? (
                    userFriends.map((user, index) => {

                        return (
                            <div key={index} className="bg-red-200 rounded-xl flex flex-row items-center p-4">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <div className="relative">
                                        <img src={"/assets/pfp/backgrounds/" + gameData.items[user.pfpBg].pfp}
                                            className="absolute inset-0"></img>
                                        <img src={"/assets/pfp/slimes/" + gameData.slimePfps[user.pfpSlime].pfp}
                                            className="relative z-10 translate-y-1/4 scale-125 h-10 w-10"></img>
                                    </div>
                                </div>
                                <div className="grow px-4">{user.username}</div>
                                <button
                                    className="bg-red-400 rounded-lg p-2"
                                    onClick={() => handleDeleteFriend(user._id)}
                                >X</button>
                            </div>
                        )

                    })) : (
                    <p>No friends to display.</p>
                )
                }
            </div>
        )
    }
    else {
        <div className="grid grid-cols-2 gap-4">
            {Array.isArray(userFriends) ? (
                userFriends.map((user, index) => {

                    return (
                        <div key={index} className="bg-red-200 rounded-xl flex flex-row items-center p-4">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                <div className="relative">
                                    <img src={"/assets/pfp/backgrounds/" + gameData.items[user.pfpBg].pfp}
                                        className="absolute inset-0"></img>
                                    <img src={"/assets/pfp/slimes/" + gameData.slimePfps[user.pfpSlime].pfp}
                                        className="relative z-10 translate-y-1/4 scale-125 h-10 w-10"></img>
                                </div>
                            </div>
                            <div className="grow px-4">{user.username}</div>
                            <button
                                className="bg-red-400 rounded-lg p-2"
                                onClick={() => handleDeleteFriend(user._id)}
                            >X</button>
                        </div>
                    )

                })) : (
                <p>No result to display.</p>
            )
            }
        </div>
    }
}