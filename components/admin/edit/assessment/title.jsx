import { assessmentService } from "../../../../services";
import { AiFillEdit, AiFillSave, AiFillCloseCircle } from "react-icons/ai";
import { BiPalette } from "react-icons/bi";
import { useState, useEffect } from "react";

export default function EditAssessmentTitle({ assessment, refresh, setLoading, colors, setTheme, theme }) {
    const [open, setOpen] = useState(false)
    const [assessmentName, setAssessmentName] = useState("")

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleNameChange()
        }
    };

    useEffect(() => {
        setAssessmentName(assessment.lessonName)
    }, [assessment])

    const handleNameChange = async () => {
        setLoading(true)
        try {
            await assessmentService.save({ lessonId: assessment._id, lessonName: assessmentName })
            refresh()
            setOpen(false)
            setTimeout(() => { setLoading(false) }, 150)
        }
        catch (err) {
            console.log(err)
            setTimeout(() => { setLoading(false) }, 150)
        }
    }

    return (
        <nav className="flex flex-col text-white w-full bg-black justify-center h-[6rem] z-[500]">
            <span className={`text-sm pl-[2.75rem]`}>Assessment Editor: {assessment.lessonType === "quiz"
                ? "Quiz" : assessment.lessonType === "test" ? "Test" : "[Missing Type]"}</span>
            <div className="flex flex-row justify-between">
                <div className={`flex flex-row gap-6 ${open ? "pl-[2rem]" : "pl-[2.75rem]"} text-2xl`}>
                    {!open ?
                        <>
                            <span>
                                {assessmentName}
                            </span>
                            <button className="hover:text-gray-300"
                                onClick={() => { setOpen(true) }}><AiFillEdit /></button>
                        </>
                        :
                        <>
                            <input
                                value={assessmentName}
                                className="bg-neutral-800 focus:bg-neutral-600 ring-1 ring-black w-[350px] 
                        px-3 rounded-md transition-all duration-150 text-neutral-400 focus:text-neutral-100"
                                onChange={(e) => {
                                    setAssessmentName(e.target.value)
                                }}
                                onKeyDown={handleKeyPress}
                            />
                            <button className="hover:text-gray-300"
                                onClick={handleNameChange}><AiFillSave /></button>
                            <button className="hover:text-gray-300"
                                onClick={() => { setOpen(false) }}><AiFillCloseCircle /></button>
                        </>}
                </div>
                <div className="flex flex-row gap-2 items-center pr-8 text-4xl">
                    <BiPalette className="" />
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
                                    style={{ backgroundColor: colors[color].medium }} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </nav>
    )
}