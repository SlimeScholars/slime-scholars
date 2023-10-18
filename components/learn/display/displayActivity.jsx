import { useState, useEffect } from "react"
import { AiOutlineFullscreenExit, AiOutlineFullscreen, AiOutlineReload } from "react-icons/ai"
import { BiSolidLeftArrow, BiSolidRightArrow} from "react-icons/bi"
import DisplaySection from "../../admin/edit/activity/displaysection"

import { FaStar, FaRegStar } from 'react-icons/fa'

export default function DisplayActivity({activity, colorPalette, displayOpen, setDisplayOpen}){

    const [page, setPage] = useState(activity.pages.length > 0 ? 0 : null)
    const [open, setOpen] = useState(0)

    useEffect(() => {
        if(page === null && activity.pages.length > 0){setPage(activity.pages.length-1)}
    }, [activity])

    useEffect(() => {
        setOpen(0)
    }, [page])

    return(
        <div className={`flex flex-col gap-4 w-full h-full transition-colors duration-300 p-5 rounded-xl`}>
            <div className="w-full outer-display-grid rounded-xl px-[calc(5vw_+_40px)]">
                <section className="relative z-[5] rounded-t-xl p-4 h-full">
                    <div className="absolute top-0 left-0 w-full h-full"
                    style={{
                        backgroundColor: colorPalette.text1 + "60" 
                    }}/>
                    <div className="relative max-h-full pb-10 overflow-y-scroll flex flex-col gap-3 z-[15]">
                        {page < activity.pages.length ?
                        activity.pages[page].sections.map((section, key) => 
                            <DisplaySection section={section} theme={colorPalette} key={key}/>
                        ) : 
                        <div className="flex flex-col gap-2 relative rounded-md p-4 text-center text-sm" style={{
                            backgroundColor: colorPalette.white
                        }}>
                            Congratulations! You have finished this activity!
                            <span className="flex flex-row gap-2 items-center justify-center w-full text-md">
                                <FaStar/>
                                <FaStar/>
                                <FaRegStar/>
                            </span>
                        </div>}
                    </div>
                </section>
                <section className="relative z-[20] flex flex-row justify-between items-center rounded-b-xl shadow-lg px-5"
                style={{
                    backgroundColor: colorPalette.black,
                }}>
                    <section className="flex flex-row items-center gap-2">
                        <div className="relative rounded-full w-[180px] h-[0.5rem]"
                        style={{
                            backgroundColor: colorPalette.semi_dark
                        }}>
                            <div className="absolute top-[0px] left-[0px] rounded-full h-[0.5rem] transition-all duration-150 ease-out"
                            style={{
                                backgroundColor: colorPalette.semi_light + "E0",
                                width: `${(180 * page)/activity.pages.length}px`
                            }}/>
                        </div>
                        <span className="font-semibold text-sm" style={{color: colorPalette.semi_light}}>
                            {`${((100 * page)/activity.pages.length).toFixed(0)}`}%
                        </span>
                    </section>
                    <section className="flex flex-row gap-2 items-center text-xl origin-center scale-90"
                    style={{color: colorPalette.dark + "C0"}}>
                        <button className="text-md" disabled={page === 0}
                        onClick={() => {setPage((prev) => prev-1)}}>
                            <BiSolidLeftArrow className={page === 0 ? "text-neutral-500 cursor-not-allowed" : 
                            "text-neutral-400 hover:text-neutral-300"}/>
                        </button>
                        <input className="text-sm w-[5rem] text-center font-semibold rounded-md" 
                        value={page < activity.pages.length ? page+1 : "Done"}
                        disabled={true}
                        style={{color:colorPalette.dark, backgroundColor: colorPalette.ultra_light}}>
                        </input>
                        <button className="text-md" disabled={page === activity.pages.length}
                        onClick={() => {setPage((prev) => prev+1)}}>
                            <BiSolidRightArrow className={page === activity.pages.length ? "text-neutral-500 cursor-not-allowed" : 
                            "text-neutral-400 hover:text-neutral-300"}/>
                        </button>
                    </section>
                </section>
            </div>
        </div>
    )
}