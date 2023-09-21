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

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [axiosLoading, setAxiosLoading] = useState(false); // Used for axios loading
  const [user, setUser] = useState(null);
  const [initUser, setInitUser] = useState(null);
  const [numEggs, setNumEggs] = useState(0);
  const [flowers, setFlowers] = useState(null);
  const [items, setItems] = useState([]);
  const [colorPalette, setColorPalette] = useState({});
  const [pfpBg, setPfpBg] = useState(null);

  const [rewardsData, setRewardsData] = useState(null)
  const [rewardsModalOpen, setRewardsModalOpen] = useState(false)

  const [isMobile, setIsMobile] = useState(false);
  const [mobileDevice, setMobileDevice] = useState(false)
  const isClient = typeof window === 'object';
  const mobileSize = { width: 900 }

  const router = useRouter();
  const [onPlay, setOnPlay] = useState(false);
  const [current, setCurrent] = useState(0);

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
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setMobileDevice(true)
    }
    if (isClient) {
      // Add event listener on component mount
      window.addEventListener('resize', updateWindowSize);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', updateWindowSize);
      };
    }
  }, [isClient]); // Re-run the effect if isClient changes

  useEffect(() => {
    if (windowSize.width < mobileSize.width || mobileDevice) {
      setIsMobile(true)
      router.push("/mobile");
    }
    else {
      setIsMobile(false)
    }
  }, [windowSize, mobileDevice])

  const refetchUserNonLoad = async () => {
    try {
      const token = localStorage.getItem('jwt')
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get("/api/user", config)
        .then((response) => {
          if (response.data && response.data.user) {
            setUser(response.data.user)
          }
        })
        .catch((err) => {
          console.log(err)
          // If the json web token is invalid, remove it so no more requests will be made with the same token
          localStorage.removeItem("jwt");
          setUser(null);
        });
    }
    catch (err) {
      console.log(err)
    }
  }

  const refetchUser = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('jwt')
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get("/api/user", config)
        .then((response) => {
          if (response.data && response.data.user) {
            setUser(response.data.user);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err)
          // If the json web token is invalid, remove it so no more requests will be made with the same token
          localStorage.removeItem("jwt");
          setUser(null);
          setLoading(false);
        });
    }
    catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const modifiedPageProps = {
    ...pageProps,
    user,
    setUser,
    loading,
    setLoading,
    axiosLoading,
    setAxiosLoading,
    setNumEggs,
    setFlowers,
    items,
    setItems,
    colorPalette,
    setColorPalette,
    pfpBg,
    setPfpBg,
    refetchUser,
    isMobile,
  }; // Include user in modifiedPageProps

  useEffect(() => {
    if (typeof window !== "undefined") {
      refetchUser()
    }
  }, []);

  useEffect(() => {
    if (user && user.screen_display_notif && user.screen_display_notif.intervals > 0) {
      setInitUser({ ...user })
      setRewardsModalOpen(true)
      setRewardsData(user.screen_display_notif)
    }
  }, [user])

  useEffect(() => {
    if (isMobile) {
      return
    }

    const paths = ["shopping", "friends", "slimes", "inventory", "roll"];
    if (router.pathname.startsWith("/play") && (router.pathname.split('/').length < 3 || paths.includes(router.pathname.split("/")[2]))) {
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

  useEffect(() => {
    if (user && user.pfpBg) {
      setPfpBg(user.pfpBg);
    }

    if (user && user.bg && gameData.items[user.bg].bg) {
      setColorPalette(gameData.items[user.bg]);
    }
  }, [user])

  return (
    <>
      {loading ? <MainSpinner /> : <></>}
      <div className={`relative ${loading ? "hidden" : ""}`}>
        <ToastContainer />
        {onPlay && !isMobile ? (
          <>
            {/* Each component is wrapped in a relative div to allow use to z-index*/}
            {/* Home page */}
            <div className={`relative h-0 ${current === 0 ? "z-10" : "-z-10"}`}>
              <Home
                user={user}
                active={current === 0}
                setLoading={current === 0 ? setLoading : () => null}
                setUser={current === 0 ? setUser : () => null}
                colorPalette={colorPalette}
                setColorPalette={setColorPalette}
                refetchUser={refetchUser}
              />
            </div>

            {/* Other play pages */}
            <div className={`relative h-0`}>
              <div className={`absolute inset-0 py-10 px-20 h-screen overflow-y-scroll`}>
                <div className="h-full relative">
                  <div className="z-20 mb-10">
                    <Navbar
                      user={user}
                      current={current}
                      numEggs={numEggs}
                      setNumEggs={setNumEggs}
                      flowers={flowers}
                      colorPalette={colorPalette}
                      setColorPalette={setColorPalette}
                    />
                  </div>
                  <Component {...modifiedPageProps} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <Component {...modifiedPageProps} />
        )}
        {!isMobile && rewardsModalOpen && <SlimeGelPopup user={initUser} details={rewardsData} close={() =>
          setRewardsModalOpen(false)
        } />}
      </div>
    </>
  );
}

export default MyApp;
