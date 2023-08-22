import React, { useState } from "react";

export default function Modal({ preview, content }) {
	const [show, setShow] = useState(false);
	return show ? (
		<button
			className="w-screen h-screen fixed top-0 left-0 flex flex-col justify-center items-center z-10"
			onClick={() => setShow(false)}
		>
			<div className="p-8 text-lg bg-bg-light text-bg-completed rounded-2xl flex flex-col justify-center items-center font-galindo z-10 max-w-[30rem] shadow-2xl">
				{content}
			</div>
			<div className="fixed bottom-10 text-xl mt-10 text-bg-light font-galindo z-20">
				Click anywhere to exit
			</div>
		</button>
	) : (
		<button
			onClick={() => setShow(true)}
			className="shake duration-300 ease-in-out focus:outline-none active:outline-none after:outline-none"
		>
			{preview}
		</button>
	);
}
