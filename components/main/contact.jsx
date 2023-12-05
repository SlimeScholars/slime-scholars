import React, { useState } from "react";
import { IoMdMail } from "react-icons/io";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  return (
    <section className="w-full py-20 grid grid-cols-2 gap-10 z-10 px-40">
      <div className="w-full h-full flex flex-col items-start justify-center pt-32">
        <h1 className="text-4xl text-primary font-galindo text-center">
          Got questions?
        </h1>
        <p className="text-2xl text-center text-primary-medium font-galindo mt-3">
          Let us know!
        </p>
        <div className="w-full flex flex-row items-center justify-start mt-5">
          <IoMdMail className="text-4xl text-primary" />
          <p className="text-xl text-primary ml-2">
            letmeknoweducation@gmail.com
          </p>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <form className="w-full h-full flex flex-col items-center justify-center px-10 text-primary">
          <input
            type="text"
            placeholder="Name"
            className="w-full h-12 placeholder:text-green-800/50 text-primary border-b-2 border-b-primary bg-bg-light px-4 py-2 text-xl outline-none focus:ring-2 focus:ring-primary duration-200 ease-in-out z-[12]"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            className="w-full h-12 placeholder:text-green-800/50 text-primary border-b-2 border-b-primary bg-bg-light px-4 py-2 text-xl outline-none focus:ring-2 focus:ring-primary duration-200 ease-in-out z-[11]"
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            placeholder="Message"
            className="w-full h-32 placeholder:text-green-800/50 text-primary border-b-2 border-b-primary bg-bg-light px-4 py-2 text-xl outline-none focus:ring-2 focus:ring-primary duration-200 ease-in-out resize-none"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn-animated w-full my-1 py-4 bg-primary/70 hover:bg-primary/95 flex items-center justify-center mt-5">
            <svg>
              <rect x="0" y="0" fill="none" width="100%" height="100%" />
            </svg>
            <p className="text-white font-extrabold text-lg">Send</p>
          </button>
        </form>
      </div>
    </section>
  );
}
