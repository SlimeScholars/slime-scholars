import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Slimes({ loading, user }) {
    const router = useRouter();

    useEffect(() => {
        if (loading) {return;}
        if (!user || user.userType !== 1) {
            router.push("/");
        }
    }, [user, loading]);

    return (
        <div className="w-screen h-screen bg-cover bg-[url('/assets/backgrounds/bg-beach.png')]">

        </div>
    );
}