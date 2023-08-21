import { useEffect, useState } from "react";
import "../styles/styles.css";
import axios from "axios";
import Spinner from "../components/spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // Return loading on the component instead of home. This way, state variables don't get reset

  return (
    <>
      {loading ? <Spinner /> : <></>}
      <div className={loading ? 'hidden' : ''}>
        <ToastContainer />
        <Component {...modifiedPageProps} />
      </div>
    </>
  )
}

export default MyApp;
