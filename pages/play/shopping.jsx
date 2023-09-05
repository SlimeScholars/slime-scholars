import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SearchInventory from "../../components/play/inventory/searchInventory";
import { Navbar } from "../../components/play/Navbar";
import { gameData } from "../../data/gameData";
import Home from "../../components/play/Home";
import ItemList from "../../components/play/inventory/itemList";
import ItemDetails from "../../components/play/inventory/itemDetails";
import Image from "next/image";

export default function Shopping({ loading, user, items, setItems, pfpBg, setPfpBg, colorPalette, setColorPalette, setUser }) {

	const [searchContent, setSearchContent] = useState("");
	const [itemOnClick, setItemOnClick] = useState("empty for now");
	const router = useRouter();

	useEffect(() => {
		if (loading) {
			return;
		}
		if (!user || user.userType !== 1) {
			router.push("/");
		}
	}, [user, loading]);

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
		<div className="home">

			{/* Shopping bar */}
			<div className="items-center justify-between">
				<div className="flex flex-row bg-white/50 rounded-lg items-center">
					<div className="grow-0 pl-4">
						<Image
							src="/assets/icons/shopping.png"
							alt='shopping'
							height={0}
							width={0}
							sizes='100vw'
							className="p-4 h-20 w-20"
						/>
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

			{/* Lists and details */}
			<div className="py-8 flex flex-row font-galindo w-full home h-full">
				{/* Shopping List */}
				<div className="pr-4 basis-1/2">
					<ItemList
						items={Array.isArray(items) ? items : gameData.items}
						itemOnClick={itemOnClick}
						setItemOnClick={setItemOnClick}
						shopping="true"
						user={user}
					></ItemList>
				</div>

				{/* Item details */}
				<div className="basis-1/2 bg-white/50 rounded-lg">
					<ItemDetails
						item={itemOnClick}
						user={user}
						pfpBg={pfpBg}
						setPfpBg={setPfpBg}
						setItems={setItems}
						setItemOnClick={setItemOnClick}
						setUser={setUser}
						colorPalette={colorPalette}
						setColorPalette={setColorPalette}
						shopping="true"
					/>
				</div>
			</div>
		</div>
	);
}
