'use server'
import { cookies } from "next/headers"
import Cookies from "js-cookie";


export const setTokenCookie = (userToken) => {
    try{
        cookies().set("__session", userToken);
        // Cookies.set('userToken', userToken);
        // const token = Cookies.get('__session');
        const token = cookies().get('__session')

        console.log(("Token di coookies: " + token).slice(0, 30));
    } catch(e) {
        console.error(`Failed to set token : ${e.message}`);
    }
};

export const deleteTokenCookie = () => {
    try {
        Cookies.remove('userToken')
    } catch(e) {
        console.error(`Failed to delete token : ${e.message}`);
    }
}