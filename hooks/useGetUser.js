import axios from 'axios';
import { useState, useEffect } from 'react';

export function useGetUser(token) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if(!token) {
        setUser(null)
        setLoading(false)
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
          setLoading(false)
        })
        .catch((error) => {
          localStorage.removeItem('jwt')
          setUser(null)
          setLoading(false)
        })
    }

    fetchData();
  }, [token]);

  return { loading, user };
}