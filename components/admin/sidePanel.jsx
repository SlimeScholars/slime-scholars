import { useEffect, useState } from "react";
import { activityService, lessonService, unitService, courseService, subjectService } from "../../services";
import { ToastContainer } from "react-toastify";
import {HiOutlineExternalLink} from 'react-icons/hi'
import Link from "next/link";

export default function SidePanel({type, details, setSidePanelProperties, setLoading, refreshPanel}){
    const [data, setData] = useState(details)
    const [activityName, setActivityName] = useState(data ? data?.activityName : undefined)
    const [lessonName, setLessonName] = useState(data ? data?.lessonName : undefined)
    const [unitName, setUnitName] = useState(data ? data?.unitName : undefined)
    const [courseName, setCourseName] = useState(data ? data?.courseName : undefined)
    const [subjectName, setSubjectName] = useState(data ? data?.subjectName : undefined)

    const panel_tw = "fixed h-full w-[50%] right-0 top-0 p-10 flex flex-col gap-6 bg-sky-200 font-semibold"

    const carry = (method) => {
        return (async(...params) => {
            setLoading(true)
            await method.apply(this, [...params])
            setLoading(false)
            await refreshPanel()
        })
    }

    useEffect(() => {
        setData(details)
    }, [type, details])

    useEffect(() => {
        setActivityName(data ? data?.activityName : undefined)
        setLessonName(data ? data?.lessonName : undefined)
        setUnitName(data ? data?.unitName : undefined)
        setCourseName(data ? data?.courseName : undefined)
        setSubjectName(data ? data?.subjectName : undefined)
    }, [data])

    if(!data){return(<></>)}

    if(type === "activity"){
        return(
            <div className={panel_tw}>
                <ToastContainer />
                <label className="text-2xl font-black underline underline-offset-4">Activity Details</label>
                <label className="mb-[-1rem] text-xl font-bold">Activity Name</label>
                <input
                    id="activity"
                    className="w-full h-12 transition-all duration-150  rounded-lg p-2 ring-1 ring-black"
                    placeholder={data.activityName}
                    value={activityName}
                    onChange={(e) => {
                        setActivityName(e.target.value);}}/>
                <button
                    className="w-full h-12 transition-all duration-150  rounded-lg bg-blue-300 hover:bg-blue-200"
                    onClick={async() => {
                        await carry(activityService.save)({ activityId: data._id, activityName: activityName })}}>
                    Save
                </button>
                <Link href={"/admin/edit-activity/" + data._id}
                    className="w-full h-12 transition-all duration-150  rounded-lg bg-fuchsia-300 hover:bg-fuchsia-200 flex items-center justify-center"
                    target="_blank">
                    <div className="flex flex-row gap-1 items-center">
                    Edit Activity
                    <HiOutlineExternalLink/>
                    </div>
                </Link>
                <button className="w-full h-12 transition-all duration-150  rounded-lg bg-neutral-300 hover:bg-neutral-200 font-black" 
                onClick={async() => {await carry(activityService.delete)(data._id)}}>
                    Delete
                </button>
            </div>
        )
    }

    else if(type === "lesson"){
        return(
            <div className={panel_tw}>
                <ToastContainer />
                <label className="text-2xl font-black underline underline-offset-4">Lesson Details</label>
                <label className="mb-[-1rem] text-xl font-bold">{data?.lessonType && data.lessonType.charAt(0).toUpperCase() +
                    data?.lessonType.slice(1)}{" "}Name</label>
                <input
                    className="w-full h-12 transition-all duration-150  rounded-lg p-2 ring-1 ring-black"
                    placeholder={data.lessonName}
                    value={lessonName}
                    onChange={(e) => {
                    setLessonName(e.target.value);
                    }}
                />
                <button
                    className="w-full h-12 transition-all duration-150  rounded-lg bg-blue-300 hover:bg-blue-200"
                    onClick={async() => {
                        await carry(lessonService.save)({ lessonId: data._id, lessonName: lessonName })
                    }}>
                    Save
                </button>
                {data.lessonType === "lesson"?
                <button
                    className="w-full h-12 transition-all duration-150  rounded-lg bg-emerald-300 hover:bg-emerald-200"
                    onClick={async() => {
                        const activityNumber = data.activities.length + 1
                        await carry(activityService.post)({ lessonId: data._id, activityNumber })
                    }}>
                    + Add Activity
                </button>
                :
                <Link href={"/admin/edit-assessment/" + data._id}
                    className="w-full h-12 transition-all duration-150  rounded-lg bg-fuchsia-300 hover:bg-fuchsia-200 flex items-center justify-center"
                    target="_blank">
                    <div className="flex flex-row gap-1 items-center">
                    Edit Assessment
                    <HiOutlineExternalLink/>
                    </div>
                </Link>
                }
                <button
                    className="w-full h-12 transition-all duration-150  rounded-lg bg-neutral-300 hover:bg-neutral-200 font-black"
                    onClick={async() => {await carry(lessonService.delete)(data._id)}}>
                    Delete
                </button>
            </div>
        )
    }

    else if(type === "unit"){
        return(
            <div className={panel_tw}>
            <ToastContainer />
            <label className="text-2xl font-black underline underline-offset-4">Unit Details</label>
            <label className="mb-[-1rem] text-xl font-bold">Unit Name</label>
            <input
                className="w-full h-12 transition-all duration-150  rounded-lg p-2 ring-1 ring-black"
                placeholder={data.unitName}
                value={unitName}
                onChange={(e) => {
                setUnitName(e.target.value);
                }}/>
            <button
                className="w-full h-12 transition-all duration-150  rounded-lg bg-blue-300 hover:bg-blue-200"
                onClick={async() => {
                    await carry(unitService.save)({ unitId: data._id, unitName: unitName })
                }}>
                Save
            </button>
            <button
                className="w-full h-12 transition-all duration-150  rounded-lg bg-emerald-300 hover:bg-emerald-200"
                onClick={async() => {
                    const lessonNumber = data.lessons.length + 1
                    await carry(lessonService.post)({ unitId: data._id, lessonType: "lesson", lessonNumber })
                }}>
                + Add Lesson
            </button>
            <button
                className="w-full h-12 transition-all duration-150  rounded-lg bg-teal-300 hover:bg-teal-200"
                onClick={async() => {
                    const lessonNumber = data.lessons.length + 1
                    await carry(lessonService.post)({ unitId: data._id, lessonType: "quiz", lessonNumber })
                }}>
                + Add Unit Quiz
            </button>
            <button
                className="w-full h-12 transition-all duration-150  rounded-lg bg-cyan-300 hover:bg-cyan-200"
                onClick={async() => {
                    const lessonNumber = data.lessons.length + 1
                    await carry(lessonService.post)({ unitId: data._id, lessonType: "test", lessonNumber })
                }}>
                + Add Unit Test
            </button>
            <button
                className="w-full h-12 transition-all duration-150  rounded-lg bg-neutral-300 hover:bg-neutral-200 font-black"
                onClick={async() => {await carry(unitService.delete)(data._id)}}>
                Delete
            </button>
        </div>
   )}

   else if(type === "course"){
    return (
        <div className={panel_tw}>
          <ToastContainer />
          <label className="text-2xl font-black underline underline-offset-4">Course Details</label>
          <label className="mb-[-1rem] text-xl font-bold">Course Name</label>
          <input
            className="w-full h-12 transition-all duration-150  rounded-lg p-2 ring-1 ring-black"
            placeholder={data.courseName}
            value={courseName}
            onChange={(e) => {
              setCourseName(e.target.value);
            }}
          />
          <button
            className="w-full h-12 transition-all duration-150  rounded-lg bg-blue-300 hover:bg-blue-200"
            onClick={async() => {
                await carry(courseService.save)({ courseId: data._id, courseName: courseName })
            }}>
            Save
          </button>
          <button
            className="w-full h-12 transition-all duration-150  rounded-lg bg-emerald-300 hover:bg-emerald-200"
            onClick={async() => {
                const unitNumber = data.units.length + 1
                await carry(unitService.post)({ courseId: data._id, unitNumber })
            }}>
            + Add Unit
          </button>
          <button
            className="w-full h-12 transition-all duration-150  rounded-lg bg-neutral-300 hover:bg-neutral-200 font-black"
            onClick={async() => {await carry(courseService.delete)(data._id)}}>
            Delete
          </button>
        </div>
      )
   }

   else if (type === "subject"){
    return (
        <div className={panel_tw}>
          <ToastContainer />
          <label className="text-2xl font-black underline underline-offset-4">Subject Details</label>
          <label className="mb-[-1rem] text-xl font-bold">Subject Name</label>
          <input
            className="w-full h-12 transition-all duration-150  rounded-lg p-2 ring-1 ring-black"
            placeholder={data.subjectName}
            value={subjectName}
            onChange={(e) => {
              setSubjectName(e.target.value);
            }}
          />
          <button
            className="w-full h-12 transition-all duration-150  rounded-lg bg-blue-300 hover:bg-blue-200"
            onClick={async() => {
                await carry(subjectService.save)({ subjectId: data._id, subjectName: subjectName })
            }}>
            Save
          </button>
          <button
            className="w-full h-12 transition-all duration-150  rounded-lg bg-emerald-300 hover:bg-emerald-200"
            onClick={async() => {
                const courseNumber = data.courses.length + 1
                await carry(courseService.post)({ subjectId: data._id, courseNumber })
            }}>
            + Add Course
          </button>
          <button
            className="w-full h-12 transition-all duration-150  rounded-lg bg-neutral-300 hover:bg-neutral-200 font-black"
            onClick={async() => {await carry(subjectService.delete)(data._id)}}>
            Delete
          </button>
        </div>
      )
   }
}