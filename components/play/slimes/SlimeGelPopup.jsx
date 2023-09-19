import { useState } from "react";
import Image from "next/image";

export default function SlimeGelPopup({ user, details, close }) {
  
  // function dateToDHM(isostring) {
  //   const milliseconds = new Date() - new Date(isostring)

  //   const seconds = Math.floor(milliseconds / 1000);
  //   const days = Math.floor(seconds / (3600 * 24));
  //   const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  //   const minutes = Math.floor((seconds % 3600) / 60);
  
  //   return { days, hours, minutes };
  // }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 fade-in-element text-white">
      {/* TODO backgorund should match colour palette */}
      <div className="relative bg-black/80 py-8 rounded-lg shadow-lg px-20">
        <button className="text-white hover:text-slate-300 absolute top-[1rem] right-[2rem] text-[2.5rem]"
                onClick={close}>
                &times;
        </button>
        <div>
          <div className="flex flex-col gap-3">
            <div className="text-2xl font-semibold">Welcome back, {user.username}!</div>
            {/* <div className="text-lg">You were gone for{" "}
              <span className="text-red-300">{timeData.days}</span>
              {" "}days,{" "}
              <span className="text-orange-300">{timeData.hours}</span>
              {" "}hours,{" "}
              <span className="text-yellow-300">{timeData.minutes}</span>
              {" "}minutes.
            </div> */}
            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold">
                While you were gone, you gained {details.newSlime-details.previousSlime}
              </p>
              <Image
                src="/assets/icons/slime-gel.png"
                alt="slime gel"
                height={0}
                width={0}
                sizes='100vw'
                className="h-4 w-4 mx-1"
              />
              .
            </div>
            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold">
                Slime Gel: {details.previousSlime}
              </p>
              <Image
                src="/assets/icons/slime-gel.png"
                alt="slime gel"
                height={0}
                width={0}
                sizes='100vw'
                className="h-4 w-4 mx-1"
              />
              <p className="text-lg font-semibold"> → <span className="text-green-400">{details.newSlime}</span></p>
              <Image
                src="/assets/icons/slime-gel.png"
                alt="slime gel"
                height={0}
                width={0}
                sizes='100vw'
                className="h-4 w-4 mx-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
