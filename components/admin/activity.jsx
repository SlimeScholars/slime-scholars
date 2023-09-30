import React, { useState, useRef } from "react";
import ActivityEditor from "./activityEditor";

import useMousePosition from "../../hooks/useMousePosition";
import useClickOutside from "../../hooks/useClickOutside";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function Activity({ activity, setActivity, setLoading, deleteActivity }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);
//   console.log(activity)
  const { x, y } = useMousePosition();
  const { width, height } = useWindowDimensions();

  const clickRef = useRef();
  useClickOutside(clickRef, () => {
    if (x < width * 0.5) {
      setIsOpen(false);
      setSelected(false);
    }
  });



  return (
    <>
      <div className="w-full flex flex-col justify-start items-start overflow-hidden">
        <button
          className={
            `w-full h-12 flex items-center justify-between px-4 py-1 rounded-lg transition-all duration-150 mb-2
             text-black ${selected ? "bg-sky-700 hover:bg-sky-900" : "bg-slate-400 hover:bg-slate-400"}`
          }
          onClick={() => {
            if (!selected && !isOpen) {
              setIsOpen(true);
              setSelected(true);
            //   console.log(activity + " selected")
            }
          }}
          ref={clickRef}
        >
          {
            activity.activityName ? (
              <p className={`${!selected ? "text-white" : "text-sky-300"} font-bold`}>
                {activity.activityNumber}. {activity.activityName}
              </p>
            ) : (
              <p className="text-white">
                {activity.activityNumber}. New Activity
              </p>
            )
          }
        </button>
      </div>
      {selected && <ActivityEditor activity={activity} setActivity={setActivity} setLoading={setLoading} deleteActivity={deleteActivity} />}
    </>
  );
}

