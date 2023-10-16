export default function applyHeaders() {
    const token = localStorage.getItem("jwt");
    return token ? {
        headers: {
            Authorization: `Bearer ${token}`,
            apiKey: process.env.API_KEY,
        },
    } : {
        headers: {
            apiKey: process.env.API_KEY,
        },
    };
}