import React from "react";
import Image from "next/image";
import { landingContent } from "../../data/landingPage";

export default function Testimonials() {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-center pb-36 -mb-12 overflow-hidden"
      style={{
        backgroundImage: "url('/assets/graphics/bg-graphic-1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Image
        src="/assets/graphics/dots.svg"
        alt=""
        width={400}
        height={400}
        className="absolute -top-7 -left-4 w-64 h-64 -rotate-3 opacity-70"
      />
      <Image
        src="/assets/slimes/slime-static/sleepy-slime.png"
        alt="Sleepy Slime"
        width={400}
        height={400}
        className="absolute top-10 -left-10 w-64 h-64 -rotate-3"
      />
      <Image
        src="/assets/slimes/slime-static/glass-slime.png"
        alt="Glass Slime"
        width={400}
        height={400}
        className="absolute -top-10 -right-10 w-72 h-72 rotate-6"
      />
      <Image
        src="/assets/slimes/slime-static/pineapple-slime.png"
        alt="Pineapple Slime"
        width={400}
        height={400}
        className="absolute -bottom-2 -left-10 w-60 h-60 -rotate-12"
      />
      <Image
        src="/assets/graphics/dots.svg"
        alt=""
        width={400}
        height={400}
        className="absolute -bottom-6 -right-8 w-72 h-72 -rotate-90 opacity-70"
      />
      <Image
        src="/assets/slimes/slime-static/strawbunny-slime.png"
        alt="Strawbunny Slime"
        width={400}
        height={400}
        className="absolute -bottom-7 -right-10 w-64 h-64 rotate-12"
      />
      <h2 className="text-4xl font-medium font-galindo text-primary text-center mt-16 mb-8">
        Make Learning Rewarding
      </h2>
      <p className="text-xl text-center mb-10 w-2/5">
        Collect adorable slimes while learning from lessons designed to help
        maximize success in our modern world.
      </p>
      <section className="relative w-full px-40 grid grid-cols-3 gap-12">
        {landingContent.testimonials.map((testimonial) => (
          <div className="relative flex p-8 flex-col items-start justify-start bg-gray-100 ring-1 ring-gray-200 shadow-xl">
            <Image
              src={"/assets/graphics/" + testimonial.image}
              alt={testimonial.name}
              width={100}
              height={100}
              className="rounded-full absolute top-5 -left-10 ring-primary ring-4 w-24 h-24"
            />
            <div className="h-24">
              <h3 className="ml-10 text-xl font-bold">{testimonial.name}</h3>
              <h4 className="ml-10 text-sm font-semibold">
                {testimonial.title}
              </h4>
            </div>
            <p className="text-left text-base">{testimonial.quote}</p>
          </div>
        ))}
      </section>
    </section>
  );
}
