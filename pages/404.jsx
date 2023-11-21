import Image from "next/image"
import Link from "next/link"
import Navbar from '../components/main/navbar.jsx'

export default function NotFound({ user }) {
    return (
        <div className="h-[calc(100vh_-_5rem)]">
            <Navbar user={user} />
            <div className="w-full flex items-center justify-center h-full text-xl flex-col">
                <Image src="/assets/icons/sad-slime.png" width={300} height={300} alt="404" />
                <p>
                    We can not find the page you are looking for.
                </p>
                <p className="font-bold text-blue-600">
                    <Link href="/">Back to home</Link>
                </p>
            </div>

        </div>
    )
}