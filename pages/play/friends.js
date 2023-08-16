import {useEffect} from "react";
import {useRouter} from "next/router";
import {Navbar} from "../../components/play/Navbar";
import axios from "axios";

export default function Friends({ loading, user }) {
    const router = useRouter();

    useEffect(() => {
        if (loading) {return;}
        if (!user || user.userType !== 1) {
            router.push("/");
        }
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
            </div>
            
        </div>
    );
}