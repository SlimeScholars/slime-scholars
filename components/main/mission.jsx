import React from "react";
import Image from "next/image";

const content = [
  {
    title: "Modernize.",
    image: "/assets/slimes/slime-static/cool-slime.png",
    description:
      "Modernize your learning to better adjust towards our increasingly online (and distracting!) world.",
    animation: "fade-right",
  },
  {
    title: "Educate.",
    image: "/assets/slimes/slime-static/scholar-slime.png",
    description:
      "Education built with the insight of industry professionals at all levels.",
    animation: "fade-up",
  },
  {
    title: "Inspire.",
    image: "/assets/slimes/slime-static/metal-slime.png",
    description:
      "Built by students, for students. At its core, our goal is to help youth navigate out changing world.",
    animation: "fade-left",
  },
];

export default function Mission() {
  return (
    <section className="w-[200vw] md:w-[140vw] rounded-[50%] py-16 md:py-12 bg-primary z-30 flex items-center justify-center -mb-14">
      <div className="w-screen h-full flex flex-col justify-center items-center md:grid md:grid-cols-3 gap-10 px-5 sm:px-10 md:px-20 lg:px-56">
        {content.map((item, index) => (
          <div
            className="w-full h-full flex flex-col items-center justify-start"
            key={item.title}
          >
            <h4
              className="text-2xl lg:text-3xl mb-3 font-extrabold text-white"
              data-aos="fade-down"
              data-aos-delay={index * 200}
            >
              {item.title}
            </h4>
            <Image
              src={item.image}
              alt="Cool Slime"
              width={400}
              height={400}
              className="w-16 h-16 md:w-24 md:h-24 lg:w-40 lg:h-40 -mt-5"
              data-aos="flip-left"
              data-aos-delay={index * 200}
            />
            <p
              className="text-base lg:text-lg text-white text-center"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
