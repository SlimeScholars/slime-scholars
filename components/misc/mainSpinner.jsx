//import PuffLoader from "react-spinners/PuffLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

export default function MainSpinner() {
  return (
    <div className={`w-screen h-screen bg-black text-white 
		flex flex-col gap-8 items-center justify-center text-4xl pointer-events-none`}>
			<div className="flex flex-col gap-2 items-center justify-center font-galindo">
				<img src="/assets/misc/slime-loader.gif" className="mt-[-200px] w-[400px] h-[400px]"/>
				<div className="flex flex-row gap-2">
          Loading
					<div id="loading-wave">
						<span className="dot bg-white"></span>
						<span className="dot bg-white"></span>
						<span className="dot bg-white"></span>
					</div>
				</div>
			</div>
		</div>
  )
}
