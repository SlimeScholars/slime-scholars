import { Navbar } from "./Navbar";
import DisplaySlimes from "./slimes/DisplaySlimes";
import { useEffect } from "react";

export default function Home({ user, bg }) {
  return (
    <div
      className="w-screen h-screen relative bg-bottom"
      style={{
        backgroundImage: `url('/assets/backgrounds/${bg}')`,
        backgroundSize: "cover",
      }}
    >
      <div className="p-8 w-full h-full justify-center items-center backdrop-brightness-[0.25] blur-sm">
        <div className="w-full h-full relative">
          <DisplaySlimes user={user} />
          <div className="fixed inset-0 backdrop-filter backdrop-brightness-[0.25]"></div>
        </div>
      </div>
    </div>
  );
}
