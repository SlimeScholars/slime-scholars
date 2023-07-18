import { useEffect, useState } from 'react'
import '../styles/styles.css'
import axios from 'axios'
import Spinner from '../components/spinner/spinner'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const modifiedPageProps = { ...pageProps, user, setUser } // Include user in modifiedPageProps

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwt')

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
          .catch(() => {
            localStorage.removeItem('jwt')
            setUser(null)
            setLoading(false)
          })
      }

      fetchData()
    }
  }, [])

  if(loading) {
    return <Spinner />
  }

  return <Component {...modifiedPageProps} />
}

export default MyApp