import React from "react";

export default function Button({ text, onClick, style }) {
  let styleClass =
    "bg-gradient-to-br from-primary-light to-primary-dark text-bg-light hover:contrast-[120%]";
  if (style == "Secondary") {
    styleClass =
      "bg-bg-light ring-primary ring-1 text-primary hover:bg-[#E44DCC] hover:text-bg-light";
  }
  if (typeof onClick == "string") {
    return (
      <a
        href={onClick}
        className={
          "text-xl font-bold py-3 px-8 mx-2 rounded-lg duration-300 hover:scale-105 ease-in-out " +
          styleClass
        }
      >
        {text}
      </a>
    );
  }
  return (
    <button
      className={"text-xl font-bold py-3 px-8 mx-2 rounded-lg " + styleClass}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
