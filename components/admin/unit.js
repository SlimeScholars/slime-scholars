import React, { useState } from "react";
import UnitEditor from "./unitEditor";

export default function Unit({ unit, setUnit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  let newUnit = { ...unit };

  return (
    <>
      {selected && (
        <button
          className="w-screen h-screen bg-transparent fixed top-0 left-0"
          onClick={() => {
            setSelected(false);
            setIsOpen(false);
          }}
        />
      )}
      <div
        className={
          "w-full flex flex-col " + (isOpen ? "max-h-max" : "max-h-12")
        }
      >
        <button
          className={
            "w-full h-12 flex items-center justify-between px-4 py-1 hover:bg-gray-400 " +
            (selected ? "bg-gray-400" : "bg-gray-500")
          }
          onClick={() => {
            if (!selected && !isOpen) {
              setIsOpen(true);
              setSelected(true);
            }
          }}
        >
          <p className="text-white">{newUnit.name}</p>
        </button>
      </div>
      {selected && <UnitEditor newUnit={newUnit} setUnit={setUnit} />}
    </>
  );
}
