import React, { useState } from "react";
import { HiMiniEnvelope, HiPaperAirplane } from "react-icons/hi2";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  return (
    <section
      id="contact"
      className="w-full py-20 grid grid-cols-2 gap-10 z-10 px-40"
    >
      <div className="w-full h-full flex flex-col items-start justify-center pt-32">
        <h1
          className="text-4xl text-primary font-galindo text-center"
          data-aos="fade-right"
        >
          Got questions?
        </h1>
        <p
          className="text-2xl text-center text-primary-medium font-galindo mt-3"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          Let us know!
        </p>
        <div
          className="group flex flex-row items-center justify-start mt-5"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <div className="w-12 h-9 overflow-hidden -ml-2">
            <div className="w-32 h-9 flex flex-row items-center justify-center flex-nowrap -translate-x-20 group-hover:translate-x-0 duration-700 ease-in-out">
              <HiPaperAirplane className="w-12 h-0 text-4xl text-green-500 group-hover:h-9 duration-300 ease-in-out" />
              <div className="w-8 h-9" />
              <HiMiniEnvelope className="w-12 h-9 text-4xl text-primary-dark group-hover:h-0 duration-300 ease-in-out" />
            </div>
          </div>
          <a
            className="text-xl text-primary-dark ml-2 group-hover:text-green-500 group-hover:tracking-wider duration-300 ease-in-out"
            href="mailto:letmeknoweducation@gmail.com"
            target="_blank"
          >
            letmeknoweducation@gmail.com
          </a>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <form className="w-full h-full flex flex-col items-center justify-center px-10 text-primary">
          <input
            type="text"
            placeholder="Name"
            className="w-full h-12 placeholder:text-green-800/50 text-primary border-b-2 border-b-primary bg-bg-light px-4 py-2 text-xl outline-none focus:ring-2 focus:ring-primary duration-300 transition-all ease-in-out z-[12]"
            onChange={(e) => setName(e.target.value)}
            data-aos="fade-left"
          />
          <input
            type="text"
            placeholder="Email"
            className="w-full h-12 placeholder:text-green-800/50 text-primary border-b-2 border-b-primary bg-bg-light px-4 py-2 text-xl outline-none focus:ring-2 focus:ring-primary duration-300 transition-all ease-in-out z-[11]"
            onChange={(e) => setEmail(e.target.value)}
            data-aos="fade-left"
            data-aos-delay="100"
          />
          <textarea
            placeholder="Message"
            className="w-full h-32 placeholder:text-green-800/50 text-primary border-b-2 border-b-primary bg-bg-light px-4 py-2 text-xl outline-none focus:ring-2 focus:ring-primary duration-300 transition-all ease-in-out resize-none"
            onChange={(e) => setMessage(e.target.value)}
            data-aos="fade-left"
            data-aos-delay="200"
          />
          <button
            className="btn-animated w-full my-1 py-4 bg-primary/70 hover:bg-primary/95 flex items-center justify-center mt-5"
            data-aos="fade-left"
            data-aos-delay="300"
          >
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
