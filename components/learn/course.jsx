import { useRouter } from "next/router";
import Image from "next/image";

export default function Course({ courseId, courseName, courseBadge, tier, colorPalette }) {
	const router = useRouter()

	return (
		<button
			className={`course-bar-default course-grid base
			 w-[calc(32%_-_1rem)] m-3 h-[125px] items-center shadow-lg`}
			onClick={() => {
				router.push(`/courses/${courseId}/units`)
			}}
		>
			<div className="justify-self-center flex items-center justify-center border-2 rounded-full
			w-20 h-20"
			style={{
				backgroundColor: !colorPalette ? "" : colorPalette.primary2,
			}}>
				<Image
				src="/assets/slimes/slime-static/blue-slime.png"
				alt="blue slime"
				width={200}
				height={200}
				className="w-16 h-16"/>
			</div>
			<div className="text-start flex flex-col gap-2">
				<span className="text-xl font-bold">
					{courseName ? courseName : "[Untitled Course]"}
				</span>
				<span className="text-md font-normal">
					Progress: 0%
				</span>
				<div className="w-[90%] h-[0.5rem] bg-black/[0.4] rounded-full overflow-hidden">
					<div className={`${"w-[25%]"} h-[0.5rem] rounded-full transition-all duration-150 brightness-125`}
					style={{
						backgroundColor: !colorPalette ? "" : colorPalette.primary1,
					}}/>
				</div>
			</div>

		</button>
	);
}

