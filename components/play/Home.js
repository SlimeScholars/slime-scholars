import { Navbar } from "./Navbar";
import DisplaySlimes from "./slimes/DisplaySlimes";

export default function Home({ user, bg }) {
  return (
    <div
      className="w-screen h-screen relative"
      style={{
        backgroundImage: `url('/assets/backgrounds/${bg}')`,
        backgroundSize: "cover",
      }}
    >
      <div className="p-8 w-full h-full justify-center items-center backdrop-brightness-[0.25] blur-sm">
        <div className="w-full h-full relative">
          <DisplaySlimes user={user} />
          <div className="absolute inset-0 backdrop-filter backdrop-brightness-[0.25]"></div>
        </div>
      </div>
    </div>
  );
}
