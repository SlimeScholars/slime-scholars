import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SearchInventory from "../../components/play/inventory/searchInventory";
import { gameData } from "../../data/gameData";
import ItemList from "../../components/play/inventory/itemList";
import ItemDetails from "../../components/play/inventory/itemDetails";

export default function Shopping({ loading, user, pfpBg, setPfpBg, 
	colorPalette, setColorPalette, setUser }) {

	const [searchContent, setSearchContent] = useState("");
	const [itemOnClick, setItemOnClick] = useState("empty for now");
	const [ownedItems, setOwnedItems] = useState("empty");
	const router = useRouter();

	// Shopping has a different "items" list than other pages like inventory (All items in game data)
	const [gameItems, setGameItems] = useState();

	useEffect(() => {
		if (loading) {
			return;
		}
		if (!user || user.userType !== 1) {
			router.push("/");
		}

		if (user) {
			setOwnedItems(user.items);
		}

	}, [user, loading]);

	useEffect(() => {

		if (gameData && gameData.items) {
			const searchItem = Object.values(gameData.items).filter((item) => {
				return item.itemName
					.toLowerCase()
					.includes(searchContent.toLowerCase());
			});
			setGameItems(searchItem);
		}
		
	}, [searchContent]);

	return (
		<div className="home">

			{/* Shopping bar */}
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

			{/* Lists and details */}
			<div className="py-8 flex flex-row font-galindo w-full home h-full">
				{/* Shopping List */}
				<div className="pr-4 basis-1/2">{
					<ItemList
						gameItems={gameItems}
						items={ownedItems}
						itemOnClick={itemOnClick}
						setItemOnClick={setItemOnClick}
						shopping="true"
						user={user}
					></ItemList>
				}
				</div>

				{/* Item details */}
				<div className="basis-1/2 bg-white/50 rounded-lg">
					<ItemDetails
						item={itemOnClick}
						user={user}
						pfpBg={pfpBg}
						setPfpBg={setPfpBg}
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
