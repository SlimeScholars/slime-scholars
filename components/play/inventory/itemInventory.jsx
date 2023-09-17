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
    scrollToTop,
}) {


    const classNameDefault = "rounded-2xl relative overflow-visible cursor-pointer h-fit"
    const classNameClick = "rounded-2xl relative overflow-visible cursor-pointer h-fit"
    const classNameDisplay = "rounded-2xl relative h-fit"
    var gradientBg;

    if (gameData.rarityColours[item.rarity]) {
        gradientBg = gameData.rarityColours[item.rarity].bg;
    }

    // for shopping page
    if (shopping && owned) {
        const imgPath = item ? '/assets/pfp/backgrounds/' + item.pfp : "";

        if (item.isBg) {
            return (
                <div className={
                    displayOnly === "true" ? (classNameDisplay) : (
                        (itemOnClick && itemOnClick.itemName === item.itemName) ? (classNameClick) : (classNameDefault))
                }
                    id={crypto.randomUUID()}
                    onClick={(e) => {
                        if (displayOnly !== "true") {
                            scrollToTop()
                            setItemOnClick(item)
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
                        className="h-auto w-full rounded-[11px] grayscale"
                    />
                </div>
            )
        } else {
            // Eggs are set to owned (even if not)
            return (
                <div
                    className={
                        displayOnly === "true" ? (classNameDisplay + " " + gradientBg) : (
                            itemOnClick && itemOnClick.itemName === item.itemName ? (classNameClick + " " + gradientBg) : (classNameDefault + " " + gradientBg)
                        )
                    }
                    id={crypto.randomUUID()}
                    onClick={(e) => {
                        if (displayOnly !== "true") {
                            scrollToTop()
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
                </div >
            )
        }
    }

    // for background
    if (item.isBg) {

        const imgPath = item && gameData.items[item.itemName] ? '/assets/pfp/backgrounds/' + gameData.items[item.itemName].pfp : "";
        return (
            <div className={
                displayOnly === "true" ? (classNameDisplay) : (
                    (itemOnClick && itemOnClick.itemName === item.itemName) ? (classNameClick) : (classNameDefault))
            }
                id={crypto.randomUUID()}
                onClick={(e) => {
                    if (displayOnly !== "true") {
                        scrollToTop()
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
                        scrollToTop()
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
