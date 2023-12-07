import axios from "axios";
import React, { useRef, useState } from "react";
import { HiMiniEnvelope, HiPaperAirplane } from "react-icons/hi2";
import { showToastError } from "../../utils/toast";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import { verifyEmail } from "../../utils/verify";
import { set } from "mongoose";

export default function Contact() {
  const form = useRef();
  const [sendState, setSendState] = useState(0); // 0 = not sent, 1 = sending, 2 = sent

  const sendEmail = (e) => {
    e.preventDefault();
    if (sendState > 0) return;
    if (!form.current.name.value) {
      showToastError("Please enter a name.", false);
      return;
    }
    if (!form.current.email.value) {
      showToastError("Please enter an email.", false);
      return;
    }
    if (!verifyEmail(form.current.email.value)) {
      showToastError("Please enter a valid email.", false);
      return;
    }
    if (!form.current.message.value) {
      showToastError("Please enter a message.", false);
      return;
    }
    setSendState(1);
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          showToastError(
            "Message sent! We'll get back to you as soon as possible.",
            true
          );
          form.current.reset();
          setSendState(2);
        },
        (error) => {
          showToastError(
            "Failed to send message. Please try again later, or email us directly at slimescholarsedu@gmail.com",
            false
          );
          setSendState(0);
        }
      )
      .catch((err) => {
        showToastError(
          "Failed to send message. Please try again later, or email us directly at slimescholarsedu@gmail.com.",
          false
        );
        setSendState(0);
      });
  };
  return (
    <section
      id="contact"
      className="w-full py-20 flex flex-col justify-start items-center md:grid md:grid-cols-2 gap-10 z-10 px-10 sm:px-14 lg:px-20 xl:px-40"
    >
      <div className="w-full h-full flex flex-col items-start justify-center pt-10 md:pt-32">
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
            slimescholarsedu@gmail.com
          </a>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <form
          className="w-full h-full flex flex-col items-center lg:px-7 xl:px-10 justify-center text-primary"
          ref={form}
          onSubmit={sendEmail}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full h-12 placeholder:text-green-800/50 text-primary border-b-2 border-b-primary bg-transparent px-4 py-2 text-xl outline-none focus:ring-2 focus:ring-primary hover:bg-primary/5 z-[12]"
            data-aos="fade-left"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full h-12 placeholder:text-green-800/50 text-primary border-b-2 border-b-primary bg-transparent px-4 py-2 text-xl outline-none focus:ring-2 focus:ring-primary hover:bg-primary/5 z-[11]"
            data-aos="fade-left"
            data-aos-delay="100"
          />
          <textarea
            type="text"
            name="message"
            placeholder="Message"
            className="w-full h-32 placeholder:text-green-800/50 text-primary border-b-2 border-b-primary bg-transparent px-4 py-2 text-xl outline-none focus:ring-2 focus:ring-primary hover:bg-primary/5 resize-none"
            data-aos="fade-left"
            data-aos-delay="200"
          />
          <button
            className="btn-animated w-full my-1 py-4 disabled:bg-primary/80 bg-primary enabled:hover:bg-primary/80 flex items-center justify-center mt-5"
            data-aos="fade-left"
            data-aos-delay="300"
            type="submit"
            disabled={sendState > 0}
          >
            <svg>
              <rect x="0" y="0" fill="none" width="100%" height="100%" />
            </svg>
            <p className="text-white font-extrabold text-lg">
              {sendState === 0
                ? "Send"
                : sendState === 1
                ? "Sending..."
                : "Sent!"}
            </p>
          </button>
        </form>
      </div>
    </section>
  );
}
