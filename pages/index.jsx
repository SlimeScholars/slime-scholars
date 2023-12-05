import Head from "next/head";
import { MainTitle } from "../components/svg/titles";
import { useRouter } from "next/router";
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

export default function Home({ user, setUser }) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col">
      <Head>
        <title>Slime Scholars</title>
        <meta
          name="description"
          content="Slime Scholars: Making Learning Exciting"
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
        <div className="mt-6">
          <MainTitle props="w-[800px] h-auto" />
        </div>
        <h2 className="text-2xl text-white mt-6">Level up your learning</h2>
        <h2 className="text-2xl text-white mt-2 mb-2">Grade 4-12</h2>
        <a
          href="/signup/student"
          className="btn-animated w-96 my-1 py-4 bg-green-900/70 flex items-center justify-center"
        >
          <svg>
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
          <p className="text-white font-extrabold text-lg">
            Learners: Play now!
          </p>
        </a>
        <a
          href="/signup/student"
          className="btn-animated w-96 my-1 py-4 bg-green-900/50 flex items-center justify-center"
        >
          <svg>
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
          <p className="text-white font-extrabold text-lg">
            Teachers: Modernize your classroom!
          </p>
        </a>
        <a
          href="/signup/student"
          className="btn-animated w-96 my-1 py-4 bg-primary/30 flex items-center justify-center"
        >
          <svg>
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
          <p className="text-white font-extrabold text-lg">
            Parents: Unlock your child's potential!
          </p>
        </a>
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
