import { useRouter } from "next/router"
import { useEffect } from "react"
import Head from 'next/head'
import Nav from '../components/homepage/nav'
import Button from '../components/homepage/button'

export default function Mobile({ isMobile, user, setUser}) {
  const router = useRouter()

  useEffect(() => {
    if (!isMobile) {
      if (!user) {
        router.push('/login')
      }
      else if (user && user.userType === 1) {
        router.push('/play')
      }
      else if (user && user.userType === 4) {
        router.push('/admin/edit-subject')
      }
    }
  }, [isMobile])
  return (
    <>
      <div className="min-w-screen flex flex-col mt-5 overflow-hidden">
      <Head>
        <title>Slime Scholars</title>
        <meta name="description" content="Make Learning Exiting with Slime Scholars" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen flex flex-col items-center justify-center flex-1">
        <Nav
          user={user}
          setUser={setUser}
        />
        <header className="w-screen h-screen flex flex-col items-center justify-center">
          <h1 className="font-black text-6xl max-w-4xl text-center mt-2">
            Make Learning Exciting with Slime Scholars
          </h1>
          <h2 className="font-light text-3xl my-6 text-center max-w-4xl leading-relaxed text-gray-600">
            Slime Scholars is a project that motivates students to learn by making the process gratifying.
          </h2>
          <h2 className="font-galindo text-4xl">
            Coming to <span className="text-pink-500">appstore</span> soon!
          </h2>
        </header>
      </main>
    </div>
    </>
  )
}