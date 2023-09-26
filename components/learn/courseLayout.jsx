import { useState } from "react"
import CourseNavbar from "./courseNavbar"
import CourseSidebar from "./courseSidebar"

export default function CourseLayout({children, colorPalette, user}){
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return(
        <div className="absolute top-0 left-0 w-screen h-screen max-h-screen overflow-hidden">
            <CourseNavbar colorPalette={colorPalette} user={user}/>
            <div className={`transition-all duration-150 grid 
            ${sidebarOpen ? "courselayout-grid-open" : "courselayout-grid-close"}`}>
                <div className={`transition-all duration-150 ${sidebarOpen ? "w-[300px]" : "w-[20px]"}`}>
                    <CourseSidebar colorPalette={colorPalette} open={sidebarOpen} setOpen={setSidebarOpen}/>
                </div>
                {children}
            </div>
        </div>
    )
}