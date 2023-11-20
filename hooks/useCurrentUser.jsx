import { useState, useEffect } from "react";
import cookies from "../services/cookies/cookies";
import axios from "axios"
import { useRouter } from "next/router";

export default function useCurrentUser(){
    const [user, rsetUser] = useState(null)
    const {router} = useRouter()

    const handleFetchErr = (err) => {
        router.push("/no-user")
    }

    const refetch = async() => {
        try {
            const token = cookies.get("slime-scholars-webapp-token")
            if (!token) {
                rsetUser(null);
                return;
            }
            const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                common: {apikey: process.env.NEXT_PUBLIC_API_KEY},
            }};
    
            await axios.get("/api/user", config)
            .then((response) => {
                if (response.data && response.data.user) {
                    rsetUser(response.data.user, false);
                }
            })
            .catch((err) => {
                handleFetchErr(err)
            });
        } catch (err) {
            handleFetchErr(err)
        }
    }

    const setUser = (params) => {
        rsetUser(params)
        refetch()
    }

    useEffect(() => {
        refetch()
        cookies.logChange()
    }, [])

    return {user, setUser}
}