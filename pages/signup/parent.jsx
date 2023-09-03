import React, { useState } from "react";
import Back from "../../components/signup/back";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Modal from "../../components/signup/modal";
import Image from "next/image";

import {
  verifyEmail,
  verifyHonorific,
  verifyName,
  verifyPassword,
} from "../../utils/verify";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastError } from "../../utils/toast";

import axios from "axios";

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Parent({ loading, user, setUser }) {
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      router.push("/");
    }
  }, [loading, user]);

  const [honorific, setHonorific] = useState(undefined);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  // const [error, setError] = useState("");

  const onSubmit = (e) => {
    // TODO: Add validation, api call, and redirect
    e.preventDefault();
    try {
      verifyName(firstName);
      verifyName(lastName);
      verifyEmail(email);
      verifyPassword(password);
      if (password !== confirm) {
        throw new Error("Passwords do not match");
      }
      verifyHonorific(honorific);
    } catch (error) {
      showToastError(error.message);
      return;
    }
    axios
      .post("/api/user/create", {
        // userType 2 represents parent
        userType: 2,
        honorific,
        firstName,
        lastName,
        email,
        password,
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("jwt", response.data.token);
          setUser(response.data.user);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          showToastError(error.response.data.message);
        }
      });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[url('/assets/backgrounds/bg-galaxy.png')]">
      <Back to={"/"} />
      <ToastContainer />
      <div className="w-1/3 relative bg-bg-light px-14 pt-10 pb-7 mb-3 flex flex-col items-center justify-between overflow-hidden">
        <h1 className="text-center text-6xl font-cabin font-bold text-ink/90 mb-2 drop-shadow-sm">
          Parent Sign-Up
        </h1>
        <h2 className="text-center text-xl font-galindo text-ink/90 mb-2">
          Start inspiring your child today.
        </h2>
        <div className="w-full h-[2px] bg-ink/30 my-1" />
        <section className="relative z-10 w-full flex flex-col items-start justify-center">
          <div className="w-full flex flex-row items-center justify-between">
            <div className="w-1/5 flex flex-col items-start justify-center">
              <label className="font-galindo text-ink/90 text-base mt-2">
                Honorific
              </label>
              <select
                className="w-full h-8 bg-slate-300/40 ring-2 ring-ink/60 font-galindo text-sm text-ink/90 placeholder:text-ink/40 px-3 py-2 my-1 focus:outline-none focus:ring-ink/90 focus:bg-blue-200/20 hover:ring-ink/90 hover:bg-blue-200/20 duration-300 ease-in-out"
                onChange={(e) => {
                  if (e.target.value) {
                    setHonorific(e.target.value);
                  } else {
                    setHonorific(undefined);
                  }
                }}
              >
                <option value={undefined} className="bg-indigo-50" />
                <option value="Mr." className="bg-indigo-50">
                  Mr.
                </option>
                <option value="Mrs." className="bg-indigo-50">
                  Mrs.
                </option>
                <option value="Ms." className="bg-indigo-50">
                  Ms.
                </option>
                <option value="Dr." className="bg-indigo-50">
                  Dr.
                </option>
                <option value="Prof." className="bg-indigo-50">
                  Prof.
                </option>
              </select>
            </div>
            <div className="w-2/5 flex flex-col items-start justify-center pl-2">
              <label className="font-galindo text-ink/90 text-base mt-2">
                First name*
              </label>
              <input
                className="w-full h-8 bg-slate-300/40 ring-2 ring-ink/60 font-galindo text-sm text-ink/90 placeholder:text-ink/40 px-3 py-2 my-1 focus:outline-none focus:ring-ink/90 focus:bg-blue-200/20 hover:ring-ink/90 hover:bg-blue-200/20 duration-300 ease-in-out"
                type="text"
                placeholder=""
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-2/5 flex flex-col items-start justify-center pl-2">
              <label className="font-galindo text-ink/90 text-base mt-2">
                Last name*
              </label>
              <input
                className="w-full h-8 bg-slate-300/40 ring-2 ring-ink/60 font-galindo text-sm text-ink/90 placeholder:text-ink/40 px-3 py-2 my-1 focus:outline-none focus:ring-ink/90 focus:bg-blue-200/20 hover:ring-ink/90 hover:bg-blue-200/20 duration-300 ease-in-out"
                type="text"
                placeholder=""
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <label className="font-galindo text-ink/90 text-base mt-2">
            Email*
          </label>
          <input
            className="w-full h-8 bg-slate-300/40 ring-2 ring-ink/60 font-galindo text-sm text-ink/90 placeholder:text-ink/40 px-3 py-2 my-1 focus:outline-none focus:ring-ink/90 focus:bg-blue-200/20 hover:ring-ink/90 hover:bg-blue-200/20 duration-300 ease-in-out"
            type="text"
            placeholder="Enter your email, e.g. johndoe@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="w-full flex justify-between items-end mb-1">
            <label className="font-galindo text-ink/90 text-base mt-2">
              Password*
            </label>
            <Modal
              preview={
                <AiOutlineQuestionCircle className="text-xl text-ink/80" />
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
            className="w-full h-8 bg-slate-300/40 ring-2 ring-ink/60 font-galindo text-sm text-ink/90 placeholder:text-ink/40 px-3 py-2 my-1 focus:outline-none focus:ring-ink/90 focus:bg-blue-200/20 hover:ring-ink/90 hover:bg-blue-200/20 duration-300 ease-in-out"
            type="password"
            placeholder="What is your password?"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="font-galindo text-ink/90 text-base mt-2">
            Confirm Password*
          </label>
          <input
            className="w-full h-8 bg-slate-300/40 ring-2 ring-ink/60 font-galindo text-sm text-ink/90 placeholder:text-ink/40 px-3 py-2 my-1 focus:outline-none focus:ring-ink/90 focus:bg-blue-200/20 hover:ring-ink/90 hover:bg-blue-200/20 duration-300 ease-in-out"
            type="password"
            placeholder="Confirm your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <div className="w-full h-[2px] bg-ink/30 my-3" />
          <div className="w-full bg-gradient-to-br from-pink-300 to-pink-800 p-1">
            <button
              className="w-full h-12 bg-pink-200/90 font-galindo text-xl text-pink-700/90 placeholder:text-pink-300/50 px-3 py-2 focus:outline-none hover:bg-pink-200/70 duration-300 ease-in-out"
              onClick={onSubmit}
            >
              Register
            </button>
          </div>
        </section>
        <p className="relative z-10 text-center text-base font-galindo text-ink/90 mt-3">
          Are you a teacher?{" "}
          <a
            href="/signup/teacher"
            className="text-emerald-400 hover:underline"
          >
            Sign up here!
          </a>
        </p>
        <p className="relative z-10 text-center text-base font-galindo text-ink/90 mt-1">
          Already have an account?{" "}
          <a href="/login" className="text-violet-400 hover:underline">
            Log in here!
          </a>
        </p>
      </div>
      <footer className="relative w-1/3 py-4 flex flex-row bg-pink-400">
        <div className="w-1/3 h-full relative">
          <Image
            src="/assets/graphics/slimes/slime-special.png"
            width={200}
            height={200}
            className="absolute -top-12 -left-8 w-full drop-shadow-xl"
            alt="Slime"
          />
        </div>
        <div className="w-2/3 flex-col flex items-start justify-center">
          <h2 className="text-center text-xl font-galindo text-bg-light mb-2">
            Are you a student?
          </h2>
          <a
            href="/signup/student"
            className="bg-bg-light px-4 py-2 font-galindo text-xl text-pink-400 hover:px-10 duration-300 ease-in-out"
          >
            Click here!
          </a>
        </div>
      </footer>
    </div>
  );
}
