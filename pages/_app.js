import { useEffect, useState } from 'react'
import { useGetUser } from '../hooks/useGetUser'
import '../styles/styles.css'

function MyApp({ Component, pageProps }) {
  const [jwt, setJwt] = useState(null)
  const { user } = useGetUser(jwt)
  const modifiedPageProps = { ...pageProps, counter: 1, user } // Include user in modifiedPageProps

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedJwt = localStorage.getItem('jwt')
      setJwt(storedJwt)
    }
  }, [])

  return <Component {...modifiedPageProps} />
}

export default MyApp