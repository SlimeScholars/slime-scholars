
import Head from 'next/head'

import Nav from '../components/homepage/nav'

import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Dashboard({loading, user}) {
  const router = useRouter()
  useEffect(() => {
    // If the user is already signed in
    if(!loading && !user) {
      router.push('/signup')
    }
  }, [loading, user])

  return (
    <div className="w-screen flex flex-col">
      <Head>
        <title>Slime Scholars</title>
        <meta name="description" content="Lorem ipsum solor sit amet." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen flex flex-col items-center justify-center flex-1">
        <Nav />
        <header className="w-screen h-screen flex flex-col items-center justify-center">
          DASHBOARD
        </header>
      </main>
    </div>
  )
}
