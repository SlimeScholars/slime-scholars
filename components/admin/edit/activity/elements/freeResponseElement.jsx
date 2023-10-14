import { useEffect, useState } from "react"
import {AiFillSave, AiFillCloseCircle, AiFillEdit} from 'react-icons/ai'
import {BsFillTrashFill} from 'react-icons/bs'
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"

export default function FreeResponseElement({element, index, theme, handleChanges, handleDelete, handleSwap, max}){
    const [data, setData] = useState(element)
    const [open, setOpen] = useState(false)
    const [preText, setPreText] = useState("")
    const [postText, setPostText] = useState("")
    const [acceptedArray, setAcceptedArray] = useState([])
    const [expText, setExpText] = useState("")
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleSaveAll()
        }
      };

    const handleSaveAll = () => {
        handleChanges(index-1, {text:preText, afterBlank:postText, 
            blank:acceptedArray, 
            explanation:expText})
        setOpen(false)
    }

    const handleDeleteSelf = async() => {
        handleDelete(index-1)
    }

    useEffect(() => {
        setData(element)
    }, [element])

    useEffect(() => {
        setPreText(data?.text ? data.text : "")
        setPostText(data?.afterBlank ? data.afterBlank : "")
        setExpText(data?.explanation ? data.explanation : "")
        setAcceptedArray(data?.blank ? [...data.blank] : [])
    }, [data])

    const printAnswers = () => {
        let output = ""
        const clone = [...acceptedArray]
        clone.forEach((answer, key) => {
            output += answer
            if(key < acceptedArray.length-1){
                output += ", "
            }
        })
        return output
    }

    return(
        <div className="flex flex-col gap-3 rounded-md px-2 py-1 border-2" style={{borderColor:theme.semi_light, backgroundColor:theme.demi_light}}>
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-3 items-center">
                    <span className="font-bold">{index}. Free Response Element </span>
                    <button className="hover:text-gray-300"
                        onClick={() => {setOpen(!open)}}>{open ? <AiFillCloseCircle/> : <AiFillEdit/>}</button>
                </div>
                <div className="flex flex-row gap-3">
                    <div className="flex flex-col items-center justify-center text-sm">
                        <button 
                        disabled={index === 1}
                        className={`${index === 1 ? "text-neutral-500 cursor-not-allowed" : "hover:text-neutral-500"}`} 
                        onClick={() => {
                        handleSwap(index-1, index-2)
                        }}>
                        <IoIosArrowUp/>
                        </button>
                        <button
                        disabled={index === max}
                        className={`${index === max ? "text-neutral-500 cursor-not-allowed" : "hover:text-neutral-500"}`} 
                        onClick={() => {
                        handleSwap(index-1, index)
                        }}>
                        <IoIosArrowDown/>
                        </button>
                    </div>
                    <button onClick={handleDeleteSelf} 
                    className="text-lg mr-1 mt-1 hover:text-red-500 transition-all duration-150">
                        <BsFillTrashFill/>
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {!open ?
                <div className="flex flex-col gap-1">
                    <span><span className="font-semibold underline">Text:</span> {(preText || postText) ? `${preText} __________ ${postText}` : "[No Text]"}</span>
                    <span><span className="font-semibold underline">Accepted Answers:</span> {acceptedArray.length > 0 ? printAnswers() : "[No Answers]"}</span>
                    <span><span className="font-semibold underline">Explanation:</span> {expText ? expText : "[No Explanation]"}</span>
                </div>:
                <>
                    <div className="flex flex-row gap-3">
                    <button className="hover:text-gray-600"
                    onClick={handleSaveAll}><AiFillSave/></button>
                    <button className="hover:text-gray-600"
                    onClick={() => {setOpen(false)}}><AiFillCloseCircle/></button>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold">Before Blank:</span>
                        <textarea
                        value={preText}
                        className="bg-neutral-200 focus:bg-neutral-100 w-[500px] 
                        px-3 rounded-md transition-all duration-150"
                        onChange={(e) => {
                            setPreText(e.target.value)
                        }}
                        onKeyDown={handleKeyPress}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold">After Blank:</span>
                        <textarea
                        value={postText}
                        className="bg-neutral-200 focus:bg-neutral-100 w-[500px] 
                        px-3 rounded-md transition-all duration-150"
                        onChange={(e) => {
                            setPostText(e.target.value)
                        }}
                        onKeyDown={handleKeyPress}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold">Accepted Answers:</span>
                        <div className="flex flex-col gap-2">
                            {acceptedArray.map((answer, key) => 
                            <div className="flex flex-row items-center gap-2">
                                <button
                                onClick={() => {
                                    const clone = [...acceptedArray]
                                    clone.splice(key, 1)
                                    setAcceptedArray(clone)
                                }}>
                                    <span className="hover:brightness-[1.5] text-2xl" style={{color:theme.medium}}>&times;</span>
                                </button>
                                <input
                                value={acceptedArray[key]}
                                className="bg-neutral-200 focus:bg-neutral-100 w-[calc(500px_-_1.25rem)]
                                text-black 
                                px-3 rounded-md transition-all duration-150"
                                onChange={(e) => {
                                    const clone = [...acceptedArray]
                                    clone[key] = e.target.value
                                    setAcceptedArray(clone)
                                }}
                                onKeyDown={handleKeyPress}
                                />
                            </div>)}
                        </div>
                        <button className={`w-[300px] rounded-md px-4 py-1 text-sm ${acceptedArray.length > 0 ? "mt-2" : ""}`}
                        style={{backgroundColor:theme.medium, color:theme.ultra_light}}
                        onClick={() => {
                            setAcceptedArray([...acceptedArray, "Sample Answer"])
                        }}>
                            + Add Answer
                        </button>                   
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold">Explanation:</span>
                        <textarea
                        value={expText}
                        className="bg-neutral-200 focus:bg-neutral-100 w-[500px] 
                        px-3 rounded-md transition-all duration-150"
                        onChange={(e) => {
                            setExpText(e.target.value)
                        }}
                        onKeyDown={handleKeyPress}
                        />
                    </div>
                </>
                }
            </div>
        </div>
    )
}