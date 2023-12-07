import Head from "next/head";
import { MainTitle } from "../components/svg/titles";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import ProfilePicture from "../components/main/profilePicture";
import useLogout from "../hooks/useLogout";
import Navbar from "../components/main/navbar";
import Testinomials from "../components/main/testimonial";
import Mission from "../components/main/mission";
import Details from "../components/main/details";
import Banner from "../components/main/banner";
import Contact from "../components/main/contact";
import Footer from "../components/main/footer";
import { useWindowSize } from "@uidotdev/usehooks";

export default function Home({ user, setUser }) {
  const router = useRouter();
  const [screenType, setScreenType] = useState(3); // 0 = xs, 1 = sm, 2 = md, 3 = lg, 4 = xl, 5 = 2xl
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (width < 640 && screenType !== 0) {
      setScreenType(0);
    } else if (width >= 640 && width < 768 && screenType !== 1) {
      setScreenType(1);
    } else if (width >= 768 && width < 1024 && screenType !== 2) {
      setScreenType(2);
    } else if (width >= 1024 && width < 1280 && screenType !== 3) {
      setScreenType(3);
    } else if (width >= 1280 && width < 1536 && screenType !== 4) {
      setScreenType(4);
    } else if (width >= 1536 && screenType !== 5) {
      setScreenType(5);
    }
  }, [width]);

  console.log(screenType);

  return (
    <div className="w-full flex flex-col">
      <Head>
        <title>Slime Scholars | Level Up Your Learning (Grade 4-12)</title>
        <meta
          name="description"
          content="Collect adorable slimes while learning from lessons designed to help maximize success in our modern world. Slime Scholars is a gamified learning platform for students, teachers, and parents."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} setUser={setUser} />
      <header
        className="w-full h-screen flex flex-col items-center justify-center pt-20"
        style={{
          backgroundImage: "url('/assets/backgrounds/hero.png')",
          backgroundSize: "cover",
        }}
      >
        <h1 className="hidden">Slime Scholars</h1> {/* for SEO */}
        <div className="mt-6" data-aos="fade-up">
          <MainTitle
            props={`h-auto w-[${
              screenType === 0
                ? 250
                : screenType === 1
                ? 400
                : screenType < 4
                ? 500
                : 800
            }px]`}
          />
        </div>
        <h2
          className="text-lg md:text-xl lg:text-2xl text-white mt-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Level up your learning today.
        </h2>
        <h2
          className="text-lg md:text-xl lg:text-2xl text-white mt-2 mb-2"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Grade 4-12
        </h2>
        <Link
          href="/signup/student"
          className="btn-animated w-4/5 sm:w-1/2 lg:w-1/3 my-1 py-4 bg-green-700/70 flex items-center justify-center"
          data-aos="fade-right"
          data-aos-delay="600"
        >
          <svg>
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
          <p className="text-white text-center font-extrabold text-base md:text-lg px-3">
            Learners: Play now!
          </p>
        </Link>
        <Link
          href="/signup/student"
          className="btn-animated w-4/5 sm:w-1/2 lg:w-1/3 my-1 py-4 bg-green-600/50 flex items-center justify-center"
          data-aos="fade-left"
          data-aos-delay="800"
        >
          <svg>
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
          <p className="text-white text-center font-extrabold text-base md:text-lg px-3">
            Teachers: Modernize your classroom!
          </p>
        </Link>
        <Link
          href="/signup/student"
          className="btn-animated w-4/5 sm:w-1/2 lg:w-1/3 my-1 py-4 bg-green-500/30 flex items-center justify-center"
          data-aos="fade-right"
          data-aos-delay="1000"
        >
          <svg>
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
          <p className="text-white text-center font-extrabold text-base md:text-lg px-3">
            Parents: Unlock your child's potential!
          </p>
        </Link>
      </header>
      <main className="w-full flex flex-col overflow-x-hidden items-center justify-center bg-bg-light">
        <Testinomials />
        <Mission />
        <Details />
        <Banner />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
