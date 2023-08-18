import { toast } from "react-toastify";
import { FaExclamationCircle } from "react-icons/fa";

export const showToastMessage = (text, success) => {
	if (success) {
		toast.success(text, {
			position: toast.POSITION.BOTTOM_RIGHT,
			autoClose: 5000,
			style: {
				backgroundColor: "#689e5790",
				fontFamily: "Galindo",
				color: "#FEF8FF",
				letterSpacing: "0.5px",
				lineHeight: "1.4",
				paddingLeft: "1rem",
				paddingRight: "1rem",
				paddingTop: "0.5rem",
				paddingBottom: "0.5rem",
			},
			className: "text-sm",
		});
		return;
	}

	toast.error(text, {
		position: toast.POSITION.BOTTOM_RIGHT,
		autoClose: 5000,
		style: {
			backgroundColor: "#FF787888",
			fontFamily: "Galindo",
			color: "#FEF8FF",
			letterSpacing: "0.5px",
			lineHeight: "1.4",
			paddingLeft: "1rem",
			paddingRight: "1rem",
			paddingTop: "0.5rem",
			paddingBottom: "0.5rem",
		},
		className: "text-sm",
		icon: <FaExclamationCircle className="text-4xl text-bg-light" />,
	});
};