import React from "react";
import Image from "next/image";
import { landingContent } from "../../data/landingPage";

export default function Testimonials() {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-center pb-36 -mb-16 overflow-hidden"
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
        data-aos="fade-right"
      />
      <Image
        src="/assets/slimes/slime-static/sleepy-slime.png"
        alt="Sleepy Slime"
        width={400}
        height={400}
        className="absolute top-10 -left-10 w-64 h-64 -rotate-3"
        data-aos="fade-right"
        data-aos-offset="200"
      />
      <Image
        src="/assets/slimes/slime-static/glass-slime.png"
        alt="Glass Slime"
        width={400}
        height={400}
        className="absolute -top-10 -right-10 w-72 h-72 rotate-6"
        data-aos="fade-left"
      />
      <Image
        src="/assets/slimes/slime-static/pineapple-slime.png"
        alt="Pineapple Slime"
        width={400}
        height={400}
        className="absolute bottom-0 -left-10 w-60 h-60 -rotate-12"
        data-aos="fade-right"
      />
      <Image
        src="/assets/graphics/dots.svg"
        alt=""
        width={400}
        height={400}
        className="absolute -bottom-6 -right-8 w-72 h-72 -rotate-90 opacity-70"
        data-aos="fade-left"
      />
      <Image
        src="/assets/slimes/slime-static/strawbunny-slime.png"
        alt="Strawbunny Slime"
        width={400}
        height={400}
        className="absolute -bottom-7 -right-10 w-64 h-64 rotate-12 z-10"
        data-aos="fade-left"
      />
      <h2
        className="text-4xl font-medium font-galindo text-primary text-center mt-16 mb-5"
        data-aos="fade-up"
      >
        Make Learning Rewarding
      </h2>
      <p className="text-xl text-center mb-10 w-2/5" data-aos="fade-up">
        Collect adorable slimes while learning from lessons designed to help
        maximize success in our modern world.
      </p>
      <section className="relative w-full px-64 grid grid-cols-3 gap-12">
        {landingContent.testimonials.map((testimonial, index) => (
          <div
            className="relative flex p-8 flex-col items-start justify-start bg-gray-100 ring-1 ring-gray-200 shadow-xl"
            key={testimonial.name}
            data-aos={
              index === 0 ? "fade-right" : index === 1 ? "fade-up" : "fade-left"
            }
          >
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
            <p className="text-left text-sm">{testimonial.quote}</p>
          </div>
        ))}
      </section>
    </section>
  );
}
