import { useState, useEffect } from "react";
import cookies from "../services/cookies/cookies";
import axios from "axios"

export default function useCurrentUser(){
    const [user, rsetUser] = useState(null)

    const refetch = async() => {
        try {
            const token = cookies.get("slime-scholars-webapp-token")
            if (!token) {
                setUser(null);
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
                    setUser(response.data.user, false);
                }
            })
            .catch((err) => {
                console.log(err)
            });
        } catch (err) {
            console.log(err);
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