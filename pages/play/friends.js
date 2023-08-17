import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../../components/play/Navbar";
import { Leaderboard } from "../../components/play/Leaderboard";
import axios from "axios";

export default function Friends({ loading, user }) {
    const router = useRouter();

    const friendsOnClick = {
        friendsClassName: "pr-4 bg-red-200 rounded-full",
        playersClassName: "rounded-full"
    };
    const playersOnClick = {
        friendsClassName: "rounded-full",
        playersClassName: "pr-4 bg-red-200 rounded-full"
    }

    const [switchBtn, setSwitchBtn] = useState(friendsOnClick);
    const [currentType, setCurrentType] = useState("friends");

    useEffect(() => {
        if (loading) { return; }
        if (!user || user.userType !== 1) {
            router.push("/");
        }
        console.log(user)
    }, [user, loading]);

    return (
        <div className="p-8 w-screen h-screen bg-cover bg-[url('/assets/backgrounds/bg-beach.png')]">
            <Navbar
                current="2"
            ></Navbar>

            <div className="pt-5">
                <div className="items-center justify-between">
                    {/*  Add Friend  and others (TODO) */}
                    <div className="flex flex-row bg-white/75 rounded-lg items-center">
                        <div className="grow-0 pl-4">
                            <img src="/assets/icons/friends.png" className="h-20 w-20"></img>
                        </div>
                        <div  className="grow pl-4 font-galindo text-xl">
                            Friends
                        </div>
                        <div className="grow-0 flex grow pr-4">
                            <button className="p-2 text-xl bg-red-300 hover:bg-red-300/50 rounded-lg font-galindo"
                                onClick={() => {
                                    const token = localStorage.getItem('jwt');
                                    const config = {
                                        headers: {
                                        Authorization: `Bearer ${token}`,
                                        },
                                    };
                                    axios.post('/api/slime/level-up', {
                                    }, config)
                                    .then((response)=>{
                                        console.log(response)
                                    })
                                    .catch((error) => {
                                        console.error(error.message);
                                    })
                                }}>
                                Add Friends
                            </button>
                        </div>
                    </div>
                </div>

                {/* Default: leaderboard and managing friends */}
                <div className="pt-8 flex flex-row items-center font-galindo">

                    {/* Leaderboard */}
                    <div className="pr-4 basis-1/2 ">
                        <div className="bg-white/75 rounded-lg">
                            <Leaderboard userFriends={user.friends}/>
                        </div>
                        
                    </div>

                    {/* Manage Friends */}
                    <div className="basis-1/2 bg-white/75 rounded-lg">
                        <div className="p-8 flex flex-row">
                            <div className="grow text-xl">
                                Manage Friends
                            </div>

                            <div className="grow-0">
                                <div className="rounded-full border-4 border-red-200">
                                    <button data-name="friends" className="p-4" >
                                        Friends
                                    </button>
                                    <button data-name="all_players" className="p-4">
                                        All players
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>            
        </div>
    );
}