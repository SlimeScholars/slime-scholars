
import Head from 'next/head'

// import Nav from '../backups/homepage/nav'

export default function Dashboard() {


  return (
    <div className="w-screen flex flex-col">
      <Head>
        <title>Slime Scholars</title>
        <meta name="description" content="Lorem ipsum solor sit amet." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen flex flex-col items-center justify-center flex-1">
        {/* <Nav /> */}
        <header className="w-screen h-screen flex flex-col items-center justify-center">
          DASHBOARD
        </header>
      </main>
    </div>
  )
}
