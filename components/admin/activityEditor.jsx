import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastError } from "../../utils/toast";

export default function ActivityEditor({ activity, setActivity, setLoading, deleteActivity }) {
  const [activityName, setActivityName] = useState(activity.activityName);

  const onSave = () => {
    try {
      const token = localStorage.getItem("jwt");
      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true);

      // TODO: Update the activity name, create api
      axios
        .put(
          "/api/admin/activity/update-name",
          { activityId: activity._id, activityName },
          config
        )
        .then((response) => {
          if (response.data && response.data.activity) {
            setActivity(response.data.activity);
            setLoading(false);
          }
        })
        .catch((error) => {
          showToastError(error.message);
          setLoading(false);
        });
    } catch (error) {
      showToastError(error.message);
      return;
    }
  };


  return (
    <div className="fixed h-full w-3/5 right-0 top-0 p-10 flex flex-col space-y-7 bg-teal-300/50">
      <ToastContainer />
      <label className="text-2xl font-black">Activity Details</label>
      <label className="text-xl font-bold">Activity Name</label>
      <input
        className="w-full h-12 p-2 ring-1 ring-black"
        placeholder={activity.activityName}
        value={activityName}
        onChange={(e) => {
          setActivityName(e.target.value);
        }}
      />
      <button
        className="w-full h-12 bg-purple-300 hover:bg-purple-200"
        onClick={onSave}
      >
        Save
      </button>
      <Link
        href={"/admin/edit-activity/" + activity._id}
        className="w-full h-12 bg-yellow-300 hover:bg-yellow-200 flex items-center justify-center"
        target="_blank"
      >
        Edit Activity
      </Link>
      <button
        className="w-full h-12 bg-red-300 hover:bg-red-200"
        onClick={deleteActivity}
      >
        Delete
      </button>
    </div>
  );
}
