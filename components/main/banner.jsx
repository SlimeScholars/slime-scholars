import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="w-full h-[300px] relative">
      <Image
        src="/assets/graphics/concentric-circles.svg"
        width={600}
        height={600}
        alt="Concentric Circles"
        className="absolute w-[600px] h-[600px] z-0 left-10 -top-32"
        data-aos="zoom-in"
        data-aos-offset="400"
      />
      <section className="relative w-full bg-primary-dark h-[300px] flex flex-row items-center justify-start px-5 md:px-10 lg:px-32 xl:px-40 py-5 z-10">
        <div
          className="relative w-1/3 -mt-7 h-full flex items-center justify-center"
          data-aos="flip-left"
          data-aos-delay="400"
        >
          <Image
            src="/assets/slimes/slime-static/lucky-slime.png"
            alt="Lucky Slime"
            fill={true}
            className="h-full twirl object-contain"
          />
        </div>
        <div className="w-2/3 flex flex-col items-start justify-evenly">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-medium font-galindo text-primary-light shine"
            data-aos="fade-right"
          >
            Ready to enhance your learning?
          </h2>
          <Link
            href="/signup/student"
            className="shake rounded-md bg-primary-light text-primary font-galindo text-lg sm:text-xl text-center px-7 py-3 mt-5"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            Play Now!
          </Link>
        </div>
      </section>
    </section>
  );
}
