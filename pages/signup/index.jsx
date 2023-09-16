import React from "react";
import Back from "../../components/signup/back";
import { FaGraduationCap, FaAppleAlt } from "react-icons/fa";
import { RiParentFill } from "react-icons/ri";

import { useRouter } from "next/router";
import { useEffect } from "react";

const content = [
  {
    type: "Student",
    list: [
      "Increase your productivity.",
      "Be excited to learn.",
      "Collect adorable pets.",
    ],
    link: "/signup/student",
    icon: (
      <FaGraduationCap className="text-slate-300/30 absolute w-full h-full p-14 z-10 top-0 bottom-0 left-0 right-0" />
    ),
  },
  {
    type: "Parent",
    list: [
      "Empower your child's learning.",
      "Improve your child's grades.",
      "Watch as your child grows.",
    ],
    link: "/signup/parent",
    icon: (
      <RiParentFill className="text-slate-300/30 absolute w-full h-full p-14 z-10 top-0 bottom-0 left-0 right-0" />
    ),
  },
  {
    type: "Teacher",
    list: [
      "Get your class to love learning.",
      "Make homework fun, not a chore.",
      "Identify areas for improvement",
    ],
    link: "/signup/teacher",
    icon: (
      <FaAppleAlt className="text-slate-300/30 absolute w-full h-full p-14 z-10 top-0 bottom-0 left-0 right-0" />
    ),
  },
];

export default function Signup({ loading, user }) {
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }

    // FIXME
    if (!user) {
      router.push('/signup/student')
    }

    if (user && user.userType === 1) {
      router.push('/play')
    }
    else if (user) {
      router.push("/");
    }
  }, [loading, user]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[url('/assets/backgrounds/bg-galaxy.png')]">
      <Back to={"/"} />
      <h1 className="text-7xl font-cabin font-bold text-bg-light mb-14">
        I am a...
      </h1>
      <div className="flex flex-row w-full px-44 items-center justify-evenly bg-transparent">
        {content.map((item) => {
          return (
            <a
              className="relative w-[30%] h-80 bg-bg-light py-10 px-12 font-galindo text-ink hover:scale-105 hover:shadow-2xl hover:opacity-80 duration-300 ease-in-out"
              href={item.link}
              key={item.type}
            >
              {item.icon}
              <h3 className="w-full mb-5 text-center text-3xl relative z-20">
                {item.type}
              </h3>
              <ul className="list-disc relative z-20">
                {item.list.map((elem, index) => (
                  <li className="text-xl leading-relaxed" key={index}>
                    {elem}
                  </li>
                ))}
              </ul>
            </a>
          );
        })}
      </div>
    </div>
  );
}
