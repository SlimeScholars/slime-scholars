import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import SearchInventory from "../../components/play/inventory/searchInventory";
import { gameData } from "../../data/gameData";
import ItemList from "../../components/play/inventory/itemList";
import ItemDetails from "../../components/play/inventory/itemDetails";
import Image from "next/image";

export default function Shopping({ loading, user, pfpBg, setPfpBg,
	colorPalette, setColorPalette, setUser, refetchUser }) {

	const [searchContent, setSearchContent] = useState("");
	const [itemOnClick, setItemOnClick] = useState(null);
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

		if (user && user.items) {

			// Set items up so that it only includes item names
			const newList = user.items.map(item => {
				return item.itemName;
			})
			setOwnedItems(newList);
		}

		if (gameData && gameData.items) {
			setGameItems(gameData.items)
		}

		if (itemOnClick === null && gameData) {
			setItemOnClick(gameData.items[0]);
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
	
	const pageRef = useRef(null)

	const scrollToTop = () => {
		if (pageRef && pageRef.current) {
		  pageRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	  };

	return (
		<div className="" ref={pageRef}>
			{/* Shopping bar */}
			<div className="items-center justify-between h-full">
				<div className="flex flex-row rounded-lg items-center py-2 pl-6 pr-10"
					style={{
						backgroundColor:
							!colorPalette ? "" : `${colorPalette.white}88`,
						color: !colorPalette ? "" : colorPalette.text1,
					}}>
					<div className="grow-0 pl-4">
						<Image
							src="/assets/icons/shopping.png"
							alt='shopping'
							height={0}
							width={0}
							sizes='100vw'
							className="w-[4.5rem] h-[4.5rem]"
						/>
					</div>
					<h2 className="grow pl-4 font-galindo text-2xl">Shopping</h2>
					<div className="grow-0 flex pr-4">
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
			<div className="pt-9 flex flex-row gap-8 items-start font-galindo">
				{/* Shopping List */}
				<div className="rounded-lg mb-10 basis-1/2">{
					<ItemList
						gameItems={gameItems}
						items={ownedItems}
						itemOnClick={itemOnClick}
						setItemOnClick={setItemOnClick}
						shopping="true"
						user={user}
						colorPalette={colorPalette}
						scrollToTop={scrollToTop}
					/>
				}
				</div>

				{/* Item details */}
				<div className="basis-1/2 rounded-lg mb-10">
					{itemOnClick && (
						<ItemDetails
							item={itemOnClick}
							user={user}
							pfpBg={pfpBg}
							setPfpBg={setPfpBg}
							setUser={setUser}
							colorPalette={colorPalette}
							setColorPalette={setColorPalette}
							shopping="true"
							refetchUser={refetchUser}
						/>
					)
					}
				</div>
			</div>
		</div>
	);
}
