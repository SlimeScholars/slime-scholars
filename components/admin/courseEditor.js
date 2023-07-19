import React, { useState } from "react";

export default function CourseEditor({ newCourse, setCourse }) {
  const [name, setName] = useState(newCourse.name);
  const [code, setCode] = useState(newCourse.code);
  const [author, setAuthor] = useState(newCourse.author);
  return (
    <div className="fixed h-full w-3/5 right-0 top-0 p-10 flex flex-col space-y-7 bg-green-200">
      <label className="text-2xl font-black">Course Details</label>
      <label className="text-xl font-bold">Course Name</label>
      <input
        className="w-full h-12 p-2 ring-1 ring-black"
        placeholder={newCourse.name}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label className="text-xl font-bold">Course Code</label>
      <input
        className="w-full h-12 p-2 ring-1 ring-black"
        placeholder={newCourse.code}
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      />
      <label className="text-xl font-bold">Course Author</label>
      <input
        className="w-full h-12 p-2 ring-1 ring-black"
        placeholder={newCourse.author}
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
      />
      <button
        className="w-full h-12 bg-purple-300 hover:bg-purple-200"
        onClick={() => {
          setCourse({
            name: name,
            code: code,
            author: author,
            units: [...newCourse.units],
          });
        }}
      >
        Save
      </button>
      <button
        className="w-full h-12 bg-pink-300 hover:bg-pink-200"
        onClick={() => {
          newCourse.units.push({
            name: "New Unit",
            number: newCourse.units.length + 1,
            id: newCourse.units.length,
          });
          setCourse(newCourse);
        }}
      >
        Add Unit
      </button>
    </div>
  );
}
