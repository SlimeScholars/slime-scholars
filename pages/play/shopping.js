import { useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../../components/play/Navbar";

export default function Shopping({ loading, user }) {
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
      <div className="w-screen h-screen bg-cover bg-[url('/assets/backgrounds/bg-beach.png')] ">
        <div class="p-8 w-full h-full justify-center items-center backdrop-brightness-50">
          <Navbar current="1" className=""></Navbar>
        </div>
      </div>
    </div>
  );
}
