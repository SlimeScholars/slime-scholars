import Head from 'next/head'
import Nav from '../components/homepage/nav'

export default function Home({ user, setUser }) {

  const btn_tw = "px-10 py-4 rounded-lg bg-pink-500 hover:bg-pink-400 transition-all duration-150 text-white text-xl font-bold"

  return (
    <div className="w-screen flex flex-col">
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
        <header className="w-screen h-[calc(100vh_-_5rem)] flex flex-col items-center justify-center text-white"
        style={{
          backgroundImage:`url('/assets/backgrounds/forest-mountains.png')`,
          backgroundSize: "100vw auto"
        }}>
          <div className="p-[8.5rem] rounded-2xl bg-neutral-700/[0.75] flex flex-col items-center justify-center fade-in-bottom-index">
            <h1 className="font-bold text-2xl max-w-2xl text-center">
              Coming to App Store soon
            </h1>
            <h1 className="font-black text-6xl max-w-4xl text-center mt-2">
              Make Learning Exciting with Slime Scholars
            </h1>
            <h2 className="font-light text-3xl my-6 text-center max-w-4xl leading-relaxed text-gray-100">
              Slime Scholars is a project that motivates students to learn by making the process gratifying.
            </h2>
            {!user ?
              <button className={btn_tw} href="/signup">
              Sign up for free
              </button> :
              user.userType === 1 ?
                <button className={btn_tw} href="/play">
                  Continue your learning
                  </button> :
                <button className={btn_tw} href="/admin">
                  Edit lessons
                </button>
            }
            </div>
        </header>
      </main>
    </div>
  )
}
