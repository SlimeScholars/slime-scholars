import { useEffect, useState } from "react";
import "../styles/styles.css";
import axios from "axios";
import Spinner from "../components/spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { Navbar } from "../components/play/Navbar";
import Home from "../components/play/Home";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const modifiedPageProps = { ...pageProps, user, setUser, loading, setLoading }; // Include user in modifiedPageProps

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

  const router = useRouter()
  const [onPlay, setOnPlay] = useState(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (router.pathname.startsWith('/play')) {
      setOnPlay(router.pathname.startsWith('/play'))
      const paths = [
        'shopping',
        'friends',
        'slimes',
        'inventory',
      ]
      if (router.pathname.split('/').length === 2) {
        setCurrent(0)
        return
      }
      const path = router.pathname.split('/')[2]
      for (let i in paths) {
        if (paths[i] === path) {
          setCurrent(parseInt(i) + 1)
          return
        }
      }
    }
    else {
      setOnPlay(false)
      setCurrent(0)
    }
  }, [router.pathname])

  // Return loading on the component instead of home. This way, state variables don't get reset

  return (
    <>
      {loading ? <Spinner /> : <></>}
      <div className={`relative ${loading ? 'hidden' : ''}`}>
        <ToastContainer />
        {onPlay ? (
          <>
            {/* Each component is wrapped in a relative div to allow use to z-index*/}
            {/* Home page */}
            <div className={`relative h-0 ${current === 0 ? 'z-10' : '-z-10'}`}>
              <Home
                user={user}
                active={current === 0}
                setLoading={current === 0 ? setLoading : () => null}
                setUser={current === 0 ? setUser : () => null}
              />
            </div>

            {/* Navbar */}
            <div className={`relative h-0 z-20`}>
              <div className={`fixed inset-0 p-8`}>
                <Navbar user={user} current={current} />
              </div>
            </div>

            {/* Other pages */}
            <div className={`relative h-0`}>
              <div className={`fixed inset-0 p-8`}>
                {/* Margin for the navbar */}
                <div className="mt-[10rem]">
                  <Component {...modifiedPageProps} />
                </div>
              </div>
            </div>
          </>
        ) :
          <Component {...modifiedPageProps} />
        }
      </div >
    </>
  )
}

export default MyApp;
