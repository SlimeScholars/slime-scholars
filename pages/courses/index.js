import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Home({ user, loading, }) {
	const router = useRouter()

	useEffect(() => {
		if (loading) {
			return
		}
		if (!user || user.userType !== 1) {
			router.push('/')
		}
	}, [user, loading])

	return (
		<div>lol

		</div>
	)
}

