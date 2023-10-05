import { useEffect, useState } from "react"
import { activityService } from "../../../../services"
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi"
import Section from "./section"

export default function EditActivitySide({activity, refresh, setLoading, theme}){

    const [page, setPage] = useState(activity.pages.length > 0 ? 0 : null)

    useEffect(() => {
        if(page === null && activity.pages.length > 0){setPage(activity.pages.length-1)}
    }, [activity])

    const handleNewPage = async() => {
        setLoading(true)
        try{
            await activityService.update(activity._id, [...activity.pages.map((page, num) => {return{...page, pageNumber:num+1}}), {sections:[], 
                pageNumber:activity.pages.length+1}], activity.pages.length, 0)
            setLoading(false)
            setPage(activity.pages.length)
            refresh()
        }
        catch(err){
            console.log(err) 
            setLoading(false)
        }
    }

    const handleDeletePage = async() => {
        setLoading(true)
        try{
            const clone = [...activity.pages]
            clone.splice(page, 1)
            await activityService.update(activity._id, [...clone.map((page, num) => {return{...page, pageNumber:num+1}})], 
                page-1, 0)
            setLoading(false)
            setPage((current) => current === 0 ? (activity.pages.length === 1 ? null : 0) : current-1)
            refresh()
        }
        catch(err){
            console.log(err) 
            setLoading(false)
        }
    }
    
    const handleAppendSection = async() => {
        setLoading(true)
        try{
            await activityService.update(activity._id, [...activity.pages.map((pageData, num) => {
                if(num != page){return {...pageData, pageNumber:num+1}}
                else{
                    return {...pageData, pageNumber:num+1, sections:[...pageData.sections, 
                        {sectionIndex: pageData.sections.length+1, sectionStyle: "plain", sectionDirection: "vertical", elements:[]}]}
                }
            })], 
            page, 0)
            setLoading(false)
            refresh()
        }
        catch(err){
            console.log(err)
            setLoading(false)
        }
    }

    if(page === null){return(
        <div className={`flex flex-col gap-4 items-center justify-center w-full h-full text-black
        transition-colors duration-300`}
        style={{backgroundColor: theme.semi_light}}>
            <div className="text-2xl font-bold">
                This lesson currently has no content!
            </div>
            <button className={`rounded-md ${theme.bg_primary1} hover:brightness-[1.2] py-2 px-8`}
            onClick={handleNewPage}
            style={{backgroundColor: theme.ultra_light, color: theme.dark}}>
                + New Page
            </button>
        </div>
    )}

    if(activity.pages.length <= page){return(
        <div className={`flex flex-col gap-4 items-center justify-center w-full h-full text-black
        transition-colors duration-300`}
        style={{backgroundColor: theme.semi_light}}>
        </div>
    )}

    return(
        <div className={`relative flex flex-col py-5 items-center w-full h-full text-black
        transition-colors duration-300`}
        style={{backgroundColor: theme.semi_light}}>
            <button className={`absolute top-[1.5rem] right-[1.5rem] bg-green-600/[0.9] 
            hover:brightness-[1.2] text-md px-10 rounded-xl py-1 shadow-lg`}
            style={{color: theme.ultra_light}}
                onClick={handleNewPage}>
                + New Page
            </button>
            <button className={`absolute top-[1.5rem] left-[1.5rem] bg-red-600/[0.9]
            hover:brightness-[1.2] text-md px-10 rounded-xl py-1 shadow-lg`} 
            style={{color: theme.ultra_light}}
                onClick={handleDeletePage}>
                Delete Page
            </button>
            <div className="text-xl font-bold flex flex-row gap-7 items-center rounded-full px-4 py-1 shadow-xl"
            style={{backgroundColor: theme.ultra_light}}>
                <button disabled={page === 0}
                onClick={() => {setPage((prev) => prev-1)}}>
                    <BiSolidLeftArrow className={page === 0 ? "text-neutral-400 cursor-not-allowed" : 
                    "hover:text-neutral-600"}/>
                </button>
                Page {page+1} / {activity.pages.length}
                <button disabled={page === activity.pages.length-1}
                onClick={() => {setPage((prev) => prev+1)}}>
                    <BiSolidRightArrow className={page === activity.pages.length-1 ? "text-neutral-400 cursor-not-allowed" : 
                    "hover:text-neutral-600"}/>
                </button>
            </div>
            <div className="flex flex-col gap-4 mt-4 p-6 border-t-2 border-black/[0.4] w-full">
                {activity.pages[page].sections.map((section, key) => <Section section={section} key={key} index={key+1} theme={theme}/>)}
                <button className={`w-full rounded-xl text-white py-1 hover:brightness-[1.5]`} style={{backgroundColor: theme.dark}}
                onClick={handleAppendSection}>
                    + Add Section
                </button>
            </div>
        </div>
    )
}