import Cookies from "js-cookie";

class CookieWrapper {
    cookies;

    constructor(){
        this.cookies = Cookies.get()
    }

    get = (key) => {
        return this.cookies[key];
    }

    set = (key, value, source=null) => {
        Cookies.set(key, value);
        this.cookies[key] = value;
        this.cookies={...this.cookies}
        //this.logChange(source ? source : 'unspecified');
    }
 
    remove = (key, source=null) => {
        Cookies.remove(key);
        delete this.cookies[key];
        this.cookies={...this.cookies}
        //this.logChange(source ? source : 'unspecified');
    }

    logChange(source){
        console.log("Change from " + source + ":")
        console.log(this.cookies)
    }
}

const cookies = new CookieWrapper();
export default cookies;