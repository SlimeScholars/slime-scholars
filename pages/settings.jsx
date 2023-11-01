import React, { useState } from "react";
import Back from "../components/signup/back";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Modal from "../components/signup/modal";
import Image from "next/image";
import { gameData } from "../data/gameData";

import {
  verifyEmail,
  verifyName,
  verifyUsername,
} from "../utils/verify";

import { showToastError } from "../utils/toast";

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Settings({ loading, user, setUser }) {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (loading || !user) {
      return;
    }
    // if (!user || user.userType !== 1) {
    //   router.push("/");
    // }
    // else {
    //   setFirstName(user.firstName)
    //   setLastName(user.lastName)
    //   setUsername(user.username)
    //   setEmail(user.email)
    // }
    setFirstName(user?.firstName)
    setLastName(user?.lastName)
    setUsername(user?.username)
    setEmail(user?.email)
  }, [user, loading]);

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      verifyName(firstName);
      verifyName(lastName);
      verifyUsername(username);
      verifyEmail(email);
      const token = localStorage.getItem("jwt");

      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .put(
          "/api/user/update",
          {
            username,
            firstName,
            lastName,
            honorific: "",
            email,
            parentEmail: "",
          },
          config
        )
        .then((response) => {
          showToastError("Profile updated successfully", "success");
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
      if (newPassword.length > 0) {
        axios
          .put(
            "/api/user/update-password",
            {
              oldPassword,
              newPassword,
            },
            config
          )
          .then((response) => {
            showToastError("Password updated successfully", "success");
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
      }
    } catch (error) {
      showToastError(error.message);
      return;
    }
  };

  const onLogOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
    }
    router.push("/");
    setUser(null);
  };

  if (!user) {
    return <></>;
  }

  return (
    <div className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center bg-[url('/assets/backgrounds/bg-galaxy.png')]">
      <Back to={"/play"} />
      <div className="w-1/2 bg-gradient-to-br from-blue-400/70 to-purple-900/70 opacity-90 rounded-2xl p-3">
        <form className="relative w-full h-full bg-indigo-950/80 rounded-lg px-14 py-10 flex flex-col items-center justify-between overflow-hidden">
          {/* <div className="rotate-[14deg] absolute -bottom-8 -left-11 opacity-100 z-0">
            <Image
              src="/assets/graphics/slimes/slime-cat.png"
              width={200}
              height={200}
              alt="Cat slime"
            />
          </div> */}
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-center text-6xl font-cabin font-bold text-bg-light/90 mb-3 mr-8">
              {username} Profile
            </h1>
            <div
              className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-purple-500 flex justify-center items-center cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                router.push("/play/inventory");
              }}
            >
              {user.pfpBg && 
              <>
              <Image
                src={
                  "/assets/pfp/backgrounds/" + gameData.items[user.pfpBg].pfp
                }
                alt={user.pfpBg}
                height={0}
                width={0}
                sizes='100vw'
                className="absolute h-32 w-32 inset-0"
              />
              <Image
                src={
                  "/assets/pfp/slimes/" + gameData.slimes[user.pfpSlime].pfp
                }
                alt={user.pfpSlime}
                height={0}
                width={0}
                sizes='100vw'
                className="relative z-8 translate-y-1/4 scale-125 w-[4.5rem] h-[4rem]"
              />
              </>}
            </div>
          </div>

          <div className="w-full h-[2px] bg-bg-light/30 my-3" />

          <section className="relative z-10 w-full flex flex-col items-start justify-center">
            <div className="w-full flex flex-row items-center justify-between">
              <div className="w-[48%]  flex flex-col items-start justify-center">
                <label className="font-galindo text-bg-light/90 text-base mt-2">
                  First name
                </label>
                <input
                  className="w-full h-10 bg-slate-950/40 rounded-md ring-2 ring-cyan-300/60 font-galindo text-sm text-slate-100/80 placeholder:text-slate-300/50 px-3 py-2 my-1 focus:outline-none focus:ring-cyan-200/80 focus:bg-cyan-900/20 hover:ring-cyan-200/80 hover:bg-cyan-900/20 duration-300 ease-in-out"
                  type="text"
                  placeholder={firstName}
                  value={firstName}
                  autoComplete="given-name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-[48%] flex flex-col items-start justify-center">
                <label className="font-galindo text-bg-light/90 text-base mt-2">
                  Last name
                </label>
                <input
                  className="w-full h-10 bg-slate-950/40 rounded-md ring-2 ring-cyan-300/60 font-galindo text-sm text-slate-100/80 placeholder:text-slate-300/50 px-3 py-2 my-1 focus:outline-none focus:ring-cyan-200/80 focus:bg-cyan-900/20 hover:ring-cyan-200/80 hover:bg-cyan-900/20 duration-300 ease-in-out"
                  type="text"
                  placeholder={lastName}
                  value={lastName}
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex justify-between items-end mb-1">
              <label className="font-galindo text-bg-light/90 text-base mt-2">
                Username
              </label>
            </div>
            <input
              className="w-full h-10 bg-slate-950/40 rounded-md ring-2 ring-cyan-300/60 font-galindo text-sm text-slate-100/80 placeholder:text-slate-300/50 px-3 py-2 my-1 focus:outline-none focus:ring-cyan-200/80 focus:bg-cyan-900/20 hover:ring-cyan-200/80 hover:bg-cyan-900/20 duration-300 ease-in-out"
              type="text"
              placeholder="What name do you want others to see?"
              value={username}
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="font-galindo text-bg-light/90 text-base mt-2">
              Email
            </label>
            <input
              className="w-full h-10 bg-slate-950/40 rounded-md ring-2 ring-cyan-300/60 font-galindo text-sm text-slate-100/80 placeholder:text-slate-300/50 px-3 py-2 my-1 focus:outline-none focus:ring-cyan-200/80 focus:bg-cyan-900/20 hover:ring-cyan-200/80 hover:bg-cyan-900/20 duration-300 ease-in-out"
              type="text"
              placeholder={email}
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="w-full h-[2px] bg-bg-light/30 my-5" />
            {/* change password */}
            <div className="w-full flex flex-row items-center justify-between">
              <div className="w-[48%] flex flex-col items-start justify-center">
                <div className="w-full flex justify-between items-end mb-1">
                  <label className="font-galindo text-bg-light/90 text-base mt-2">
                    Old Password
                  </label>
                </div>
                <input
                  className="w-full h-10 bg-slate-950/40 rounded-md ring-2 ring-cyan-300/60 font-galindo text-sm text-slate-100/80 placeholder:text-slate-300/50 px-3 py-2 my-1 focus:outline-none focus:ring-cyan-200/80 focus:bg-cyan-900/20 hover:ring-cyan-200/80 hover:bg-cyan-900/20 duration-300 ease-in-out"
                  type="password"
                  placeholder="Verify old password"
                  value={oldPassword}
                  autoComplete="current-password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="w-[48%] flex flex-col items-start justify-center">
                <div className="w-full flex justify-between items-end mb-1">
                  <label className="font-galindo text-bg-light/90 text-base mt-2">
                    New Password
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
                  className="w-full h-10 bg-slate-950/40 rounded-md ring-2 ring-cyan-300/60 font-galindo text-sm text-slate-100/80 placeholder:text-slate-300/50 px-3 py-2 my-1 focus:outline-none focus:ring-cyan-200/80 focus:bg-cyan-900/20 hover:ring-cyan-200/80 hover:bg-cyan-900/20 duration-300 ease-in-out"
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  autoComplete="new-password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full h-[2px] bg-bg-light/30 my-5" />
            <button
              className="w-full h-12 bg-fuchsia-950/40 rounded-md ring-2 ring-fuchsia-400/90 font-galindo text-xl text-fuchsia-300/90 placeholder:text-fuchsia-300/50 px-3 py-2 my-1 focus:outline-none hover:bg-fuchsia-900/50 hover:ring-fuchsia-300/80 duration-300 ease-in-out mb-5"
              onClick={onSubmit}
            >
              Update Profile
            </button>
            <button
              className="w-full h-10 bg-red-100 rounded-md ring-2 ring-red-400 font-galindo text-xl text-red-700 px-3 py-2 my-1 focus:outline-none hover:bg-red-300 hover:ring-red-500 duration-300 ease-in-out"
              onClick={onLogOut}
            >
              Log Out
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}

