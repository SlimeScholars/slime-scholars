import React, { useEffect, useState } from "react";
import Back from "../components/signup/back";

import { showToastError } from "../utils/toast";

import axios from "axios";
import { useRouter } from "next/router";

export default function Login({ loading, user, setUser }) {
  const [accountIdentifier, setAccountIdentifier] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const router = useRouter()

  useEffect(() => {
    if (loading) {
      return
    }
    if (user) {
      router.push('/')
    }
  }, [loading, user])

  const onSubmit = (e) => {
    e.preventDefault();
    if (!accountIdentifier) {
      showToastError("Username/email cannot be left blank");
      return;
    }
    if (!password) {
      showToastError("Password cannot be left blank");
      return;
    }
    axios
      .post("/api/user/login", { accountIdentifier, password })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("jwt", response.data.token)
          setUser(response.data.user)
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
      <Back />
      <div className="w-1/3 bg-gradient-to-br from-blue-400/70 to-purple-900/70 opacity-90 rounded-2xl p-3">
        <form
          className="w-full h-full bg-indigo-950/80 rounded-lg px-14 py-10 flex flex-col items-center justify-between overflow-hidden"
          onSubmit={onSubmit}
        >
          <h1 className="text-center text-6xl font-cabin font-bold text-bg-light/90 mb-3">
            Log in
          </h1>
          <div className="w-full h-[2px] bg-bg-light/30 my-3" />
          <section className="z-10 w-full flex flex-col items-start justify-center">
            <label className="font-galindo text-bg-light/90 text-base mt-2">
              Username/Email
            </label>
            <input
              className="w-full h-8 bg-slate-950/40 rounded-md ring-2 ring-cyan-300/60 font-galindo text-sm text-slate-100/80 placeholder:text-slate-300/50 px-3 py-2 my-1 focus:outline-none focus:ring-cyan-200/80 focus:bg-cyan-900/20 hover:ring-cyan-200/80 hover:bg-cyan-900/20 duration-300 ease-in-out"
              type="text"
              placeholder="What name do you want others to see?"
              value={accountIdentifier}
              autoComplete="email"
              onChange={(e) => setAccountIdentifier(e.target.value)}
            />
            <label className="font-galindo text-bg-light/90 text-base mt-2">
              Password
            </label>
            <input
              className="w-full h-8 bg-slate-950/40 rounded-md ring-2 ring-cyan-300/60 font-galindo text-sm text-slate-100/80 placeholder:text-slate-300/50 px-3 py-2 my-1 focus:outline-none focus:ring-cyan-200/80 focus:bg-cyan-900/20 hover:ring-cyan-200/80 hover:bg-cyan-900/20 duration-300 ease-in-out"
              type="password"
              placeholder="What is your password?"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="w-full h-[2px] bg-bg-light/30 my-5" />
            <button
              className="w-full h-12 bg-fuchsia-950/40 rounded-md ring-2 ring-fuchsia-400/90 font-galindo text-xl text-fuchsia-300/90 placeholder:text-fuchsia-300/50 px-3 py-2 my-1 focus:outline-none hover:bg-fuchsia-900/50 hover:ring-fuchsia-300/80 duration-300 ease-in-out"
              type='submit'
            >
              Start playing!
            </button>
          </section>
          <p className="relative z-10 text-center text-base font-galindo text-bg-light/90 mt-5">
            Need an account?{" "}
            <a href="/signup" className="text-emerald-300 hover:underline">
              Sign up here!
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
