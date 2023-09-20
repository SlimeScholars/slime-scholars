import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Mobile({ isMobile, user }) {
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
        router.push('/admin/edit-course')
      }
    }
  }, [isMobile])
  return (
    <>
      LOL
    </>
  )
}