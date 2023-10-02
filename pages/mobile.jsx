import { useRouter } from "next/router"
import { useEffect } from "react"
import Head from 'next/head'
import Nav from '../components/homepage/nav'

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
        router.push('/')
      }
    }
  }, [isMobile])
  return (
    <>
      <div className="min-w-screen flex flex-col overflow-hidden">
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
        <header className="min-w-screen min-h-screen flex flex-col items-center justify-center content-center">
          <div className="mr-[3rem] ml-[3rem] overflow-hidden">
            <h1 className="font-black text-5xl max-w-4xl text-center ">
              Make Learning Exciting with Slime Scholars
            </h1>
            <h2 className="font-light text-3xl my-6 text-center max-w-4xl leading-relaxed text-gray-600">
              Slime Scholars is a project that motivates students to learn by making the process gratifying.
            </h2>
            <h2 className="font-galindo text-4xl text-center">
              Coming to <span className="text-pink-500">appstore</span> soon!
            </h2>
          </div>
        </header>
      </main>
    </div>
    </>
  )
}