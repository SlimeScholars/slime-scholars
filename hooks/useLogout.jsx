import cookies from "../services/cookies/cookies";

export default function useLogout(){
    const logout = () => {
        cookies.remove("slime-scholars-webapp-token")
        window.location.reload();
    }
    return {logout}
}