import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Play({ loading, user }) {
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
		<div>
			<button
				onClick={() => console.log(user)}
			>
				Click me to see the information on user (open console to see the console.log)
			</button>
		</div>
	)
}
