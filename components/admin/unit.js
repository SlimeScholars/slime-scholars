import React, { useState, useRef } from "react";
import UnitEditor from "./unitEditor";
import Link from "next/link";
import useMousePosition from "../../hooks/useMousePosition";
import useClickOutside from "../../hooks/useClickOutside";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function Unit({ unit, setUnit, setLoading }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  const { x, y } = useMousePosition();
  const { width, height } = useWindowDimensions();

  const selectRef = useRef();
  useClickOutside(selectRef, () => {
    if (x < width * 0.4) {
      setSelected(false);
    }
  });

  console.log(unit);

  return (
    <>
      <div
        className={
          "w-full flex flex-col justify-start items-start overflow-hidden " +
          (isOpen ? "" : "h-12")
        }
      >
        <button
          className={
            "w-full h-12 flex items-center justify-between px-4 py-1 hover:bg-red-400/50 " +
            (selected ? "bg-red-400/50" : "bg-red-600/50")
          }
          onClick={() => {
            setSelected(true);
            setIsOpen(!isOpen);
          }}
          ref={selectRef}
        >
          {unit.unitName ? (
            <p className="text-white">
              {unit.unitNumber}. {unit.unitName}
            </p>
          ) : (
            <p className="text-gray">{unit.unitNumber}. New Unit</p>
          )}
        </button>
        {isOpen && (
          <div className="w-full flex flex-col pl-10 items-start justify-start">
            {unit.lessons.map((lesson, index) => (
              <Link
                href={`/admin/edit-lesson/${lesson._id}`}
                key={index}
                className="w-full h-12 flex items-center justify-start px-4 py-1 bg-red-600/50 hover:bg-red-400/50"
              >
                <p className="text-white">{lesson.lessonNumber}.</p>
                <p className="text-white ml-2">{lesson.lessonName}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
      {selected && (
        <UnitEditor unit={unit} setUnit={setUnit} setLoading={setLoading} />
      )}
    </>
  );
}
