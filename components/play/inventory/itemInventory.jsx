import Image from "next/image";
import { gameData } from "../../../data/gameData";

export default function ItemInventory({
    setItemOnClick,
    itemOnClick,
    item,
    displayOnly,
    owned,
    shopping,
}) {

    const classNameDefault = "border-solid border-8 border-white rounded-lg hover:border-white/75 relative overflow-visible";
    const classNameClick = "border-solid border-8 border-red-300 rounded-lg hover:border-white/75 relative overflow-visible";
    const classNameDisplay = "border-solid border-8 border-white rounded-lg relative overflow-visible";

    const classNameDefaultOwned = "border-solid border-8 border-slate-300 rounded-lg hover:border-white/75 relative overflow-visible";
    const classNameClickOwned = "border-solid border-8 border-slate-700 rounded-lg hover:border-white/75 relative overflow-visible";
    var gradientBg;

    if (gameData.rarityColours[item.rarity]) {
        gradientBg = gameData.rarityColours[item.rarity].bg;
    }

    // for shopping page
    if (shopping && owned) {
        const imgPath = item ? '/assets/pfp/backgrounds/' + item.pfp : "";

        console.log(item);
        if (item.isBg) {
            return (
                <div className={
                    displayOnly === "true" ? (classNameDisplay) : (
                        (itemOnClick && itemOnClick.itemName === item.itemName) ? (classNameClickOwned) : (classNameDefaultOwned))
                } id={crypto.randomUUID()}
                    onClick={(e) => {
                        if (displayOnly !== "true") {
                            setItemOnClick(item);
                        }
                    }}>
                    <Image
                        src={imgPath}
                        alt={item.itemName}
                        height={0}
                        width={0}
                        sizes='100vw'
                        className="h-auto w-full"
                    />
                </div>
            )
        }
    }

    // for background
    if (item.isBg && item.itemName) {

        const imgPath = item ? '/assets/pfp/backgrounds/' + gameData.items[item.itemName].pfp : "";
        return (
            <div className={
                displayOnly === "true" ? (classNameDisplay) : (
                    (itemOnClick && itemOnClick.itemName === item.itemName) ? (classNameClick) : (classNameDefault))
            } id={crypto.randomUUID()}
                onClick={(e) => {
                    if (displayOnly !== "true") {
                        setItemOnClick(item);
                    }
                }}>
                <Image
                    src={imgPath}
                    alt={item.itemName}
                    height={0}
                    width={0}
                    sizes='100vw'
                    className="w-full h-auto"
                />
            </div>
        )
    }
    // eggs
    else if (item.quantity) {
        return (
            <div
                className={
                    displayOnly === "true" ? ((owned ? (classNameDisplayOwned) : (classNameDisplay)) + " " + gradientBg) : (
                        itemOnClick.itemName === item.itemName ? (classNameClick + " " + gradientBg) : (classNameDefault + " " + gradientBg)
                    )}
                id={crypto.randomUUID()}
                onClick={(e) => {
                    if (displayOnly !== "true") {
                        setItemOnClick(item);
                    }
                }}>
                <Image
                    src={"/assets/items/" + gameData.items[item.itemName].icon}
                    alt={item.itemName}
                    height={0}
                    width={0}
                    sizes='100vw'
                    className="place-self-center p-4 w-full h-auto"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-4 px-2">
                    <div className="rounded-full w-15 h-5 bg-amber-50 text-sm border-2 border-amber-300 text-center">
                        {item.quantity}
                    </div>
                </div>
            </div>
        )
    }
}
