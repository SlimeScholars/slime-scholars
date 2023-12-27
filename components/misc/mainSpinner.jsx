//import PuffLoader from "react-spinners/PuffLoader";

export default function MainSpinner({ bgStyle = {
	backgroundColor: "black",
	color: "white"
}, dotStyle = {
	backgroundColor: "white"
}, text = "Loading" }) {
	return (
		<div className={`w-full h-full flex flex-col gap-8 items-center justify-center text-4xl pointer-events-none`}
			style={bgStyle}>
			<div className="flex flex-col gap-2 items-center justify-center font-galindo">
				<img src="/assets/misc/slime-loader.gif" className="mt-[-200px] w-[400px] h-[400px]" />
				<div className="flex flex-row gap-2">
					{text}
					<div id="loading-wave">
						<span className="dot" style={dotStyle}></span>
						<span className="dot" style={dotStyle}></span>
						<span className="dot" style={dotStyle}></span>
					</div>
				</div>
			</div>
		</div>
	)
}
