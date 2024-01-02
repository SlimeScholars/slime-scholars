import cookies from "../services/cookies/cookies"
import { encrypt } from "../utils/rsa"
import axios from "axios"

export default function useLogin(){
    const login = async(accountIdentifier, password) => {
        const encryptedPassword = encrypt(
            password,
            process.env.NEXT_PUBLIC_ENCRYPTION_KEY_2,
            process.env.NEXT_PUBLIC_ENCRYPTION_KEY
          );
        return await axios.post("/api/user/login",
            { accountIdentifier, encryptedPassword },
            {headers: {
                post: {apikey: process.env.NEXT_PUBLIC_API_KEY},
            }}).then((response) => {
                if (response.data) {
                    cookies.set("slime-scholars-webapp-token", response.data.token)
                    return response
                }
                return null;
            }).catch(err => {
                return err
            });
    }

    return {login}
}