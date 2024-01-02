import cookies from "../services/cookies/cookies";
import axios from "axios"

export default function useClosePanels(){
    const closePanels = async() => {
        const token = cookies.get("slime-scholars-webapp-token")

        const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        };
        await axios.post("/api/user/end-tutorial", {}, config);
    }

    return {closePanels}
}