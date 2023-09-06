import React, { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import SearchInventory from "../../components/play/inventory/searchInventory";
import ItemList from "../../components/play/inventory/itemList";
import ItemDetails from "../../components/play/inventory/itemDetails";
import { gameData } from "../../data/gameData";
import Image from "next/image";

export default function Inventory({ loading, user, setUser, setNumEggs, setFlowers, items, setItems, colorPalette, setColorPalette, pfpBg, setPfpBg }) {
	const router = useRouter();
	const [itemOnClick, setItemOnClick] = useState("empty for now");

	// item.itemName => "Forest Mountains"
	// bg => "forest-mountains.png"

	useEffect(() => {
		if (loading) {
			return;
		}
		if (!user || user.userType !== 1) {
			router.push("/");
			return
		}
	}, [user, loading]);

	const [searchContent, setSearchContent] = useState("");
	useEffect(() => {
		if (user && user.items) {
			const searchItem = user.items.filter((item) => {
				return item.itemName
					.toLowerCase()
					.includes(searchContent.toLowerCase());
			});
			setItems(searchItem);
		}
	}, [searchContent]);

	return (
		<div
			className="home"
		>
			<div className="items-center justify-between h-full">
				{/*  Inventory bar */}
				<div
					style={{
						backgroundColor:
							colorPalette === undefined ? "" : `${colorPalette.white}88`,
						color: colorPalette === undefined ? "" : colorPalette.text1,
					}}
					className="flex flex-row rounded-lg items-center py-2 pl-6 pr-10"
				>
					<div className="grow-0 pl-4">
						<Image
							src="/assets/icons/inventory.png"
							alt='inventory'
							height={0}
							width={0}
							sizes='100vw'
							className="w-[4.5rem] h-[4.5rem]"
						/>
					</div>
					<h2 className="grow pl-4 font-galindo text-2xl">Inventory</h2>
					<div className="grow-0 flex pr-4">
						<div
							style={{
								border:
									colorPalette === undefined
										? ""
										: `3px solid ${colorPalette.primary1}`,
								color: colorPalette === undefined ? "" : colorPalette.text1,
								backgroundColor:
									colorPalette === undefined ? "" : `${colorPalette.white}88`,
							}}
							className="rounded-md flex flex-row py-1 px-3 text-lg"
						>
							<input
								type="text"
								placeholder={"Search for an item"}
								className="p-1 grow bg-transparent font-galindo ml-2 w-[14rem] focus:outline-0"
								onChange={(e) => setSearchContent(e.target.value)}
							></input>
							<button className="h-full flex p-1 cursor-default">
								<span className="material-symbols-outlined">Search</span>
							</button>
						</div>
					</div>
				</div>

				{/* Default: inventory lists and item details */}
				<div
					className="pt-9 flex flex-row gap-8 items-start font-galindo home"
				>
					{/* Inventory List */}
					<div
						className="basis-1/2 rounded-lg"
					>
						<ItemList
							items={items}
							itemOnClick={itemOnClick}
							setItemOnClick={setItemOnClick}
							colorPalette={colorPalette}
						/>
					</div>

					{/* Item details */}
					<div className="basis-1/2 rounded-lg">
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
		</div >
	);
}
