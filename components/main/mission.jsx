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
    <section className="w-[140vw] rounded-[50%] h-[400px] bg-primary z-30 flex items-center justify-center -mb-14">
      <div className="w-screen h-full grid grid-cols-3 gap-10 px-32">
        {content.map((item, index) => (
          <div
            className="w-full h-full flex flex-col items-center justify-start"
            key={item.title}
          >
            <h4
              className="text-3xl font-extrabold text-white mt-20"
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
              className="w-40 h-40 -mt-5"
              data-aos="flip-left"
              data-aos-delay={index * 200}
            />
            <p
              className="text-base text-white text-center"
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
