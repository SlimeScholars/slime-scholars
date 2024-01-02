import { useEffect, useState } from "react"
import {AiFillSave, AiFillCloseCircle, AiFillEdit} from 'react-icons/ai'
import {BsFillTrashFill} from 'react-icons/bs'
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"

export default function TextElement({element, index, theme, handleChanges, handleDelete, handleSwap, max}){
    const [data, setData] = useState(element)
    const [open, setOpen] = useState(false)
    const [elementText, setElementText] = useState("")

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleTextChange()
        }
      };

    const handleTextChange = async() => {
        handleChanges(index-1, {text:elementText})
        setOpen(false)
    }

    const handleDeleteSelf = async() => {
        handleDelete(index-1)
    }

    useEffect(() => {
        setData(element)
    }, [element])

    useEffect(() => {
        setElementText(data.text)
    }, [data])

    return(
        <div className="flex flex-col gap-3 rounded-md px-2 py-1 border-2" style={{borderColor:theme.semi_light, backgroundColor:theme.demi_light}}>
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-3 items-center">
                    <span className="font-bold">{index}. Text Element </span>
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
            <span>
            {elementText ? elementText : "[No Text]"}
            </span> :
            <>
            <div className="flex flex-col gap-1">
                <span className="font-semibold">Insert Text</span>
                <div className="flex flex-row gap-3">
                    <textarea
                    value={elementText}
                    className="bg-neutral-200 focus:bg-neutral-100 w-[500px] 
                    px-3 rounded-md transition-all duration-150"
                    onChange={(e) => {
                        setElementText(e.target.value)
                    }}
                    onKeyDown={handleKeyPress}
                    />
                    <button className="hover:text-gray-600"
                    onClick={handleTextChange}><AiFillSave/></button>
                    <button className="hover:text-gray-600"
                    onClick={() => {setOpen(false)}}><AiFillCloseCircle/></button>
                </div>
            </div>
            </>
            }
        </div>
    )
}