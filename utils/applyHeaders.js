export default function applyHeaders(){
    const token = localStorage.getItem("jwt");
    return token ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    } : {
        headers: {}
    };
}