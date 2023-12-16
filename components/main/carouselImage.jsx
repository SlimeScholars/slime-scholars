import React from "react";

export default function CarouselImage({ text, url }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('${url}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl font-extrabold text-white">{text}</h1>
    </div>
  );
}
