import { useEffect, useState } from "react";
import "../styles/styles.css";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [roster, setRoster] = useState();
  const modifiedPageProps = { ...pageProps, user, setUser, setLoading }; // Include user in modifiedPageProps

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
            fetchRoster(token);
          } else {
            setLoading(false);
          }
        }
      })
      .catch(() => {
        // If the json web token is invalid, remove it so no more requests will be made with the same token
        localStorage.removeItem("jwt");
        setUser(null);
        setLoading(false);
      });
  };

  const fetchRoster = (token) => {
    // Set the authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("/api/slime", config)
      .then((response) => {
        if (response.data && response.data.roster) {
          setRoster(response.data.roster);
          console.log(response.data.roster);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("jwt");
      fetchUser(token);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        <PuffLoader
          color={"#F649DA"}
          loading={true}
          css={override}
          size={150}
        />
        <h1 className="text-5xl font-black text-primary mt-10 phase">
          Loading...
        </h1>
      </div>
    );
  }

  return <Component {...modifiedPageProps} />;
}

export default MyApp;
