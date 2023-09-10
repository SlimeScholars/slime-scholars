import React, { useState } from "react";

export default function Modal({ preview, content }) {
  const [show, setShow] = useState(false);
  return show ? (
    <button
      className="w-screen h-screen fixed top-0 left-0 bg-slate-900/80 flex flex-col justify-center items-center"
      onClick={() => setShow(false)}
    >
      <div className="p-8 text-lg bg-bg-light/90 rounded-2xl flex flex-col justify-center items-center font-galindo">
        {content}
      </div>
      <div className="fixed bottom-10 text-xl mt-10 text-bg-light/80 font-galindo">
        Click anywhere to exit
      </div>
    </button>
  ) : (
    <button
      onClick={(e) => {
        if(!e.clientX && !e.clientY) return
        setShow(true)
      }}
      className="shake duration-300 ease-in-out focus:outline-none active:outline-none after:outline-none"
    >
      {preview}
    </button>
  );
}
