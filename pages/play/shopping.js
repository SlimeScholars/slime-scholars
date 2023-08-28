import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SearchInventory from "../../components/play/inventory/searchInventory";
import { Navbar } from "../../components/play/Navbar";
import { gameData } from "../../data/gameData";
import Home from "../../components/play/Home";

export default function Shopping({ loading, user, items, setItems }) {

	const [searchContent, setSearchContent] = useState("");
	const router = useRouter();

	useEffect(() => {
		if (loading) {
			return;
		}
		if (!user || user.userType !== 1) {
			router.push("/");
		}
	}, [user, loading]);

	const handleNavHome = (event) => {
		if (event.target.classList.contains("home")) {
			router.push("/play");
		}
	};

	useEffect(() => {
		if (user) {
			const searchItem = user.items.filter((item) => {
				return item.itemName
					.toLowerCase()
					.includes(searchContent.toLowerCase());
			});
			setItems(searchItem);
		}
	}, [searchContent]);

	return (
		<div className="pt-5 home" onClick={handleNavHome}>
			<div className="items-center justify-between">
				<div className="flex flex-row bg-white/50 rounded-lg items-center">
					<div className="grow-0 pl-4">
						<img src="/assets/icons/shopping.png" className="p-4 h-20 w-20">
						</img>
					</div>
					<div className="grow pl-4 font-galindo text-xl">Shopping</div>
					<div className="shrink pr-6">
						{/* Search Bar */}
						{/* Handle Submit Function */}
						<SearchInventory
							searchContent={searchContent}
							setSearchContent={setSearchContent}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
