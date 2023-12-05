import React from "react";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="w-full h-[300px] relative mb-96">
      <Image
        src="/assets/graphics/concentric-circles.svg"
        width={600}
        height={600}
        alt="Concentric Circles"
        className="absolute w-[600px] h-[600px] z-0 left-10 -top-32"
      />
      <section className="relative w-full bg-primary-dark h-[300px] flex flex-row items-center justify-start px-40 py-5 z-10">
        <div className="relative w-1/3 px-10 -mt-7 h-full flex items-center justify-center">
          <Image
            src="/assets/slimes/slime-static/lucky-slime.png"
            alt="Lucky Slime"
            width={400}
            height={400}
            className="w-full do-a-spin"
          />
        </div>
        <div className="w-2/3 flex flex-col items-start justify-evenly">
          <h2 className="text-4xl font-medium font-galindo text-primary-light shine">
            Ready to enhance your learning?
          </h2>
          <a
            href="/signup/student"
            className="shake rounded-md bg-primary-light text-primary font-galindo text-xl text-center px-7 py-3 mt-5"
          >
            Play Now!
          </a>
        </div>
      </section>
    </section>
  );
}
