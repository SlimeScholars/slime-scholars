import { useState, useEffect, useCallback, useRef } from "react";
import { AiFillEye, AiOutlineCloseCircle} from 'react-icons/ai'

export default function MultipleChoiceElement({element, index, colorPalette, bold, horiz}){
    const [data, setData] = useState(element)
    const [selectedIndex, setSelectedIndex] = useState(-1)

    const [verified, setVerified] = useState(null)
    const [solHeight, setSolHeight] = useState(0)

    const [expOpen, setExpOpen] = useState(false)

    const solRef = useRef(null);
    const initExpRef = useRef(null);
    const expRef = useRef(null);

    useEffect(() => {
        setData(element)
    }, [element])

    useEffect(() => {
        if(solRef.current){setSolHeight(solRef.current.offsetHeight)}
    }, [verified, expOpen])

    const verify = useCallback((index) => {
        return data.options[index].correct
    }, [data])

    return(
        <div className={`text-md 2xl:text-[1.07em] ${bold ? "font-black" : "font-semibold"} 
        relative transition-all py-2 px-4`} style={{
            color:colorPalette.black,
            backgroundColor: colorPalette.primary2 + "18",
            //FIXME: LINE HEIGHT
            height: verified ? `${solHeight}px` : "auto",
            width: "auto"
        }}>
            <div className="flex flex-col gap-2 transition-opacity duration-200 z-[100]"
            style={{
                opacity: verified ? 0 : 1,
            }}>
                <span className="mb-1">{data.text}</span>
                {data.options && data.options.map((item, key) => {
                    return(
                        <div className="flex flex-row items-center gap-4 z-[100]">
                            <div className="mc-button z-[100] cursor-pointer"
                            style={{
                                backgroundColor: key === selectedIndex ? colorPalette.primary1 : "transparent"
                            }}
                            onClick={() => {
                                setSelectedIndex(key)
                            }}/>
                            {item.option}
                        </div>
                    )
                })}
                <button className="px-8 py-1 w-min rounded-md mt-2 font-bold hover:brightness-[0.85] z-[100]"
                style={{
                    backgroundColor: colorPalette.primary2 + "38",
                    color:colorPalette.black
                }}
                onClick={() => {
                    setVerified(verify(selectedIndex) ? "correct" : "incorrect")
                }}>
                    Submit
                </button>
            </div>
            <div className="absolute top-0 left-0 w-full p-4 z-[0]" ref={solRef}>
                <div className="p-2 transition-opacity delay-200 duration-200 rounded-md"
                style={{
                    color:colorPalette.black,
                    //backgroundColor: colorPalette.primary2 + "40",
                    opacity: verified ? 1 : 0
                }}>
                    {verified === "correct" ? 
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <img src="/assets/misc/bucktooth.png" className="w-auto h-[100px]"/>
                        <span className="text-xl font-bold">Correct!</span>
                    </div>
                    :verified === "incorrect" ? 
                    <div className="flex flex-col gap-1 items-center justify-center">
                        <img src="/assets/misc/angryred.png" className="w-auto h-[100px]"/>
                        <span className="text-xl font-bold">Incorrect...</span>
                    </div>
                    :<></>}
                        <div className="flex flex-col gap-1 items-center">
                            <span className="italic">Correct Answer(s): {(() => {
                                let output = ""
                                data.options.forEach((item) => {
                                    if(item.correct){output += item.option + ", "}
                                })
                                return output.length > 0 ? output.substring(0, output.length-2) : "[No Answers]"
                            })()}</span>
                            <span className="italic">Your Answer: {selectedIndex > -1 ? data.options[selectedIndex].option : "[Blank]"}</span>
                            <div className={`mt-2 flex flex-row gap-2 items-center rounded-md
                            px-8 py-2 transition-all ${expOpen ? "cursor-auto" : "cursor-pointer"}`}
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