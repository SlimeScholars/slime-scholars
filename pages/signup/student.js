import React, { useState } from "react";
import Back from "../../components/signup/back";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Modal from "../../components/signup/modal";
import Image from "next/image";

import {
  verifyEmail,
  verifyName,
  verifyUsername,
  verifyPassword,
} from "../../utils/verify";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastMessage } from "../../utils/verify";

import axios from "axios";

export default function Student() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      verifyName(firstName);
      verifyName(lastName);
      verifyUsername(username);
      verifyEmail(email);
      verifyPassword(password);
      if (password !== confirm) {
        throw new Error("Passwords do not match");
      }
    } catch (error) {
      showToastMessage(error.message);
      return;
    }
    axios
      .post("/api/user/create", {
        userType: 1,
        firstName,
        lastName,
        username,
        email,
        password,
        confirmPassword,
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          localStorage.setItem("jwtToken", response.data.token);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          showToastMessage(error.response.data.message);
        }
      });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[url('/assets/backgrounds/bg-galaxy.png')]">
      <Back />
      <ToastContainer />
      <div className="w-1/3 bg-gradient-to-br from-blue-400/70 to-purple-900/70 opacity-90 rounded-2xl p-3">
        <div className="relative w-full h-full bg-indigo-950/80 rounded-lg px-14 py-10 flex flex-col items-center justify-between overflow-hidden">
          <div className="rotate-[14deg] absolute -bottom-8 -left-11 opacity-100 z-0">
            <Image
              src="/assets/graphics/slimes/slime-cat.png"
              width={200}
              height={200}
              alt="Cat slime"
            />
          </div>
          <h1 className="text-center text-6xl font-cabin font-bold text-bg-light/90 mb-3">
            Sign up to play!
          </h1>
          <div className="w-full h-[2px] bg-bg-light/30 my-3" />
          <section className="relative z-10 w-full flex flex-col items-start justify-center">
            <div className="w-full flex flex-row items-center justify-between">
              <div className="w-[48%]  flex flex-col items-start justify-center">
                <label className="font-galindo text-bg-light/90 text-base mt-2">
                  First name
                </label>
                <input
                  className="w-full h-8 bg-slate-950/40 rounded-md ring-2 ring-cyan-300/60 font-galindo text-sm text-slate-100/80 placeholder:text-slate-300/50 px-3 py-2 my-1 focus:outline-none focus:ring-cyan-200/80 focus:bg-cyan-900/20 hover:ring-cyan-200/80 hover:bg-cyan-900/20 duration-300 ease-in-out"
                  type="text"
                  placeholder="What is your first name?"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-[48%] flex flex-col items-start justify-center">
                <label className="font-galindo text-bg-light/90 text-base mt-2">
                  Last name
                </label>
                <input
                  className="w-full h-8 bg-slate-950/40 rounded-md ring-2 ring-cyan-300/60 font-galindo text-sm text-slate-100/80 placeholder:text-slate-300/50 px-3 py-2 my-1 focus:outline-none focus:ring-cyan-200/80 focus:bg-cyan-900/20 hover:ring-cyan-200/80 hover:bg-cyan-900/20 duration-300 ease-in-out"
                  type="text"
                  placeholder="What is your last name?"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex justify-between items-end mb-1">
              <label className="font-galindo text-bg-light/90 text-base mt-2">
                Username
              </label>
              <Modal
                preview={
                  <AiOutlineQuestionCircle className="text-xl text-slate-100/80" />
                }
                content={
                  <div className="flex flex-col items-start justify-center">
                    <p className="text-2xl mb-2">Password must contain:</p>
                    <ul className="list-disc text-left text-lg pl-6">
                      <li>Between 2-15 characters</li>
                      <li>Only alphanumeric characters (a-z, 0-9)</li>
                      <li>No spaces or symbols, e.g. -</li>
                    </ul>
                  </div>
                }
              />
            </div>
            <input
              className="w-full h-8 bg-slate-950/40 rounded-md ring-2 ring-cyan-300/60 font-galindo text-sm text-slate-100/80 placeholder:text-slate-300/50 px-3 py-2 my-1 focus:outline-none focus:ring-cyan-200/80 focus:bg-cyan-900/20 hover:ring-cyan-200/80 hover:bg-cyan-900/20 duration-300 ease-in-out"
              type="text"
              placeholder="What name do you want others to see?"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="font-galindo text-bg-light/90 text-base mt-2">
              Email
            </label>
            <input
              className="w-full h-8 bg-slate-950/40 rounded-md ring-2 ring-cyan-300/60 font-galindo text-sm text-slate-100/80 placeholder:text-slate-300/50 px-3 py-2 my-1 focus:outline-none focus:ring-cyan-200/80 focus:bg-cyan-900/20 hover:ring-cyan-200/80 hover:bg-cyan-900/20 duration-300 ease-in-out"
              type="text"
              placeholder="Enter your email, e.g. johndoe@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="w-full flex justify-between items-end mb-1">
              <label className="font-galindo text-bg-light/90 text-base mt-2">
                Password
              </label>
              <Modal
                preview={
                  <AiOutlineQuestionCircle className="text-xl text-slate-100/80" />
                }
                content={
                  <div className="flex flex-col items-start justify-center">
                    <p className="text-2xl mb-2">Password must contain:</p>
                    <ul className="list-disc text-left text-lg pl-6">
                      <li>Between 8-55 characters</li>
                      <li>At least 1 uppercase letter, e.g. A</li>
                      <li>At least 1 lowercase letter, e.g. x</li>
                      <li>At least 1 number, e.g. 7</li>
                    </ul>
                  </div>
                }
              />
            </div>
            <input
              className="w-full h-8 bg-slate-950/40 rounded-md ring-2 ring-cyan-300/60 font-galindo text-sm text-slate-100/80 placeholder:text-slate-300/50 px-3 py-2 my-1 focus:outline-none focus:ring-cyan-200/80 focus:bg-cyan-900/20 hover:ring-cyan-200/80 hover:bg-cyan-900/20 duration-300 ease-in-out"
              type="password"
              placeholder="What is your password?"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="font-galindo text-bg-light/90 text-base mt-2">
              Confirm Password
            </label>
            <input
              className="w-full h-8 bg-slate-950/40 rounded-md ring-2 ring-cyan-300/60 font-galindo text-sm text-slate-100/80 placeholder:text-slate-300/50 px-3 py-2 my-1 focus:outline-none focus:ring-cyan-200/80 focus:bg-cyan-900/20 hover:ring-cyan-200/80 hover:bg-cyan-900/20 duration-300 ease-in-out"
              type="password"
              placeholder="Confirm your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <div className="w-full h-[2px] bg-bg-light/30 my-5" />
            <button
              className="w-full h-12 bg-fuchsia-950/40 rounded-md ring-2 ring-fuchsia-400/90 font-galindo text-xl text-fuchsia-300/90 placeholder:text-fuchsia-300/50 px-3 py-2 my-1 focus:outline-none hover:bg-fuchsia-900/50 hover:ring-fuchsia-300/80 duration-300 ease-in-out"
              onClick={onSubmit}
            >
              Start playing!
            </button>
          </section>
          <p className="relative z-10 text-center text-base font-galindo text-bg-light/90 mt-5">
            Not a student?{" "}
            <a href="/signup" className="text-emerald-300 hover:underline">
              Sign up here!
            </a>
          </p>
          <p className="relative z-10 text-center text-base font-galindo text-bg-light/90 mt-3">
            Already have an account?{" "}
            <a href="/login" className="text-violet-400 hover:underline">
              Log in here!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
