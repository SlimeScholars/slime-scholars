import React from "react";

export default function UnitEditor({ newUnit, setUnit }) {
  return (
    <div
      className="fixed h-full w-3/5 right-0 top-0 p-10 flex flex-col space-y-7 bg-green-200"
      onSubmit={() => {
        setUnit(newUnit);
      }}
    >
      <label className="text-2xl font-black">Unit Details</label>
      <label className="text-xl font-bold">Unit Name</label>
      <input
        className="w-full h-12 p-2 ring-1 ring-black"
        placeholder={newUnit.name}
        onChange={(e) => {
          newUnit.name = e.target.value;
        }}
      />
      <label className="text-xl font-bold">Unit Number</label>
      <input
        className="w-full h-12 p-2 ring-1 ring-black"
        placeholder={newUnit.number}
        onChange={(e) => {
          newUnit.number = e.target.value;
        }}
      />
      <button
        className="w-full h-12 bg-purple-300 hover:bg-purple-200"
        onClick={() => {
          setUnit(newUnit);
        }}
      >
        Save
      </button>
    </div>
  );
}
