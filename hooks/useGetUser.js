import axios from 'axios';
import { useState, useEffect } from 'react';

export function useGetUser(token) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if(!token) {
        return
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      axios
        .get("/api/user", config)
        .then((response) => {
          if(response.data && response.data.user) {
            setUser(response.data.user)
          }
        })
        .catch((error) => {
          setUser(null)
          localStorage.removeItem('jwt')
        })
    }

    fetchData();
  }, [token]);

  return { user };
}