import React from "react";
import Carousel from "nuka-carousel";
import Image from "next/image";
import { landingContent } from "../../data/landingPage";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

export default function Preview() {
  return (
    <Carousel
      className="w-full h-full ring-8 ring-primary"
      autoplay={true}
      autoplayInterval={5000}
      pauseOnHover={true}
      speed={1000}
      wrapAround={true}
      renderCenterRightControls={({ nextSlide }) => (
        <button
          className="flex items-center justify-center "
          onClick={nextSlide}
        >
          <GoTriangleRight className="text-white text-6xl hover:text-7xl ease-in-out duration-300 hover:drop-shadow-glow" />
        </button>
      )}
      renderCenterLeftControls={({ previousSlide }) => (
        <button
          className="flex items-center justify-center "
          onClick={previousSlide}
        >
          <GoTriangleLeft className="text-white text-6xl hover:text-7xl ease-in-out duration-300 hover:drop-shadow-glow" />
        </button>
      )}
      defaultControlsConfig={{
        pagingDotsStyle: {
          fill: "white",
          padding: "0.2rem",
          margin: "0.2rem",
        },
      }}
    >
      {landingContent.previews.map((content, index) => (
        <div
          key={index}
          className="w-full h-[300px] py-8 px-10 flex flex-col items-start justify-end"
          style={{
            backgroundImage: `url(${content.image})`,
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-xl md:text-2xl lg:text-3xl text-white font-bold">
            {content.title}
          </h1>
          <p className="text-xs sm:text-sm lg:text-base font-thin text-white">
            {content.description}
          </p>
        </div>
      ))}
    </Carousel>
  );
}
