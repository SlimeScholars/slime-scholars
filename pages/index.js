import Head from 'next/head'
import Image from 'next/image'

import Nav from '../components/nav'

export default function Home() {
  return (
    <div className="w-screen flex flex-col">
      <Head>
        <title>Slime Scholars</title>
        <meta name="description" content="Lorem ipsum solor sit amet." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1">
        <Nav />
      </main>
    </div>
  )
}
