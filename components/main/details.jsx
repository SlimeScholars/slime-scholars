import React from "react";
import Preview from "./preview";
import Image from "next/image";
import Link from "next/link";

export default function Details() {
  return (
    <section
      id="details"
      className="w-screen py-32 bg-bg-light relative flex flex-col items-center justify-center px-8 sm:px-16 md:px-24 lg:px-48 xl:px-80"
      style={{
        backgroundImage: "url('/assets/graphics/bg-graphic-2.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Image
        src="/assets/graphics/concentric-circles.svg"
        width={600}
        height={600}
        alt="Concentric Circles"
        className="absolute w-[600px] h-[600px] -top-80 -right-24 z-0"
        data-aos="zoom-in"
        data-aos-offset="400"
      />
      <div className="w-full h-[300px]" data-aos="zoom-in-up">
        <Preview />
      </div>
      <div className="w-full flex flex-col sm:grid sm:grid-cols-2 sm:gap-10 z-10 first-line">
        <div
          className="relative w-full h-full mt-10 pb-5 ring-8 ring-primary bg-white"
          data-aos="zoom-in-left"
          data-aos-delay="100"
        >
          <Image
            src="/assets/slimes/slime-static/octopus-slime.png"
            width={200}
            height={200}
            alt="Octopus Slime"
            className="absolute w-32 h-32 -top-20 -left-16 -rotate-[27deg] z-20"
          />
          <Image
            className="absolute top-0 left-0 saturate-50 contrast-50 opacity-40 filter z-0 object-cover object-top"
            src="/assets/graphics/parents.png"
            alt="Parents.png"
            fill={true}
          />
          <div className="relative w-full h-full flex flex-col items-center justify-start overflow-hidden pt-8 px-10">
            <h3 className="text-2xl md:text-3xl text-primary font-galindo z-20">
              Parents
            </h3>
            <ul className="w-full pl-5 mt-4 font-normal text-lg md:text-xl text-green-800 styled-list space-y-3 lg:space-y-5 z-20">
              <li>Monitor your child's progress</li>
              <li>Get insights on your child's learning</li>
              <li>Help your child learn at home</li>
            </ul>
            <Link
              href="/signup/parent"
              className="btn-animated px-6 py-4 mt-10 bg-primary/70 hover:bg-primary/95 z-20"
            >
              <svg>
                <rect x="0" y="0" fill="none" width="100%" height="100%" />
              </svg>
              <p className="text-white font-extrabold text-base md:text-lg">
                SlimeScholars Parents
              </p>
            </Link>
          </div>
        </div>
        <div
          className="relative w-full h-full mt-10 pb-5 ring-8 ring-primary bg-white"
          data-aos="zoom-in-right"
          data-aos-delay="200"
        >
          <Image
            src="/assets/slimes/slime-static/flower-slime.png"
            width={200}
            height={200}
            alt="Octopus Slime"
            className="absolute w-40 h-40 -bottom-10 -right-16 rotate-[9deg] z-20"
          />
          <Image
            className="absolute top-0 left-0 saturate-50 contrast-50 opacity-40 filter z-0 object-cover"
            src="/assets/graphics/teachers.png"
            alt="Teachers.png"
            fill={true}
          />
          <div className="relative w-full h-full flex flex-col items-center justify-start z-10 overflow-hidden pt-8 px-10">
            <h3 className="text-2xl md:text-3xl text-primary font-galindo z-20">
              Teachers
            </h3>
            <ul className="w-full pl-5 mt-4 font-normal text-lg md:text-xl text-green-800 styled-list space-y-3 lg:space-y-5 z-20">
              <li>Create engaging lessons</li>
              <li>Reward your students' learning</li>
              <li>Manage assignments and homework</li>
            </ul>
            <Link
              href="/signup/teacher"
              className="btn-animated px-6 py-4 mt-10 bg-primary/70 hover:bg-primary/95 z-20"
            >
              <svg>
                <rect x="0" y="0" fill="none" width="100%" height="100%" />
              </svg>
              <p className="text-white font-extrabold text-base md:text-lg">
                SlimeScholars Teachers
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
