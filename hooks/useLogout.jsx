import cookies from "../services/cookies/cookies";

export default function useLogout(router, setUserLoading, setUser) {
    const delay = (duration) => {
        return new Promise(resolve => setTimeout(resolve, duration));
    }

    const logout = async () => {
        setUserLoading(true)
        router.push("/")
        await delay(750)
        cookies.remove("slime-scholars-webapp-token")
        setUser(null)
        await delay(500)
        setUserLoading(false)
    }
    return { logout }
}