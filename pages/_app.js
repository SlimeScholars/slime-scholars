import { useEffect, useState } from "react";
import "../styles/styles.css";
import axios from "axios";
import Spinner from "../components/misc/spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { Navbar } from "../components/play/Navbar";
import Home from "../components/play/Home";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false); // Used for axios loading
  const [user, setUser] = useState(null);
  const [numEggs, setNumEggs] = useState(0);
  const [flowers, setFlowers] = useState(null);
  const [items, setItems] = useState("empty for now");
  const [colorPalette, setColorPalette] = useState({});

  const modifiedPageProps = {
    ...pageProps,
    user,
    setUser,
    loading,
    setLoading,
    loading2,
    setLoading2,
    setNumEggs,
    setFlowers,
    items,
    setItems,
    colorPalette,
    setColorPalette,
  }; // Include user in modifiedPageProps

  const fetchUser = async (token) => {
    // If no token, no need to make a request for authentication
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    // Set the authorization header
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
          if (response.data.user.userType === 1) {
          }
          setLoading(false);
        }
      })
      .catch(() => {
        // If the json web token is invalid, remove it so no more requests will be made with the same token
        localStorage.removeItem("jwt");
        setUser(null);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("jwt");
      fetchUser(token);
    }
  }, []);

  const router = useRouter();
  const [onPlay, setOnPlay] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (router.pathname.startsWith("/play")) {
      setOnPlay(router.pathname.startsWith("/play"));
      const paths = ["shopping", "friends", "slimes", "inventory", "roll"];
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

  // navigate back home when clicking empty space above navbar
  const handleNavHome = (event) => {
    if (event.target.classList.contains("home")) {
      router.push("/play");
    }
  };

  // Return loading on the component instead of home. This way, state variables don't get reset

  return (
    <>
      {loading || loading2 ? <Spinner /> : <></>}
      <div className={`relative ${loading || loading2 ? "hidden" : ""}`}>
        <ToastContainer />
        {onPlay ? (
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
              />
            </div>

            {/* Navbar */}
            <div className={`relative h-0 z-10`}>
              <div
                className={`absolute inset-0 home`}
                onClick={handleNavHome}
              ></div>
            </div>

            {/* Other pages */}
            <div className={`relative h-0`}>
              <div className={`absolute inset-0 py-10 px-20 h-screen`}>
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
      </div>
    </>
  );
}

export default MyApp;
