import { useEffect, useState } from 'react'
import { useGetUser } from '../hooks/useGetUser'
import '../styles/styles.css'
import Spinner from '../components/spinner'

function MyApp({ Component, pageProps }) {
  const [jwt, setJwt] = useState(null)
  const [update, setUpdate] = useState(true)
  const { loading, user } = useGetUser(jwt)
  const modifiedPageProps = { ...pageProps, loading, setUpdate, user } // Include user in modifiedPageProps

  useEffect(() => {
    if (typeof window !== 'undefined' && update) {
      const storedJwt = localStorage.getItem('jwt')
      setJwt(storedJwt)
      setUpdate(false)
    }
  }, [update])

  if(loading) {
    return <Spinner />
  }
  else {
    return <Component {...modifiedPageProps} />
  }

}

export default MyApp