import Image from "next/image";
import { gameData } from "../../../data/gameData";

export default function ItemInventory({
    setItemOnClick,
    itemOnClick,
    item,
    displayOnly,
    owned,
    shopping,
    colorPalette,
}) {

    const classNameDefault = "rounded-2xl relative overflow-visible cursor-pointer"
    const classNameClick = "rounded-2xl relative overflow-visible cursor-pointer"
    const classNameDisplay = "rounded-2xl relative overflow-visible"

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
            }
                id={crypto.randomUUID()}
                onClick={(e) => {
                    if (displayOnly !== "true") {
                        setItemOnClick(item);
                    }
                }}
                style={{
                    border: colorPalette === undefined ? '' : `5px solid ${colorPalette.primary1}`,
                }}
            >
                <Image
                    src={imgPath}
                    alt={item.itemName}
                    height={0}
                    width={0}
                    sizes='100vw'
                    className="w-full h-auto rounded-[11px]"
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
                }}
                style={{
                    border: colorPalette === undefined ? '' : `5px solid ${colorPalette.primary1}`,
                }}
            >
                <Image
                    src={"/assets/items/" + gameData.items[item.itemName].icon}
                    alt={item.itemName}
                    height={0}
                    width={0}
                    sizes='100vw'
                    className="place-self-center p-4 w-full h-auto"
                />
                <div
                    className="absolute -bottom-2.5 inset-x-0 mx-auto rounded-full items-center mt-2 w-fit justify-center px-3"
                    style={{
                        backgroundColor:
                            colorPalette === undefined ? '' : `${colorPalette.primary1}`,
                        border:
                            colorPalette === undefined ? '' : `3px solid ${colorPalette.primary2}`,
                        color:
                            colorPalette === undefined ? '' : colorPalette.text2,
                    }}
                >
                    <p
                        className="text-sm text-center mt-1"
                    >
                        {item.quantity}
                    </p>
                </div>
            </div>
        )
    }
}
