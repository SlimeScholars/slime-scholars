// import React, { useState, useRef } from "react";
// import CourseQuizEditor from "./courseQuizEditor";
// import { BiSolidDownArrow } from "react-icons/bi";

// export default function CourseQuiz({ courseQuiz, setCourseQuiz, setLoading, setSidePanelProperties, selected, setSelected}) {
//   const [isOpen, setIsOpen] = useState(false);

// //   change to deleteCourseQuiz
// //   const deleteLesson = (index) => {
// //     try {
// //       if (!unit?.lessons[index]?._id) {
// //         throw new Error('Lesson not found')
// //       }

// //       const newLessons = [...unit.lessons]
// //       const tempLesson = newLessons.splice(index, 1)[0]

// //       setUnit({ ...unit, lessons: newLessons })

// //       const token = localStorage.getItem('jwt')

// //       // Set the authorization header
// //       const config = {
// //         params: {
// //           lessonId: tempLesson._id,
// //         },
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       };

// //       axios
// //         .delete("/api/admin/lesson/delete", config)
// //         .catch((error) => {
// //           if (error?.response?.data?.message) {
// //             showToastError(error.response.data.message)
// //           }
// //           else {
// //             showToastError(error.message)
// //           }
// //           newLessons.splice(index, 0, tempLesson)
// //           setUnit({ ...unit, lessons: newLessons })
// //         });

// //     } catch (error) {
// //       showToastError(error.message);
// //     }
// //   }

//   return (
//     <>
//       <div className="w-full flex flex-col justify-start items-start overflow-hidden">
//         <button
//           className={
//             `w-full h-12 flex items-center justify-between pl-4 py-1 rounded-lg transition-all duration-150 mb-2
//              text-black ${(selected === courseQuiz._id) ? "bg-sky-700 hover:bg-sky-700" : "bg-slate-400 hover:bg-slate-400"}`
//           }
//           onClick={() => {
//             setSelected(courseQuiz._id);
//             ;
//           }}
//         >
//           {
//             courseQuiz.lessonName ? (
//               <p className={`${!(selected === courseQuiz._id) ? "text-white" : "text-sky-300"} font-bold`}>
//                 {courseQuiz.lessonNumber}. {courseQuiz.lessonName}
//               </p>
//             ) : (
//               <p className="text-white">
//                 {courseQuiz.lessonNumber}. New Course Quiz
//               </p>
//             )
//           }
//           <button className={`text-xl z-[300] p-1 pl-20 pr-4 ${!(selected === courseQuiz._id) ? "text-white" : "text-sky-300"}`}
//           onClick={(e) => {
//             setIsOpen(!isOpen)
//           }}>
//             <BiSolidDownArrow className={`${!isOpen ? "rotate-90" : "rotate-0"} 
//             transition-all duration-150`}/>
//           </button>
//         </button>
//       </div>
//     </>
//   );
// }
