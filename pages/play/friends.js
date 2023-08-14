import {useEffect} from "react";
import {useRouter} from "next/router";
import {Navbar} from "../../components/play/Navbar";

export default function Friends({ loading, user }) {
    const router = useRouter();

    useEffect(() => {
        if (loading) {return;}
        if (!user || user.userType !== 1) {
            router.push("/");
        }
    }, [user, loading]);

    return (
        <div className="w-screen h-screen bg-cover bg-[url('/assets/backgrounds/bg-beach.png')]">
            <Navbar
                current="2"
            ></Navbar>

            <div className="p-8 items-center justify-between p-5">
                {/*  Add Friend */}
                <div className="flex flex-row bg-white/75 rounded-lg items-center">
                    <div className="grow-0 pl-4">
                        <img src="/assets/icons/friends.png" className="h-20 w-20"></img>
                    </div>
                    <div  className="grow pl-4 font-galindo text-xl">
                        Friends
                    </div>
                    <div className="grow-0 flex grow pr-4">
                        <button className="p-2 text-xl bg-red-300 hover:bg-red-300/50 rounded-lg font-galindo">
                            Add Friends
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}