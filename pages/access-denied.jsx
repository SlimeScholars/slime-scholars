import Image from "next/image"
import Link from "next/link"
import Navbar from '../components/main/navbar.jsx'
import { useRouter } from "next/router.js"

export default function AccessDenied({ user }) {
    const router = useRouter()

    return (
        <div className="relative h-[calc(100vh_-_5rem)]">
            <Navbar user={user} />
            <div className="relative w-full flex items-center justify-center h-full text-xl flex-col">
                <div className="absolute top-0 left-0 w-full h-full z-[100] bg-rhombus">
                    
                </div>
                <p className="absolute top-8 left-8 font-bold text-black hover:text-blue-700 font-galindo text-2xl transition-colors
                z-[200]"
                onClick={() => {router.back()}}>
                    <a>Back</a>
                </p>
                <Image src="/assets/icons/sad-slime.png" width={300} height={300} alt="404" className="z-[200]" />
                <p className="text-center z-[200] font-semibold text-xl">
                    (Status 401: Unauthorized)
                    <br/>
                    You do not have permission to view this page!
                </p>
                <p className="font-bold text-black hover:text-blue-700 mt-4 font-galindo text-2xl transition-colors
                z-[200]">
                    <Link href="/">Return to Home</Link>
                </p>
            </div>

        </div>
    )
}