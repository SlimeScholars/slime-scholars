import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "./Navbar";

export default function Play({ loading, user }) {
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || user.userType !== 1) {
      router.push("/");
    }
  }, [user, loading]);

  return (
    <div className="w-screen h-screen bg-cover bg-[url('/assets/backgrounds/bg-beach.png')]">
      <Navbar />
      {/* slimes */}
      <div className="flex flex-row space-x-56 h-100 w-100 absolute bottom-10 left-44 opacity-100 z-0">
        <div className="flex flex-col justify-center">
          <div className="bg-[#5A5A5A] opacity-60 h-5 w-28 pb-6 rounded-md ml-12 text-white text-center">
            <p>Lv. 9 | 90 &#169;</p>
          </div>
          <Image
            src="/assets/graphics/slimes/whale slime.png"
            width={200}
            height={200}
            alt="Cat slime"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="bg-[#5A5A5A] opacity-60 h-5 w-28 pb-6 rounded-md ml-12 text-white text-center">
            <p>Lv. 9 | 90 &#169;</p>
          </div>
          <Image
            src="/assets/graphics/slimes/whale slime.png"
            width={200}
            height={200}
            alt="Cat slime"
          />
        </div>
      </div>
      <div className="flex flex-row space-x-56 h-100 w-100 absolute bottom-24 right-44 opacity-100 z-0">
        <div className="flex flex-col justify-center">
          <div className="bg-[#5A5A5A] opacity-60 h-5 w-28 pb-6 rounded-md ml-12 text-white text-center">
            <p>Lv. 9 | 90 &#169;</p>
          </div>
          <Image
            src="/assets/graphics/slimes/whale slime.png"
            width={200}
            height={200}
            alt="Cat slime"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="bg-[#5A5A5A] opacity-60 h-5 w-28 pb-6 rounded-md ml-12 text-white text-center">
            <p>Lv. 9 | 90 &#169;</p>
          </div>
          <Image
            src="/assets/graphics/slimes/whale slime.png"
            width={200}
            height={200}
            alt="Cat slime"
          />
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <button onClick={() => console.log(user)}>
        Click me to see the information on user (open console to see the
        console.log)
      </button>
    </div>
  );
}
