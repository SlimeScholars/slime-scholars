import Image from "next/image"
import Link from "next/link"
import Navbar from '../components/main/navbar.jsx'
import { useRouter } from "next/router.js"
import { useEffect } from "react"

export default function NotFound({ user }) {
    const router = useRouter()

    useEffect(() => {
        router.push('/404')
    }, [])

    return (
        <div className="relative h-[calc(100vh_-_5rem)]">
            <Navbar user={user} />
            <div className="relative w-full flex items-center justify-center h-full text-xl flex-col">
                <div className="absolute top-0 left-0 w-full h-full z-[100] bg-rhombus">
                    
                </div>
                <Image src="/assets/icons/sad-slime.png" width={300} height={300} alt="404" className="z-[200]" />
                <p className="text-center z-[200] font-semibold text-xl">
                    (Status 404: Page Not Found)
                    <br/>
                    We could not find the page you are looking for!
                </p>
                <p className="font-bold text-black hover:text-blue-700 mt-4 font-galindo text-2xl transition-colors
                z-[200]">
                    <Link href="/">Return to Home</Link>
                </p>
            </div>

        </div>
    )
}