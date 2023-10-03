import { useState } from "react"
import Navbar from "./navbar"
import CourseSidebar from "./courseSidebar"

export default function CourseLayout({children, colorPalette, setUser, user}){
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return(
        <div className="absolute top-0 left-0 w-screen h-screen max-h-screen overflow-hidden">
            <Navbar colorPalette={colorPalette} setUser={setUser} user={user}/>
            {user ?
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
            </div>:
            children}
        </div>
    )
}