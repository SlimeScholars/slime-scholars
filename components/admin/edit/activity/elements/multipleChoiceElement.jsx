import { useEffect, useState } from "react"
import {AiFillSave, AiFillCloseCircle, AiFillEdit} from 'react-icons/ai'
import {BsFillTrashFill} from 'react-icons/bs'

export default function MultipleChoiceElement({element, index, theme}){
    const [data, setData] = useState(element)

    const handleDeleteSelf = async() => {
        handleDelete(index-1)
    }

    useEffect(() => {
        setData(element)
    }, [element])

    return(
        <div className="flex flex-col gap-3 rounded-md px-2 py-1 border-2" style={{borderColor:theme.semi_light, backgroundColor:theme.demi_light}}>
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-3 items-center">
                    <span className="font-bold">{index}. Multiple Choice Element </span>
                </div>
                <button onClick={handleDeleteSelf} 
                className="text-lg mr-1 mt-1 hover:text-red-500 transition-all duration-150">
                    <BsFillTrashFill/>
                </button>
            </div>
            {data.text ? data.text : "[No Text]"}
        </div>
    )
}