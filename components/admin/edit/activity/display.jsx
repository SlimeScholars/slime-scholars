import { useState, useEffect } from "react"

export default function EditActivityDisplay({activity, theme}){

    const [page, setPage] = useState(activity.pages.length > 0 ? 0 : null)

    useEffect(() => {
        if(page === null && activity.pages.length > 0){setPage(activity.pages.length-1)}
    }, [activity])

    return(
        <div className={`w-full h-full transition-colors duration-300`}> 
            DISPLAY
        </div>
    )
}