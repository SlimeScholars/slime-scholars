import Head from 'next/head'
import Image from 'next/image'

import Nav from '../components/homepage/nav'
import Button from '../components/homepage/button'

export default function Home() {
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
          <h1 className="font-black text-7xl max-w-4xl text-center">
            Lorem ipsum dolor sit amet.
          </h1>
          <h2 className="font-light text-3xl my-6 text-center max-w-4xl leading-relaxed text-gray-600">
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </h2>
          <Button text="Sign up for free" style="Primary" onClick="/signup" />
        </header>
      </main>
    </div>
  )
}
