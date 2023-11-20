import { useEffect, useState } from "react";
import { gameData } from "../data/gameData";
import "../styles/styles.css";
import axios from "axios";
import MainSpinner from "../components/misc/mainSpinner";
//import AxiosSpinner from "../components/misc/axiosSpinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { Navbar } from "../components/play/Navbar";
import Home from "../components/play/Home";
import SlimeGelPopup from "../components/play/slimes/SlimeGelPopup";
import CourseLayout from "../components/learn/courseLayout";
import useCurrentUser from "../hooks/useCurrentUser";

axios.defaults.headers.common["apikey"] = process.env.NEXT_PUBLIC_API_KEY;
axios.defaults.headers.post["apikey"] = process.env.NEXT_PUBLIC_API_KEY;

axios.interceptors.request.use(
  (request) => {
    // Edit request config
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // Edit response config
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const [rewardsData, setRewardsData] = useState(null);
  const [rewardsModalOpen, setRewardsModalOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [mobileDevice, setMobileDevice] = useState(false);
  const isClient = typeof window === "object";
  const mobileSize = { width: 900 };

  const router = useRouter();
  const [onPlay, setOnPlay] = useState(false);
  const [current, setCurrent] = useState(0);

  const [panelsVisible, setPanelsVisible] = useState(false)

  const [audio, setAudio] = useState(null);

  const {user, setUser} = useCurrentUser()

  const [windowSize, setWindowSize] = useState(
    isClient
      ? {
        width: window.innerWidth,
        height: window.innerHeight,
      }
      : { width: 10000, height: 10000 } // Provide default values for server-side rendering
  );

  // Step 4: Create a function to update the state variable with window size
  const updateWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  // Step 5: Use the useEffect hook to add a resize event listener
  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setMobileDevice(true);
    }
    if (isClient) {
      // Add event listener on component mount
      window.addEventListener("resize", updateWindowSize);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener("resize", updateWindowSize);
      };
    }
  }, [isClient]); // Re-run the effect if isClient changes

  useEffect(() => {
    if (windowSize.width < mobileSize.width || mobileDevice) {
      setIsMobile(true);
      router.push("/mobile");
    } else {
      setIsMobile(false);
    }
  }, [windowSize, mobileDevice]);

  // music
  useEffect(() => {
    if (user?.colorPalette) {
      if (gameData.items[user.colorPalette].track) {
        const track = new Audio(
          "/assets/audio/tracks/" + gameData.items[user.colorPalette] + ".mp3"
        );
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
        if (gameData.items[user.colorPalette] === gameData.items[user.bg].track) {
          track.currentTime = 0;
          track.muted = true;
          track.onended = () => {
            track.currentTime = 0;
            let delay = setTimeout(function () {
              track.play();
              clearTimeout(delay);
            }, 15000);
          };
          setAudio(track);
        }
      } else {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
          setAudio(null);
        }
      }
    }
  }, [user?.colorPalette]);

  useEffect(() => {
    if (audio) {
      audio.pause;
      audio.currentTime = 0;
      audio.muted = false;
      audio.play();
    }
  }, [audio]);

  useEffect(() => {
    console.log(loading)
  }, [loading])

  const modifiedPageProps = {
    ...pageProps,
    user,
    setUser,
    loading,
    setLoading,
    items,
    setItems,
    colorPalette:gameData.items[user?.bg],
    isMobile,
    panelsVisible,
    setPanelsVisible
  }; // Include user in modifiedPageProps

  useEffect(() => {
    if (typeof window !== "undefined") {
      ;
    }
  }, []);

  useEffect(() => {
    if (
      user &&
      user.screen_display_notif &&
      user.screen_display_notif.intervals > 0
    ) {
      setInitUser({ ...user });
      setRewardsModalOpen(true);
      setRewardsData(user.screen_display_notif);
    }
    if(user){
      setTimeout(() => {setLoading(false)}, 150)
    }
  }, [user]);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    const paths = ["shopping", "friends", "slimes", "inventory", "roll"];
    if (
      router.pathname.startsWith("/play") &&
      (router.pathname.split("/").length < 3 ||
        paths.includes(router.pathname.split("/")[2]))
    ) {
      setOnPlay(router.pathname.startsWith("/play"));
      if (router.pathname.split("/").length === 2) {
        setCurrent(0);
        return;
      }
      const path = router.pathname.split("/")[2];
      for (let i in paths) {
        if (paths[i] === path) {
          setCurrent(parseInt(i) + 1);
          return;
        }
      }
    } else {
      setOnPlay(false);
      setCurrent(0);
    }
  }, [router.pathname]);

  if (router.asPath.startsWith("/courses")) {
    return (
      <>
        {loading ? <div className="relative w-screen h-screen"><MainSpinner/></div> : <></>}
        <div className={`relative ${loading ? "hidden" : ""}`}>
          <ToastContainer />
          <CourseLayout
            colorPalette={gameData.items[user?.bg]}
            setUser={setUser}
            user={user}
          >
            <Component {...modifiedPageProps} />
          </CourseLayout>
        </div>
      </>
    );
  }

  return (
    <>
      {loading ? <div className="relative w-screen h-screen"><MainSpinner/></div> : <></>}
      <div className={`relative ${loading ? "hidden" : ""}`} id="body">
        <ToastContainer />

        {onPlay && !isMobile ? (
          <>
            <div className={`relative h-0 ${current === 0 ? "z-10" : "-z-10"}`}>
              <Home
                user={user}
                active={current === 0}
                setLoading={setLoading}
                setUser={current === 0 ? setUser : () => null}
                colorPalette={gameData.items[user?.bg]}
              />
            </div>

            <div className={`relative h-0`}>
              <div
                className={`absolute inset-0 py-10 px-20 h-screen overflow-y-scroll`}
              >
                <div className="h-full relative">
                  <div className="z-20 mb-10">
                    <Navbar {...modifiedPageProps} />
                  </div>
                  <Component {...modifiedPageProps} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <Component {...modifiedPageProps} />
        )}
        {!isMobile && rewardsModalOpen && ( 
          <SlimeGelPopup
            user={initUser}
            details={rewardsData}
            close={() => setRewardsModalOpen(false)}
          />
        )}
      </div>
    </>
  );
}

export default MyApp;
