import ItemInventory from './itemInventory';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { gameData } from '../../../data/gameData';
import { showToastError } from '../../../utils/toast';
import axios from 'axios';
import Image from 'next/image';

export default function ItemDetails({
	item,
	user,
	pfpBg,
	setPfpBg,
	setItems,
	setItemOnClick,
	setUser,
	setNumEggs,
	setFlowers,
	colorPalette,
	setColorPalette,
	shopping,
}) {

	console.log(user);
	const [owned, setOwned] = useState(null);

	// Check if item is purchase everytime itemOnClick changes
	useEffect(() => {
		if (user) {
			if (user.items.find(userItem => userItem.itemName === item.itemName)) {
				setOwned(true);
			} else {
				setOwned(false);
			}
		}
	}, [item, user])

	const router = useRouter();


	// for shopping page,only backgrounds would be displayed
	if (shopping) {

		return (
			<div className='w-full h-auto'>
				<div className="grid grid-cols-3 p-4 gap-4 h-full overflow-y-auto">
					<ItemInventory item={item} displayOnly="true" />
					{/* Item description */}
					<div className="col-span-2 bg-black/40 rounded-lg p-8">
						<p
							style={{ color: gameData.rarityColours[item.rarity].text }}
							className={`text-2xl font-thin`}
						>
							{item&&item.rarity}
						</p>
						<p className="text-white text-2xl font-bold">{item.itemName}</p>
						{item.description && (
							<p className="text-grey text-sm">{item.description}</p>
						)}
						<div className="flex flex-row items-center p-4">
							<img src="/assets/icons/slime-gel.png" className="w-6 h-6 m-2"></img>
							<p>{item.buyPrice}</p>
						</div>
					</div>
					{/* Change pfp comparison */}
					<div className="col-span-3 bg-black/40 rounded-lg p-6">
						<div className="flex flex-row w-full items-center flex-wrap">
							<div className="basis-1/5">
								<div className="flex flex-col items-center">
									{/* Display current profile picture */}
									<p>Current</p>
									<div className="relative rounded-full overflow-hidden  border-4 border-red-300">
										{
											<Image
												src={"/assets/pfp/backgrounds/" + gameData.items[user.pfpBg].bg}
												alt={pfpBg}
												height={0}
												width={0}
												sizes='100vw'
												className="absolute inset-0 w-full h-full"
											/>
										}
										<Image
											src={
												"/assets/pfp/slimes/" +
												gameData.slimeImgs[user.pfpSlime].pfp
											}
											alt={user.pfpSlime}
											height={0}
											width={0}
											sizes='100vw'
											className="relative z-10 translate-y-1/4 scale-125 w-[5.5rem] h-[5.5rem]"
										/>
									</div>
								</div>
							</div>
							<div className="basis-1/5">
								<span className="text-red-300 material-symbols-outlined scale-150 p-10">
									arrow_forward
								</span>
							</div>
							<div className="basis-1/5">
								<div className="flex flex-col items-center">
									<p>Updated</p>
									<div className="relative rounded-full overflow-hidden border-4 border-red-300">
										<Image
											src={
												"/assets/pfp/backgrounds/" +
												item.pfp
											}
											alt={item.itemName}
											height={0}
											width={0}
											sizes='100vw'
											className="absolute inset-0 w-full h-full"
										/>
										<Image
											src={
												"/assets/pfp/slimes/" +
												gameData.slimeImgs[user.pfpSlime].pfp
											}
											alt={user.pfpSlime}
											height={0}
											width={0}
											sizes='100vw'
											className="relative z-10 translate-y-1/4 scale-125 w-[5.5rem] h-[5.5rem]"
										/>
									</div>
								</div>
							</div>
							<div className="basis-2/5 p-4" dir="rtl">
								{owned? (
									<button className="rounded-s-lg p-4 bg-black/20" disabled>
										Purchased Already
									</button>
								) : (
									<button
										className="rounded-s-lg p-4 bg-red-300 hover:bg-red-300/75 h-full"
										onClick={(e) => {

											// Check if user has enough slime gels
											if (user) {
												if (user.slimeGel < item.buyPrice) {
													showToastError("You do not have enough slime gels.");
													return;
												}
											}
											axios
												.post(
													"/api/user/buy-item",
													{
														itemName: item.itemName,
														quantity: 1
													},
													{
														headers: {
															Authorization: `Bearer ${localStorage.getItem(
																"jwt"
															)}`,
														},
													}
												)
												.then((response) => {
													
													const newUser = { ...user, items: response.items, flowers:response.flowers }
													setUser(newUser)
													showToastError("Picture purchased successfully.", true);
												})
												.catch((error) => {
													showToastError(error.message);
												});
										}}
									>
										Purchase Picture
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	// for background
	if (item.isBg && gameData.items[item.itemName]) {
		return (
			<div className='h-full w-full'>
				<div className="grid grid-cols-3 p-4 gap-4 h-full overflow-y-auto">
					<ItemInventory item={item} displayOnly="true" />
					{/* Item description */}
					<div className="col-span-2 bg-black/40 rounded-lg p-8">
						<p
							className={`text-2xl font-thin`}
							style={{ color: gameData.rarityColours[item.rarity].text }}
						>
							{item.rarity}
						</p>
						<p className="text-white text-2xl font-bold">{item.itemName}</p>
						{item.description && (
							<p className="text-grey text-sm">{item.description}</p>
						)}
					</div>
					{/* Change pfp comparison */}
					<div className="col-span-3 bg-black/40 rounded-lg p-6">
						<div className="flex flex-row w-full items-center flex-wrap">
							<div className="basis-1/5">
								<div className="flex flex-col items-center">
									{/* Display current profile picture */}
									<p>Current</p>
									<div className="relative rounded-full overflow-hidden  border-4 border-red-300">
										{
											<Image
												src={"/assets/pfp/backgrounds/" + gameData.items[pfpBg].pfp}
												alt={pfpBg}
												height={0}
												width={0}
												sizes='100vw'
												className="absolute inset-0 w-full h-full"
											/>
										}
										<Image
											src={
												"/assets/pfp/slimes/" +
												gameData.slimeImgs[user.pfpSlime].pfp
											}
											alt={user.pfpSlime}
											height={0}
											width={0}
											sizes='100vw'
											className="relative z-10 translate-y-1/4 scale-125 w-[5.5rem] h-[5.5rem]"
										/>
									</div>
								</div>
							</div>
							<div className="basis-1/5">
								<span className="text-red-300 material-symbols-outlined scale-150 p-10">
									arrow_forward
								</span>
							</div>
							<div className="basis-1/5">
								<div className="flex flex-col items-center">
									<p>Updated</p>
									<div className="relative rounded-full overflow-hidden border-4 border-red-300">
										<Image
											src={
												"/assets/pfp/backgrounds/" +
												gameData.items[item.itemName].pfp
											}
											alt={item.itemName}
											height={0}
											width={0}
											sizes='100vw'
											className="absolute inset-0 w-full h-full"
										/>
										<Image
											src={
												"/assets/pfp/slimes/" +
												gameData.slimeImgs[user.pfpSlime].pfp
											}
											alt={user.pfpSlime}
											height={0}
											width={0}
											sizes='100vw'
											className="relative z-10 translate-y-1/4 scale-125 w-[5.5rem] h-[5.5rem]"
										/>
									</div>
								</div>
							</div>
							<div className="basis-2/5 p-4" dir="rtl">
								{pfpBg === item.itemName ? (
									<button className="rounded-s-lg p-4 bg-black/20" disabled>
										Equipped Already
									</button>
								) : (
									<button
										className="rounded-s-lg p-4 bg-red-300 hover:bg-red-300/75 h-full"
										onClick={(e) => {
											axios
												.put(
													"/api/user/change-pfp",
													{
														pfpBg: item.itemName,
														pfpSlime: user.pfpSlime,
													},
													{
														headers: {
															Authorization: `Bearer ${localStorage.getItem(
																"jwt"
															)}`,
														},
													}
												)
												.then((response) => {
													setPfpBg(item.itemName);
													const newUser = { ...user, pfpBg: item.itemName }
													setUser(newUser)
													showToastError("Profile background was changed.", true);
												})
												.catch((error) => {
													showToastError(error.message);
												});
										}}
									>
										Equip as Profile Background
									</button>
								)}
							</div>
						</div>
					</div>
					{/* Background */}
					<div className="bg-black/40 rounded-lg p-8 col-span-3">
						{gameData.items[item.itemName].bg === colorPalette.bg ? (
							<button className="text-black" disabled>
								Equipped as background
							</button>
						) : (
							<button
								className="text-red-300 hover:text-red-300/75 p-4"
								onClick={(e) => {
									axios
										.put(
											"/api/user/change-bg",
											{
												bg: item.itemName,
											},
											{
												headers: {
													Authorization: `Bearer ${localStorage.getItem("jwt")}`,
												},
											}
										)
										.then((response) => {
											setColorPalette(gameData.items[item.itemName]);
										})
										.catch((error) => {
											showToastError(error.message);
										});
								}}
							>
								Equip as background
							</button>
						)}
					</div>
				</div>

			</div>
		);
	}

	// for eggs
	if (gameData.items[item.itemName] && gameData.rarityColours[item.rarity].text) {
		const [sellItemsNum, setSellItemsNum] = useState(item.quantity);

		return (
			<div className="grid grid-cols-3 p-4 gap-4">
				<ItemInventory
					item={item}
					displayOnly="true"
				/>
				{/* Item description */}
				<div className="col-span-2 bg-black/40 rounded-lg p-8">
					<p
						className={`text-2xl font-thin`}
						style={{ color: gameData.rarityColours[item.rarity].text }}
					>
						{item.rarity}
					</p>
					<p className="text-white text-2xl font-bold">
						{item.itemName}
					</p>
					{
						item.description && (
							<p className="text-grey text-sm">{item.description}</p>
						)
					}
				</div>
				{/* Sell Item */}
				<div className="col-span-3 bg-black/40 rounded-lg p-6">
					<div className="flex flex-row w-full items-center">
						<div className="grow">Sell Item</div>
						<div className="shrink text-white px-1">
							Sell for:
						</div>
						{
							item.sellCurrency == 1 ? (
								<div className="text-orange-300 px-1">
									{item.sellPrice + " FL each"}
								</div>
							) : (
								<div className="text-orange-300 px-1">
									{item.sellPrice + " SG each"}
								</div>
							)
						}

					</div>
					<div className="flex flex-row w-full items-center p-2">
						<div className="shrink px-2">0</div>
						<div className="grow">
							<input
								type="range"
								min="0"
								max={item.quantity}
								step="1"
								className="w-full"
								value={sellItemsNum}
								onChange={(e) => {
									setSellItemsNum(e.target.value);
								}
								}
							/>
						</div>
						<div className="px-2">{sellItemsNum}</div>
					</div>
					<div className="flex flex-row flex-wrap">
						<div className="px-1 shrink">
							<input
								type="text"
								className="p-2 border-2 border-red-300 bg-white rounded-lg"
								value={sellItemsNum}
								onChange={(e) => {
									setSellItemsNum(e.target.value);
								}}
							></input>
						</div>
						<div className="px-1">
							<button
								className="whitespcace-no-wrap bg-red-300 hover:bg-red-300/75 rounded-lg p-2"
								onClick={(e) => {
									setSellItemsNum(item.quantity - 1);
								}}>
								All but 1
							</button>
						</div>
						<div className="shrink px-1">
							<button
								className="bg-red-300 hover:bg-red-300/75 rounded-lg p-2"
								onClick={(e) => {
									setSellItemsNum(item.quantity);
								}}>
								All
							</button>
						</div>
						{/* Sell button */}
						<div className="shrink px-1">
							<button
								className="bg-red-300 hover:bg-red-300/75 rounded-lg p-2"
								onClick={(e) => {

									const config = {
										headers: {
											Authorization: `Bearer ${localStorage.getItem('jwt')}`
										}
									}
									axios
										.post('/api/user/sell-item', {
											itemName: item.itemName,
											quantity: sellItemsNum
										}, config)
										.then(response => {

											// Inluding flowers, slimeGel, items

											// if all of the current item is sold, show details of the first item returned
											let numItemsLeft = 0;

											// Reset the current item to update the item quantity
											response.data.items.map(returnedItem => {
												if (returnedItem.itemName === item.itemName) {
													numItemsLeft = returnedItem.quantity;
													setItemOnClick(returnedItem);
												}
											});

											// Sync # flowers and eggs data with navbar
											setFlowers(response.data.flowers);
											if (item.itemName === "Slime Egg") {
												setNumEggs(numItemsLeft);
											}

											if (numItemsLeft === 0) {
												setItemOnClick(response.data.items[0]);
											}

											setItems(response.data.items);

											// Prompt message to gui
											showToastError((sellItemsNum === 1 ? ("Item sold") : ("Items sold")), true);

										})
										.catch(error => showToastError(error.message));
								}}>
								Sell
							</button>
						</div>
						{/* Flower or Gel icon */}
						<div className="shrink px-1">
							{
								item.sellCurrency === 1 ? (
									<Image
										src="/assets/icons/flower.png"
										alt="flowers"
										height={0}
										width={0}
										sizes='100vw'
										className="w-10 h-10 y-10 brightness-75"
									/>
								) : (
									<Image
										src="/assets/icons/slime-gel.png"
										alt='slime gel'
										height={0}
										width={0}
										sizes='100vw'
										className="w-10 h-10 y-10 brightness-75"
									/>
								)
							}
						</div>
						<div className="shrink p-3 text-center">
							<p>{sellItemsNum * item.sellPrice}</p>
						</div>
					</div>
				</div>
				{/* Open eggs */}
				<div className="col-span-3 bg-black/40 rounded-lg p-6">
					<p
						className="text-red-300 hover:text-red-300/75"
						onClick={(e) => {
							router.push("/play/roll");
						}}>
						Open Egg
					</p>
				</div>
			</div>
		);
	}
}
