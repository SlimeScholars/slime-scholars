import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../../components/play/Navbar";
import Leaderboard from '../../components/play/Leaderboard';
import ManageFriends from '../../components/play/ManageFriends';
import axios from "axios";

export default function Friends({ loading, user }) {
    const router = useRouter();
    const [userFriends, setUserFriends] = useState("empty for now");
    const [allPlayers, setAllPlayers] = useState("empty for now");

    useEffect(() => {
        if (loading) { return; }
        if (!user || user.userType !== 1) {
            router.push("/");
        }

        // Get userfriends for userfriendListings in leaderboard
        setUserFriends(user.friends);

        // Get allplayers for playerListings in leaderboard
        // Fetching top 20 players in order of exp
        const token = localStorage.getItem("jwt");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        };

        axios.get("/api/user/leaderboard", config)
            .then((response) => {
                console.log("playesListings",response.data);

                setAllPlayers(response.data);
                
            })
            .catch((error) => {console.log("playersListings",error.message)});

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
                        <div className="grow pl-4 font-galindo text-xl">
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
                                        .then((response) => {
                                        })
                                        .catch((error) => {
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
                            <Leaderboard 
                                userFriends={userFriends}
                                allPlayers={allPlayers}/>
                        </div>
                    </div>

                    {/* Manage Friends */}
                    <div className="basis-1/2 bg-white/75 rounded-lg">
                        <div className="p-8 flex flex-row">
                            <ManageFriends />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
