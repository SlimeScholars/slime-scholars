import { useState, useEffect, useCallback, useRef } from "react";
import { AiFillEye, AiOutlineCloseCircle} from 'react-icons/ai'

export default function FreeResponseElement({element, index, colorPalette, bold, horiz}){
    const [data, setData] = useState(element)
    const [input, setInput] = useState("")

    const [verified, setVerified] = useState(null)
    const [solHeight, setSolHeight] = useState(0)

    const [expOpen, setExpOpen] = useState(false)

    const solRef = useRef(null);
    const initExpRef = useRef(null);
    const expRef = useRef(null);

    useEffect(() => {
        if(solRef.current){setSolHeight(solRef.current.offsetHeight)}
    }, [verified, expOpen])

    useEffect(() => {
        setData(element)
    }, [element])

    const verify = useCallback((resp) => {
        return data.blank.indexOf(resp) > -1
    })

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setVerified(verify(input) ? "correct" : "incorrect")
        }
    }

    return(
        <div className={`flex relative transition-all
        flex-col gap-1 text-md 2xl:text-[1.07em] shadow-md ${bold ? "font-black" : "font-semibold"} 
        py-2 px-4`} 
        style={{
            color:colorPalette.black,
            backgroundColor: colorPalette.primary2 + "18",
            height: verified ? `${solHeight}px` : "auto",
            width: "auto"
        }}>
            <div className="flex flex-col gap-1 transition-opacity duration-200 z-[100]"
            style={{
                opacity: verified ? 0 : 1,
            }}>
                <div className={`${bold ? "font-bold" : "font-normal"}`}>
                    <span>{data.text}</span> 
                    <input className="mx-1 rounded-sm px-1 w-[7.5rem] focus:outline-none z-[100]"
                    value={input}
                    style={{
                        backgroundColor: "#ffffff80",
                        color: colorPalette.black
                    }}
                    onChange={(e) => {
                        setInput(e.target.value)
                    }}
                    onKeyDown={(e)=>{
                        e.stopPropagation()
                        handleKeyPress(e)
                    }}/>
                    <span>{data.afterBlank}</span>
                </div>
                <button className="px-8 py-1 w-min rounded-md mt-1 font-bold hover:brightness-[0.85]"
                style={{
                    backgroundColor: colorPalette.primary2 + "38",
                    color:colorPalette.black
                }}
                onClick={() => {
                    setVerified(verify(input) ? "correct" : "incorrect")
                }}>
                    Submit
                </button>
            </div>
            <div className="absolute top-0 left-0 w-full p-4" ref={solRef}>
                <div className="p-2 transition-opacity delay-200 duration-200 rounded-md"
                style={{
                    color:colorPalette.black,
                    //backgroundColor: colorPalette.primary2 + "40",
                    opacity: verified ? 1 : 0
                }}>
                    {verified === "correct" ? 
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <img src="/assets/icons/happy-slime.png" className="w-auto h-[120px] cor-img"/>
                        <span className="text-xl font-bold">Correct!</span>
                    </div>
                    :verified === "incorrect" ? 
                    <div className="flex flex-col gap-1 items-center justify-center">
                        <img src="/assets/icons/sad-slime.png" className="w-auto h-[120px] incor-img"/>
                        <span className="text-xl font-bold">Incorrect...</span>
                    </div>
                    :<></>}
                        <div className="flex flex-col gap-1 items-center">
                            <span className="italic">Correct Answer(s): {(() => {
                                let output = ""
                                data.blank.forEach((item) => {
                                    output += item + ", "
                                })
                                return data.blank.length > 0 ? output.substring(0, output.length-2) : "[No Answers]"
                            })()}</span>
                            <span className="italic">Your Answer: {input ? input : "[Blank]"}</span>
                            <div className={`mt-2 flex flex-row gap-2 items-center rounded-md
                            px-8 py-2 transition-all shadow-md ${expOpen ? "cursor-auto" : "cursor-pointer"}`}
                            style={{
                                backgroundColor: colorPalette.primary1 + "28"
                            }}
                            onClick={() => {if(!expOpen){setExpOpen(true)}}} ref={initExpRef}>
                            {!expOpen ? 
                            <><AiFillEye/>View Explanation</>
                            :<div className="flex flex-col items-center" ref={expRef}>
                                <button 
                                className="flex flex-row items-center gap-1"
                                onClick={() => {setExpOpen(!expOpen)}}>
                                    <AiOutlineCloseCircle/>
                                    Close Explanation
                                </button>
                                <span className="font-light text-center">{data.explanation}</span>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}