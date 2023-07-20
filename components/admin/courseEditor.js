import React, { useState } from "react";

export default function CourseEditor({ newCourse, setCourse }) {
  const [courseName, setCourseName] = useState(newCourse.courseName);


  const onSave = () => {

    /*
    axios
      .post("/api/user/create", {
        // userType 2 represents parent
        userType: 2,
        honorific,
        firstName,
        lastName,
        email,
        password,
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("jwt", response.data.token);
          setUser(response.data.user)
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          showToastMessage(error.response.data.message);
        }
      });
      */
  };


  return (
    <div className="fixed h-full w-3/5 right-0 top-0 p-10 flex flex-col space-y-7 bg-teal-300/50">
      <label className="text-2xl font-black">Course Details</label>
      <label className="text-xl font-bold">Course Name</label>
      <input
        className="w-full h-12 p-2 ring-1 ring-black"
        placeholder={newCourse.courseName}
        value={courseName}
        onChange={(e) => {
          setCourseName(e.target.value);
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
        onClick={() => {
          newCourse.units.push({
            name: "New Unit",
            number: newCourse.units.length + 1,
            lessons: [],
          });
          setCourse(newCourse);
        }}
      >
        Add Unit
      </button>
    </div>
  );
}
