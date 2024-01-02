import cookies from "../services/cookies/cookies";

export default function applyHeaders() {
    const token = cookies.get("slime-scholars-webapp-token");
    return token ? {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    } : {
        headers: {
        },
    };
}