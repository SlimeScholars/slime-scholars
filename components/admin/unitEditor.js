import React, { useState } from "react";

export default function UnitEditor({ newUnit, setUnit }) {
  const [name, setName] = useState(newUnit.name);
  const [number, setNumber] = useState(newUnit.number);
  return (
    <div className="fixed h-full w-3/5 right-0 top-0 p-10 flex flex-col space-y-7 bg-teal-300/50">
      <label className="text-2xl font-black">Unit Details</label>
      <label className="text-xl font-bold">Unit Name</label>
      <input
        className="w-full h-12 p-2 ring-1 ring-black"
        placeholder={newUnit.name}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label className="text-xl font-bold">Unit Number</label>
      <input
        className="w-full h-12 p-2 ring-1 ring-black"
        placeholder={newUnit.number}
        value={number}
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      />
      <button
        className="w-full h-12 bg-purple-300 hover:bg-purple-200"
        onClick={() => {
          setUnit({
            name: name,
            number: newUnit.number,
            lessons: [...newUnit.lessons],
          });
        }}
      >
        Save
      </button>
      <button
        className="w-full h-12 bg-pink-300 hover:bg-pink-200"
        onClick={() => {
          newUnit.lessons.push({
            name: "New Lesson",
            number: newUnit.lessons.length + 1,
            content: [],
          });
          setUnit(newUnit);
        }}
      >
        Add Lesson
      </button>
    </div>
  );
}
