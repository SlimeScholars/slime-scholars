import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/main/navbar.jsx";
import { useRouter } from "next/router.js";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.push("/404");
  }, []);

  return (
    <div className="relative h-screen">
      <Navbar />
      <div className="relative w-full flex items-center justify-center h-full text-xl flex-col">
        <div className="absolute top-0 left-0 w-full h-full bg-rhombus" />
        <h1 className="absolute px-5 py-10 text-[400px] font-bold font-galindo text-green-900/5">
          404
        </h1>
        <Image
          src="/assets/icons/sad-slime.png"
          width={300}
          height={300}
          alt="404"
          className="z-[200]"
        />
        <p className="text-center z-[200] font-bold text-xl">
          (Status 404: Page Not Found)
        </p>
        <p className="text-center z-[200] font-thin text-xl mb-10">
          We could not find the page you are looking for :(
        </p>
        <Link
          href="/"
          className="btn-animated w-96 my-1 py-4 bg-green-900/70 flex items-center justify-center"
        >
          <svg>
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
          <p className="text-white font-extrabold text-lg">Back to Home</p>
        </Link>
      </div>
    </div>
  );
}
