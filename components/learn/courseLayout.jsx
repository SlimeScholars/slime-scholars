import { useState } from "react"
import Navbar from "./navbar"
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
                <div className={`transition-all duration-150 grid 
                ${sidebarOpen ? "courselayout-grid-open" : "courselayout-grid-close"}`}>
                    <div className={`transition-all duration-150 ${sidebarOpen ? "w-[300px]" : "w-[20px]"}`}>
                        <CourseSidebar colorPalette={colorPalette} open={sidebarOpen} setOpen={setSidebarOpen} user={user}/>
                    </div>
                    <div className="relative"
                    style={{
                        backgroundImage:
                            !colorPalette ? "" : `url('/assets/backgrounds/${colorPalette.bg}')`,
                        backgroundSize: "100vw 100vh",
                    }}>
                        {children}
                    </div>
                </div> 
                :
                <div className="relative w-full h-full"
                style={{
                    backgroundImage:
                        !colorPalette ? "" : `url('/assets/backgrounds/${colorPalette.bg}')`,
                    backgroundSize: "100vw 100vh",
                }}>
                    {children}
                </div>
            :
            children}
        </div>
    )
}