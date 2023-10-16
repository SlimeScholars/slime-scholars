import { useEffect, useState } from "react"
import {AiFillSave, AiFillCloseCircle, AiFillEdit, AiOutlineCopy} from 'react-icons/ai'
import {BsFillTrashFill} from 'react-icons/bs'
import { HiOutlineExternalLink } from "react-icons/hi"
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"
import { showToastError } from "../../../../../utils/toast"
import { ThinSegmented } from "../segmented"

export default function ImageElement({element, index, theme, handleChanges, handleDelete, handleSwap, max}){
    const [data, setData] = useState(element)
    const [open, setOpen] = useState(false)
    const [elementText, setElementText] = useState("")

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleTextChange()
        }
      };

    const handleTextChange = async() => {
        handleChanges(index-1, {image:elementText})
        setOpen(false)
    }

    const handleDeleteSelf = async() => {
        handleDelete(index-1)
    }

    useEffect(() => {
        setData(element)
    }, [element])

    useEffect(() => {
        setElementText(data.image)
    }, [data])

    return(
        <div className="flex flex-col gap-3 rounded-md px-2 py-1 border-2" style={{borderColor:theme.semi_light, backgroundColor:theme.demi_light}}>
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-3 items-center">
                    <span className="font-bold">{index}. Image Element </span>
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
            {data.image && 
                <img src={data.image} className="w-[7.5rem] h-auto rounded-md"/>
            }
            {!open ?
            <span>
            {data.image ? 
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-6">
                    <span>
                        Size: {data.size === 0 ? "Small" : data.size === 1 ? "Medium" : "Large"}
                    </span>
                    <span>
                        Rounded: {data.rounded === 0 ? "None" : data.rounded === 1 ? "Regular" : "Extra"}
                    </span>
                    <span>
                        Border: {data.border ? "On" : "Off"}
                    </span>
                </div>
                <div className="flex flex-row gap-6">
                    <a onClick={() => {
                        window.open(data.image, "_blank")
                    }} className="flex flex-row gap-2 items-center hover:text-neutral-500 transition-all duration-150">
                        Open Link <HiOutlineExternalLink/></a>
                    <a onClick={() => {
                        navigator.clipboard.writeText(data.image)
                        showToastError("Copied to clipboard!", true)
                    }} className="flex flex-row gap-2 items-center hover:text-neutral-500 transition-all duration-150">
                        Copy URL <AiOutlineCopy/></a>
                </div>
            </div> : <span>[No Image]</span>}
            </span> :
            <>
            <div className="flex flex-col gap-1">
                <span className="font-semibold">Image URL:</span>
                <div className="flex flex-row gap-3">
                    <input
                    value={elementText}
                    className="bg-neutral-200 focus:bg-neutral-100 w-[500px] 
                    text-black
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
                <div className="flex flex-row gap-3 items-center mt-2">
                    <span className="font-semibold w-[5rem]">Size:</span>
                    <ThinSegmented theme={theme} options={["Small", "Medium", "Large"]}
                    defaultIndex={data.size} input={open} onChange={(item) => {
                        handleChanges(index-1, {
                            ...data,
                            size: item === "Small" ? 0 : item === "Medium" ? 1 : 2,
                            rounded: data.rounded,
                            border: data.border
                        })
                    }}/>
                </div>
                <div className="flex flex-row gap-3 items-center mt-2">
                    <span className="font-semibold w-[5rem]">Rounded:</span>
                    <ThinSegmented theme={theme} options={["None", "Regular", "Extra"]}
                    defaultIndex={data.rounded} input={open} onChange={(item) => {
                        handleChanges(index-1, {
                            ...data,
                            size: data.size,
                            rounded: item === "None" ? 0 : item === "Regular" ? 1 : 2,
                            border: data.border
                        })
                    }}/>
                </div>
                <div className="flex flex-row gap-3 items-center mt-2">
                    <span className="font-semibold w-[5rem]">Border:</span>
                    <ThinSegmented theme={theme} options={["Off", "On"]}
                    defaultIndex={data.border ? 1 : 0} input={open} onChange={(item) => {
                        handleChanges(index-1, {
                            ...data,
                            size:data.size,
                            rounded:data.rounded,
                            border: item === "Off" ? false : true
                        })
                    }}/>
                </div>
            </div>
            </>
            }
        </div>
    )
}