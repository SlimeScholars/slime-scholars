import { useState, useEffect } from "react"
import { AiOutlineFullscreenExit, AiOutlineFullscreen, AiOutlineReload } from "react-icons/ai"
import { BiSolidLeftArrow, BiSolidRightArrow} from "react-icons/bi"
import DisplaySection from "./displaysection"

import { FaStar, FaRegStar } from 'react-icons/fa'

export default function EditAssessmentDisplay({assesssment, theme, displayOpen, setDisplayOpen, refetch}){

    const [page, setPage] = useState(assesssment.problemSet.length > 0 ? 0 : null)
    const [open, setOpen] = useState(0)

    useEffect(() => {
        if(page === null && assesssment.problemSet.length > 0){setPage(assesssment.problemSet.length-1)}
    }, [assesssment])

    useEffect(() => {
        setOpen(0)
    }, [page])

    return(
        <div className={`flex flex-col gap-4 w-full h-full transition-colors duration-300 p-5`}
        style={{
            maxWidth: "50vw"
        }}> 
            <div className="w-full h-[75%] outer-display-grid rounded-xl">
                {displayOpen &&
                <button className="absolute top-0 right-[25.9vw] z-[500] m-6 rounded-md
                bg-neutral-700 hover:bg-neutral-500 text-white hover:text-neutral-200 shadow-md 
                transition-all duration-200"
                onClick={() => {
                    setDisplayOpen((prev) => !prev)
                }}>
                    <div className="flex flex-row items-center justify-center gap-2 text-xs py-1 px-4">
                        <AiOutlineFullscreenExit/> Exit Full Screen
                    </div>
                </button>}
                <section className="relative z-[5] rounded-t-xl p-4 h-full"
                style={{
                    backgroundImage:`url('/assets/backgrounds/${theme.image}')`,
                    backgroundSize: "100% 100%"
                }}>
                    <div className="absolute top-0 left-0 w-full h-full"
                    style={{
                        backgroundColor: theme.light + "30"
                    }}/>
                    <div className="relative max-h-[100%] pb-10 overflow-y-scroll flex flex-col gap-3 z-[15]">
                        {page < assesssment.problemSet.length ?
                        assesssment.problemSet[page].sections.map((section, key) => 
                            <DisplaySection section={section} theme={theme} key={key}/>
                        ) : 
                        <div className="flex flex-col gap-2 relative rounded-md p-4 text-center text-sm" style={{
                            backgroundColor: theme.ultra_light
                        }}>
                            Congratulations! You have finished this assesssment!
                            <span className="flex flex-row gap-2 items-center justify-center w-full text-md">
                                <FaStar/>
                                <FaStar/>
                                <FaStar/>
                                <FaStar/>
                                <FaRegStar/>
                            </span>
                        </div>}
                    </div>
                </section>
                <section className="relative z-[20] flex flex-row justify-between items-center rounded-b-xl shadow-lg px-5"
                style={{
                    backgroundColor: theme.dark,
                }}>
                    <section className="flex flex-row items-center gap-2">
                        <div className="relative rounded-full w-[180px] h-[0.5rem]"
                        style={{
                            backgroundColor: theme.semi_dark
                        }}>
                            <div className="absolute top-[0px] left-[0px] rounded-full h-[0.5rem] transition-all duration-150 ease-out"
                            style={{
                                backgroundColor: theme.semi_light + "E0",
                                width: `${(180 * page)/assesssment.problemSet.length}px`
                            }}/>
                        </div>
                        <span className="font-semibold text-sm" style={{color: theme.semi_light}}>
                            {`${((100 * page)/assesssment.problemSet.length).toFixed(0)}`}%
                        </span>
                    </section>
                    <section className="flex flex-row gap-2 items-center text-xl origin-center scale-90"
                    style={{color: theme.dark + "C0"}}>
                        <button className="text-md" disabled={page === 0}
                        onClick={() => {setPage((prev) => prev-1)}}>
                            <BiSolidLeftArrow className={page === 0 ? "text-neutral-500 cursor-not-allowed" : 
                            "text-neutral-400 hover:text-neutral-300"}/>
                        </button>
                        <input className="text-sm w-[5rem] text-center font-semibold rounded-md" 
                        value={page < assesssment.problemSet.length ? page+1 : "Done"}
                        disabled={true}
                        style={{color:theme.dark, backgroundColor: theme.ultra_light}}>
                        </input>
                        <button className="text-md" disabled={page === assesssment.problemSet.length}
                        onClick={() => {setPage((prev) => prev+1)}}>
                            <BiSolidRightArrow className={page === assesssment.problemSet.length ? "text-neutral-500 cursor-not-allowed" : 
                            "text-neutral-400 hover:text-neutral-300"}/>
                        </button>
                    </section>
                </section>
            </div>
            <div className="flex flex-col gap-1">
                {!displayOpen && 
                <div className="grid grid-cols-2 gap-2">
                    <button className="py-1 bg-neutral-700 hover:bg-neutral-500 text-white rounded-md 
                    flex flex-row gap-2 items-center justify-center shadow-md"
                    onClick={refetch}>
                        <AiOutlineReload/> Reload Data
                    </button>
                    <button className="py-1 bg-neutral-700 hover:bg-neutral-500 text-white rounded-md 
                    flex flex-row gap-2 items-center justify-center shadow-md"
                    onClick={() => {
                        setDisplayOpen((prev) => !prev)
                    }}>
                        <AiOutlineFullscreen/> Full Screen
                    </button>
                </div>}
            </div>
        </div>
    )
}