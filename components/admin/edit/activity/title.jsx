import { activityService } from "../../../../services";
import { AiFillEdit, AiFillSave, AiFillCloseCircle } from "react-icons/ai";
import { BiPalette } from "react-icons/bi";
import { useState, useEffect } from "react";

export default function EditActivityTitle({activity, refresh, setLoading, colors, setTheme, theme}){
    const [open, setOpen] = useState(false)
    const [activityName, setActivityName] = useState("")

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleNameChange()
        }
      };

    useEffect(() => {
        setActivityName(activity.activityName)
    }, [activity])

    const handleNameChange = async() => {
        setLoading(true)
        try{
            await activityService.save({activityId: activity._id, activityName:activityName})
            refresh()
            setOpen(false)
            setTimeout(() => {setLoading(false)}, 100)
        }
        catch(err){
            console.log(err)
            setTimeout(() => {setLoading(false)}, 100)
        }
    }

    return(
        <nav className="flex flex-col text-white w-full bg-black justify-center h-[6rem] z-[500]">
            <span className={`text-sm pl-[2.75rem]`}>Activity Editor</span>
            <div className="flex flex-row justify-between">
                <div className={`flex flex-row gap-6 ${open ? "pl-[2rem]" : "pl-[2.75rem]"} text-2xl`}>
                    {!open? 
                    <>
                        <span>
                            {activityName}
                        </span> 
                        <button className="hover:text-gray-300"
                        onClick={() => {setOpen(true)}}><AiFillEdit/></button>
                    </>
                    :
                    <>
                        <input
                        value={activityName}
                        className="bg-neutral-800 focus:bg-neutral-600 ring-1 ring-black w-[350px] 
                        px-3 rounded-md transition-all duration-150 text-neutral-400 focus:text-neutral-100"
                        onChange={(e) => {
                            setActivityName(e.target.value)
                        }}
                        onKeyDown={handleKeyPress}
                        />
                        <button className="hover:text-gray-300"
                        onClick={handleNameChange}><AiFillSave/></button>
                        <button className="hover:text-gray-300"
                        onClick={() => {setOpen(false)}}><AiFillCloseCircle/></button>
                    </>}
                </div>
                <div className="flex flex-row gap-2 items-center pr-8 text-4xl">
                    <BiPalette className=""/>
                    <span className="text-xl mr-4">Change Palette</span>
                    <div className="flex flex-row gap-3">
                    {Object.keys(colors).map((color) => {
                        return (
                        <button 
                            key={color}
                            className={`${theme.ultra_light === colors[color].ultra_light ? 
                            "border-[3px] border-white brightness-[1] hover:brightness-[1.25]" : 
                            "border-[2px] border-neutral-400 brightness-[0.8] hover:brightness-[1]"} 
                        w-7 h-7 rounded-full`}
                        onClick={() => {
                            setTheme(colors[color])
                        }}
                        style={{backgroundColor: colors[color].medium}}/>
                    )})}
                    </div>
                </div>
            </div>
        </nav>
    )
}