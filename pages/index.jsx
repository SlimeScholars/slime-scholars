import Head from "next/head";
import { MainTitle } from "../components/svg/titles";
import { useRouter } from "next/router";
import { gameData } from "../data/gameData";
import { useState, useRef, useEffect } from "react";
import { Image } from "antd";
import { AiOutlineSearch } from "react-icons/ai";

export default function Home({ user, setUser  }) {
  const router = useRouter();

  const userTypes = ["", "Student", "Parent", "Teacher", "Admin"]
  const userColors = ["#ffffff", "#e1eff0", "#e5e1f0", "#e1f0e3", "#f0e1ef"]
  const [open, setOpen] = useState(false);
  const dropdown = useRef(null);

  const options = [
    {
      label: "My Slimes",
      onClick: () => {
        router.push("/play");
      },
    },
    {
      label: "Learn",
      onClick: () => {
        router.push("/courses");
      },
    },
    {
      label: "Settings",
      onClick: () => {
        router.push("/settings");
      },
    },
    {
      label: "Logout",
      onClick: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("jwt");
        }
        setUser(null);
        router.push('/login')
      },
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        dropdown.current &&
        !dropdown.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("mouseup", handleClickOutside);
    return () => {
      window.removeEventListener("mouseup", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="w-screen flex flex-col">
      <Head>
        <title>Slime Scholars</title>
        <meta
          name="description"
          content="Slime Scholars: Making Learning Exciting"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen flex flex-col items-center justify-center flex-1">
        <header
          className="relative w-screen h-[100vh] flex flex-col items-center justify-center text-white"
          style={{
            backgroundImage: "url(/assets/backgrounds/pillar-space.png)",
            backgroundSize: "100vw auto"
          }}
        >
          {/* <Image src={"/assets/backgrounds/pillar-space.png"}
          className="absolute top-0 left-0 w-full h-auto"/> */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/[0.8]"/>
          {user && user.userType === 1 && 
          <div className="absolute top-0 left-0 m-9 flex flex-row items-center">
            <button
              className={`relative pr-16 pl-16 rounded-md hover:scale-[1.05] font-galindo 
              text-xl py-1 px-4 transition-transform duration-150 text-white`}
              onClick={(e) => {
                e.preventDefault();
                router.push("/courses");
              }}
            >
              <span className="relative z-[800]">Courses</span>
            </button>
            <div className="flex flex-row gap-2 items-center">
              <span className="text-neutral-500 text-3xl">
                <AiOutlineSearch/>
              </span>
              <input className="bg-black rounded-full w-[325px] py-2 px-6 border-2 border-neutral-600 focus:outline-none
              focus:bg-neutral-700 focus:border-transparent transition-colors duration-300 font-galindo text-neutral-300"
              placeholder="Search..."/>
            </div>
          </div>}
          <div className="absolute top-0 right-0 m-6">
          {user ? (
          <section className="flex flex-row gap-1 font-bold text-xl items-center text-white">
            <div className="flex flex-col gap-[-5px] justify-center items-end">
              <div className="text-[0.85em] font-light font-galindo">
                {user && user.username && user.username.trim().length > 0 ? 
                  <span>{user.username}</span> : 
                  user && user.firstName && user.lastName ? 
                  <span>{user.firstName}{" "}{user.lastName}</span>:
                  <span>[No Username]</span>}
              </div>
              <div className="text-[0.7em] mt-[-0.5em] font-light italic"
              style={{
                color: user ? userColors[user.userType] : userColors[0]
              }}
              >{user ? userTypes[user.userType] : userTypes[0]}</div>
            </div>
            <button
              onClick={() => {
                setOpen((prev) => !prev);
              }}
              style={{
                backgroundColor: "white",
                padding: "0.7rem",
              }}
              className={`hover:opacity-80 rounded-full p-3 overflow-hidden relative box-border 
                w-[5.6rem] h-[5.6rem] scale-[0.65]
                course-nav-icon transition-all duration-150`}
            >
              <div
                className="grid grid-rows-2 gap-[0.5rem]"
              >
                {user && user.pfpSlime ? (
                  <div className="relative flex items-center justify-center">
                    <div className="absolute h-32 w-32 overflow-hidden">
                      <Image
                        src={
                          "/assets/pfp/backgrounds/" +
                          gameData.items[user.pfpBg].pfp
                        }
                        preview={false}
                        alt={user.pfpBg}
                        className="absolute h-32 w-32"
                      />
                    </div>
                    <Image
                      src={
                        "/assets/pfp/slimes/" +
                        gameData.slimes[user.pfpSlime].pfp
                      }
                      alt={user.pfpSlime}
                      preview={false}
                      sizes="100vw"
                      className="relative z-10 translate-y-1/3 scale-150 w-[3.5rem] h-[3.5rem]"
                    />
                  </div>
                ) : (
                  <div className="relative flex items-center justify-center">
                    <div className="absolute h-32 w-32 overflow-hidden flex items-center justify-center">
                        <Image
                        src={"/assets/pfp/slimes/blue-slime.png"}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="absolute h-24 w-24">
                        </Image>
                    </div>
                </div>
                )}
              </div>
            </button>
            <div
              className={`flex flex-col absolute bg-black z-[500] top-[5rem] right-[2rem] rounded-none transition-all duration-100 
                                 origin-top ${
                                   open ? "scale-y-100" : "scale-y-0"
                                 } drop-shadow font-normal`}
              ref={dropdown}
            >
              {options.map((item) => (
                <button
                  key={item.label}
                  className="text-gray-400 hover:bg-neutral-800 px-8 py-2 w-full h-full transition-all duration-150 text-md font-bold"
                >
                  <span onClick={item.onClick}>{item.label}</span>
                </button>
              ))}
            </div>
          </section>
        ) : (
          <section className="hidden lg:flex lg:z-10 p-2 pr-5 gap-4">
            <button
              className="px-5 py-2 rounded-lg transition-all duration-150 text-white text-[1.35em] font-galindo hover-highlight hover:scale-[1.08]"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </button>
          </section>
        )}
          </div>
          <div className="p-[8.5rem] rounded-2xl flex flex-col items-center justify-center fade-in-bottom-index z-[200]">
            <h1 className="font-bold text-2xl max-w-2xl text-center">
              Coming to App Store soon
            </h1>
            <div className="mt-6">
              <MainTitle props="w-[800px] h-auto"/>
            </div>
            {/* <h1 className="font-black text-6xl max-w-4xl text-center mt-2">
              Make Learning Exciting with Slime Scholars
            </h1> */}
            <h2 className="font-light text-3xl my-6 text-center max-w-4xl leading-relaxed text-gray-100">
              Slime Scholars is a project that aims to enhance the learning
              experience for students through an interactive and fun
              environment.
            </h2>
            <button className="px-8 py-3 rounded-lg transition-all duration-300 text-white text-[1.35em] border-2 border-white/[0.3] font-bold hover-highlight hover:scale-[1.02]"
            onClick={() => {
              router.push(!user ? "/signup" : 
              user.userType === 4 ? 
              "/admin" : 
              user.userType === 3 ?
              "/classrooms" : 
              "/play")
            }}>
                {!user? 
                "Create your free account" :
                user.userType === 4 ? 
                "Edit lessons" : 
                user.userType === 3 ?
                "View classroom":
                "Continue your learning"}
            </button>
          </div>
        </header>
      </main>
    </div>
  );
}
