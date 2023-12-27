import { useState, useEffect } from "react";
import cookies from "../services/cookies/cookies";
import axios from "axios"

export default function useCurrentUser({ setLoading }) {
    const [user, rsetUser] = useState(null)

    const handleFetchErr = (err) => {
        rsetUser(null)
        setLoading(false)
    }

    const refetch = async () => {
        try {
            const token = cookies.get("slime-scholars-webapp-token")
            if (!token) {
                throw new Error('No token found')
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    common: { apikey: process.env.NEXT_PUBLIC_API_KEY },
                }
            };

            await axios.get("/api/user", config)
                .then((response) => {
                    if (response.data && response.data.user) {
                        rsetUser(response.data.user, false);
                    }
                })
                .catch((err) => {
                    throw new Error(err)
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

    useEffect(() => {
        if (user) {
            setLoading(false)
        }
    }, [user])

    return { user, setUser }
}