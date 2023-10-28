import { useEffect, useState } from "react"
import {AiFillSave, AiFillCloseCircle, AiFillEdit, AiFillCheckCircle} from 'react-icons/ai'
import {BsFillTrashFill} from 'react-icons/bs'
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"
import { IconSegmented } from "../../segmented"

export default function MultipleChoiceElement({element, index, theme, handleChanges, handleDelete, handleSwap, max}){
    const [data, setData] = useState(element)
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState([])
    const [questionText, setQuestionText] = useState("")
    const [expText, setExpText] = useState("")

    const handleDeleteSelf = async() => {
        handleDelete(index-1)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleOptionsChange()
        }
      };

    const handleOptionsChange = async() => {
        handleChanges(index-1, {options:options, text:questionText, explanation:expText})
        setOpen(false)
    }

    useEffect(() => {
        setData(element)
    }, [element])

    useEffect(() => {
        setOptions(data.options ? [...data.options.map((opt) => {return{option:opt.option, correct:opt.correct}})] : [])
        setQuestionText(data.text)
        setExpText(data.explanation)
    }, [data])

    return(
        <div className="flex flex-col gap-3 rounded-md px-2 py-1 border-2" style={{borderColor:theme.semi_light, backgroundColor:theme.demi_light}}>
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-3 items-center">
                    <span className="font-bold">{index}. Multiple Choice Element </span>
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
            {!open ?
            <div className="flex flex-col gap-2 text-md">
            <span><span className="font-semibold underline">Text:</span> {questionText ? questionText : "[No Text]"}</span>
            {options.length > 0 ? options.map((item) => {
            return <div className="flex flex-row justify-between items-center w-[500px] py-1 px-3 rounded-md text-sm" 
            style={{backgroundColor:theme.medium, color:theme.ultra_light}}>
            <span 
            style={{
                fontWeight: item.correct ? 750 : 500,
                color: item.correct ? theme.ultra_light : theme.light
            }}>{item.option}</span>
            <span className="text-lg">
                {item.correct ? <span style={{
                                    color:theme.ultra_light
                                }}><AiFillCheckCircle/></span> :
                                <span style={{
                                    color: theme.light
                                }}><AiFillCloseCircle/></span>}
            </span>
            </div>}) : <span className="text-md">[No Options]</span>}
            <span><span className="font-semibold underline">Explanation:</span> {expText ? expText : "[No Explanation]"}</span>
            </div> :
            <>
            <div className="flex flex-row gap-3">
                <button className="hover:text-gray-600"
                onClick={handleOptionsChange}><AiFillSave/></button>
                <button className="hover:text-gray-600"
                onClick={() => {setOpen(false)}}><AiFillCloseCircle/></button>
            </div>
                <div className="flex flex-col gap-1">
                    <span className="font-semibold">Text:</span>
                    <textarea
                    value={questionText}
                    className="bg-neutral-200 focus:bg-neutral-100 w-[500px] 
                    px-3 rounded-md transition-all duration-150"
                    onChange={(e) => {
                        setQuestionText(e.target.value)
                    }}
                    onKeyDown={handleKeyPress}
                    />
                    <span className="font-semibold">Options:</span>
                    <div className="flex flex-col gap-2">
                        {options.map((opt, key) => 
                        <div className="flex flex-row items-center gap-2">
                            <button
                            onClick={() => {
                                const clone = [...options]
                                clone.splice(key, 1)
                                setOptions(clone)
                            }}>
                                <span className="hover:brightness-[1.5] text-2xl" style={{color:theme.medium}}>&times;</span>
                            </button>
                            <input
                            value={opt.option}
                            className="bg-neutral-200 focus:bg-neutral-100 w-[calc(500px_-_1.25rem)]
                            text-black 
                            px-3 rounded-md transition-all duration-150"
                            onChange={(e) => {
                                const clone = [...options]
                                clone[key].option = e.target.value
                                setOptions(clone)
                            }}
                            onKeyDown={handleKeyPress}
                            />
                            <IconSegmented theme={theme} 
                            input={open}
                            options={[{icon:<AiFillCloseCircle/>, key: false}, 
                            {icon:<AiFillCheckCircle/>, key: true}]}
                            onChange={(truth) => {
                                const clone = [...options]
                                clone[key].correct = truth
                                setOptions(clone)
                            }}
                            defaultIndex={opt.correct ? 1 : 0}/>
                        </div>)}
                    </div>
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
                    <button className={`w-[300px] rounded-md px-4 py-1 text-sm ${options.length > 0 ? "mt-2" : ""}`}
                    style={{backgroundColor:theme.medium, color:theme.ultra_light}}
                    onClick={() => {
                        setOptions([...options, {option: "Sample Response", correct: false}])
                    }}>
                        + Add Option
                    </button>                   
                </div>
            </>
            }
        </div>
    )
}