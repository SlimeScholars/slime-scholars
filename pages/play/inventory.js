import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchInventory from "../../components/play/inventory/searchInventory";
import ItemList from "../../components/play/inventory/itemList";
import ItemDetails from "../../components/play/inventory/itemDetails";
import { gameData } from "../../data/gameData";

export default function Backpack({ loading, user, setUser, setNumEggs, setFlowers, items, setItems, colorPalette, setColorPalette }) {
	const router = useRouter();
	const [itemOnClick, setItemOnClick] = useState("empty for now");

	// item.itemName => "Forest Mountains"
	// bg => "forest-mountains.png"
	const [pfpBg, setPfpBg] = useState("empty for now");

	useEffect(() => {
		if (loading) {
			return;
		}
		if (!user || user.userType !== 1) {
			router.push("/");
		} 
		
		if (user) {
			// Set the items for displaying in inventory to user's items
			setItems(user.items);

			setPfpBg(user.pfpBg);
		}
	}, [user, loading]);

	// Run only once after initial render
	useEffect(() => {
		if (user && user.bg && gameData.items[user.bg].bg) {
			setColorPalette(gameData.items[user.bg]);
		} 
	}, [])

	const handleNavHome = (event) => {
		if (event.target.classList.contains("home")) {
			router.push("/play");
		}
	};

	const [searchContent, setSearchContent] = useState("");
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
				{/*  Inventory bar */}
				<div className="flex flex-row bg-white/50 rounded-lg items-center">
					<div className="grow-0 pl-4">
						<img
							src="/assets/icons/inventory.png"
							className="p-4 h-20 w-20"
						></img>
					</div>
					<div className="grow pl-4 font-galindo text-xl">Inventory</div>
					<div className="shrink pr-6">
						{/* Search Bar */}
						{/* Handle Submit Function */}
						<SearchInventory
							searchContent={searchContent}
							setSearchContent={setSearchContent}
						/>
					</div>
				</div>

				{/* Default: inventory lists and item details */}
				<div
					className="py-8 flex flex-row font-galindo w-full home"
					onClick={handleNavHome}
				>
					{/* Inventory List */}
					<div className="pr-4 basis-4/7">
						<ItemList
							items={items}
							itemOnClick={itemOnClick}
							setItemOnClick={setItemOnClick}
						/>
					</div>

					{/* Item details */}
					<div className="basis-3/7 bg-white/50 rounded-lg">
						<ItemDetails
							item={itemOnClick}
							user={user}
							pfpBg={pfpBg}
							setPfpBg={setPfpBg}
							setItems={setItems}
							setItemOnClick={setItemOnClick}
							setUser={setUser}
							setNumEggs={setNumEggs}
							setFlowers={setFlowers}
							colorPalette={colorPalette}
							setColorPalette={setColorPalette}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
