import { useEffect, useState } from "react"
import { activityService } from "../../../../services"
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi"

export default function EditActivitySide({activity, refresh, setLoading, theme}){

    const [page, setPage] = useState(activity.pages.length > 0 ? 0 : null)

    useEffect(() => {
        if(page === null && activity.pages.length > 0){setPage(activity.pages.length-1)}
    }, [activity])

    const handleNewPage = async() => {
        setLoading(true)
        try{
            const payload = [activity._id, [...activity.pages, {sections:[], 
                pageNumber:activity.pages.length+1}], activity.pages.length, 2]
            console.log(payload)
            await activityService.update(activity._id, [...activity.pages.map((page, num) => {return{...page, pageNumber:num+1}}), {sections:[], 
                pageNumber:activity.pages.length+1}], activity.pages.length, 2)
            setLoading(false)
            setPage(0)
            refresh()
        }
        catch(err){
            console.log(err) 
            setLoading(false)
        }
    }

    if(page === null){return(
        <div className={`flex flex-col gap-4 items-center justify-center w-full h-full ${theme.bg_text1} text-black
        transition-colors duration-300`}>
            <div className="text-2xl font-bold">
                This lesson currently has no content!
            </div>
            <button className={`rounded-md ${theme.bg_primary1} hover:brightness-[1.2] ${theme.text_text2} py-2 px-8`}
            onClick={handleNewPage}>
                + New Page
            </button>
        </div>
    )}

    return(
        <div className={`relative flex flex-col py-5 items-center w-full h-full ${theme.bg_text1} text-black
        transition-colors duration-300`}>
            <button className={`absolute top-[1.5rem] right-[1.5rem] bg-green-600/[0.9] border-2 border-black/[0.4] 
            hover:brightness-[1.2] text-md ${theme.text_text2} px-10 rounded-xl py-1`}
                onClick={handleNewPage}>
                + New Page
            </button>
            <button className={`absolute top-[1.5rem] left-[1.5rem] border-2 border-red-900/[0.9] bg-red-600/[0.9] 
            hover:brightness-[1.2] text-md ${theme.text_text2} px-10 rounded-xl py-1`} 
                onClick={handleNewPage}>
                Delete Page
            </button>
            <div className="text-2xl font-bold flex flex-row gap-7 items-center rounded-full border-2 border-black/[0.4] 
            border-double px-4 py-1">
                <button disabled={page === 0}
                onClick={() => {setPage((prev) => prev-1)}}>
                    <BiSolidLeftArrow className={page === 0 ? "text-neutral-600 cursor-not-allowed" : 
                    "hover:text-neutral-500"}/>
                </button>
                Page {page+1} / {activity.pages.length}
                <button disabled={page === activity.pages.length-1}
                onClick={() => {setPage((prev) => prev+1)}}>
                    <BiSolidRightArrow className={page === activity.pages.length-1 ? "text-neutral-600 cursor-not-allowed" : 
                    "hover:text-neutral-500"}/>
                </button>
            </div>
            <div className="mt-4 p-6 border-t-2 border-black/[0.4] w-full">
                Hello! This page is empty.
            </div>
        </div>
    )
}