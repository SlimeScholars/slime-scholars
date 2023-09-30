import React, { useState } from "react";

export default function Activity({ activity, setSidePanelProperties, selected, setSelected }) {

  return (
    <>
      <div className="w-full flex flex-col justify-start items-start overflow-hidden">
        <button
          className={
            `w-full h-12 flex items-center justify-between pl-4 py-1 rounded-lg transition-all duration-150 mb-2
             text-black ${(selected === activity._id) ? "bg-sky-700 hover:bg-sky-700" : "bg-slate-400 hover:bg-slate-400"}`
          }
          onClick={() => {
            setSidePanelProperties({type:"activity", details:activity})
            setSelected(activity._id)
          }}
        >
          {
            activity.activityName ? (
              <p className={`${!(selected === activity._id) ? "text-white" : "text-sky-300"} font-bold`}>
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
    </>
  );
}

