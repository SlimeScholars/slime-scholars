// import React, { useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { showToastError } from "../../utils/toast";

// export default function UnitQuizEditor({ unitQuiz, setUnitQuiz, setLoading, deleteUnitQuiz }) {
//   const [unitQuizName, setUnitQuizName] = useState(unitQuiz.quizName);

//   const onSave = () => {
//     try {
//       const token = localStorage.getItem("jwt");
//       // Set the authorization header
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       setLoading(true);

//       axios
//         .put(
//           "/api/admin/unit-quiz/update-name",
//           { unitQuizId: unitQuiz._id, unitQuizName },
//           config
//         )
//         .then((response) => {
//         //   if (response.data && response.data.lesson) {
//         //     setLesson(response.data.lesson);
//         //     setLoading(false);
//         //   }
//             console.log(response.data)
//         })
//         .catch((error) => {
//           showToastError(error.message);
//           setLoading(false);
//         });
//     } catch (error) {
//       showToastError(error.message);
//       return;
//     }
//   };

//   return (
//     <div className="fixed h-full w-[50%] right-0 top-0 p-10 flex flex-col space-y-7 bg-teal-300/50">
//       <ToastContainer />
//       <label className="text-2xl font-black">Unit Quiz Details</label>
//       <label className="text-xl font-bold">Unit Quiz Name</label>
//       <input
//         className="w-full h-12 p-2 ring-1 ring-black"
//         placeholder={unitQuiz.quizName}
//         value={unitQuizName}
//         onChange={(e) => {
//           setUnitQuizName(e.target.value);
//         }}
//       />
//       <button
//         className="w-full h-12 bg-purple-300 hover:bg-purple-200"
//         onClick={onSave}
//       >
//         Save
//       </button>
//       {/* TODO: change api link to edit-unit-quiz */}
//       <Link
//         href={"/admin/edit-lesson/" + unitQuiz._id}
//         className="w-full h-12 bg-yellow-300 hover:bg-yellow-200 flex items-center justify-center"
//         target="_blank"
//       >
//         Edit Unit Quiz
//       </Link>
//       <button
//         className="w-full h-12 bg-red-300 hover:bg-red-200"
//         onClick={deleteUnitQuiz}
//       >
//         Delete
//       </button>
//     </div>
//   );
// }
