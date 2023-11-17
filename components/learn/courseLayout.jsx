import { useState } from "react"
import Navbar from "../main/navbar"
import CourseSidebar from "./courseSidebar"
import { useRouter } from "next/router"

export default function CourseLayout({children, colorPalette, setUser, user}){
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const router = useRouter();

    const sidebarOverride = () => {
        if(router.asPath.includes('/activity/') || router.asPath.includes('/assessment/')){
            return false
        }
        return true
    }

    return(
        <div className="absolute top-0 left-0 w-screen h-screen max-h-screen overflow-hidden">
            <Navbar colorPalette={colorPalette} setUser={setUser} user={user}/>
            {user ?
                sidebarOverride() ? 
                <div className={`transition-all duration-150 grid`}
                style={{
                    gridTemplateColumns: window.innerWidth > 1536 ? 
                    (sidebarOpen ? "300px auto" : "20px auto"):
                    (sidebarOpen ? "250px auto" : "15px auto")
                }}>
                    <div className={`transition-all duration-150 ${sidebarOpen ? "w-[250px] 2xl:w-[300px]" : "w-[15px] 2xl:w-[20px]"}`}>
                        <CourseSidebar colorPalette={colorPalette} open={sidebarOpen} setOpen={setSidebarOpen} user={user}/>
                    </div>
                    <div className="relative"
                    style={{
                        backgroundImage:
                            !colorPalette ? "" : `url('/assets/backgrounds/${colorPalette.bg}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "bottom"
                    }}>
                        {children}
                    </div>
                </div> 
                :
                <div className="relative w-full h-full"
                style={{
                    backgroundImage:
                        !colorPalette ? "" : `url('/assets/backgrounds/${colorPalette.bg}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom"
                }}>
                    {children}
                </div>
            :
            children}
        </div>
    )
}