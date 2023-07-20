import React, { useState } from "react";
import axios from "axios";

export default function UnitEditor({ unit, setUnit, setLoading }) {
  const [unitName, setUnitName] = useState(unit.unitName);

  const onSave = () => {
    try {
      const token = localStorage.getItem('jwt')

      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true)

      axios
        .put("/api/admin/update-unit", {unitId: unit._id, unitName}, config)
        .then((response) => {
          if (response.data && response.data.unit) {
            setUnit(response.data.unit);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error.message)
          // showToastMessage(error.message)
          setLoading(false);
        });
      
    } catch (error) {
      // TODO: figure out why toast message is not showing
      console.error(error)
      // showToastMessage(error.message);
      return;
    }
  }

  const onAddLesson = () => {
    try {
      const token = localStorage.getItem('jwt')

      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true)

      const lessonNumber = unit.lessons.length + 1

      axios
        .post("/api/admin/create-lesson", {unitId: unit._id, lessonNumber}, config)
        .then((response) => {
          if (response.data && response.data.unit) {
            const newUnit = response.data.unit
            setUnit(newUnit);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error.message)
          // showToastMessage(error.message)
          setLoading(false);
        });
      
    } catch (error) {
      // TODO: figure out why toast message is not showing
      console.error(error)
      showToastMessage(error.message);
      return;
    }
  }




  return (
    <div className="fixed h-full w-3/5 right-0 top-0 p-10 flex flex-col space-y-7 bg-teal-300/50">
      <label className="text-2xl font-black">Unit Details</label>
      <label className="text-xl font-bold">Unit Name</label>
      <input
        className="w-full h-12 p-2 ring-1 ring-black"
        placeholder={unit.unitName}
        value={unitName}
        onChange={(e) => {
          setUnitName(e.target.value);
        }}
      />
      <button
        className="w-full h-12 bg-purple-300 hover:bg-purple-200"
        onClick={onSave}
      >
        Save
      </button>
      <button
        className="w-full h-12 bg-pink-300 hover:bg-pink-200"
        onClick={onAddLesson}
      >
        Add Lesson
      </button>
    </div>
  );
}
