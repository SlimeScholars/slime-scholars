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
  var gradientBg;

  if (gameData.rarityColours[gameData.items[item.itemName].rarity]) {
    gradientBg =
      gameData.rarityColours[gameData.items[item.itemName].rarity].bg;
  }

  // for shopping page
  if (shopping && owned) {
    const imgPath = item
      ? "/assets/pfp/backgrounds/" + gameData.items[item.itemName].pfp
      : "";

    if (gameData.items[item.itemName].isBg) {
      return (
        <div
          className={
            "rounded-2xl relative h-fit " +
            (!displayOnly &&
              "hover:contrast-100 hover:brightness-110 hover:opacity-100 hover:m-1 transition-all duration-150 ease-out contrast-[90%] brightness-95 opacity-95 ") +
            (itemOnClick &&
              itemOnClick.itemName === item.itemName &&
              "overflow-visible cursor-pointer")
          }
          id={crypto.randomUUID()}
          onClick={(e) => {
            if (displayOnly !== "true") {
              scrollToTop();
              setItemOnClick(item);
            }
          }}
          style={{
            border:
              colorPalette === undefined
                ? ""
                : `5px solid ${colorPalette.primary1}`,
          }}
        >
          <Image
            src={imgPath}
            alt={item.itemName}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full rounded-[11px] grayscale"
          />
        </div>
      );
    } else {
      return (
        <div
          className={
            "rounded-2xl relative h-fit " +
            (!displayOnly &&
              "hover:contrast-100 hover:brightness-110 hover:opacity-100 hover:m-1 transition-all duration-150 ease-out contrast-[90%] brightness-95 opacity-95 ") +
            gradientBg +
            " " +
            (itemOnClick &&
              itemOnClick.itemName === item.itemName &&
              "overflow-visible cursor-pointer")
          }
          id={crypto.randomUUID()}
          onClick={(e) => {
            if (displayOnly !== "true") {
              scrollToTop();
              setItemOnClick(item);
            }
          }}
          style={{
            border:
              colorPalette === undefined
                ? ""
                : `5px solid ${colorPalette.primary1}`,
          }}
        >
          <Image
            src={"/assets/items/" + gameData.items[item.itemName].icon}
            alt={item.itemName}
            height={0}
            width={0}
            sizes="100vw"
            className="place-self-center p-4 w-full h-auto"
          />
        </div>
      );
    }
  }
  // for background in inventory
  if (gameData.items[item.itemName].isBg) {
    const imgPath =
      item && gameData.items[item.itemName]
        ? "/assets/pfp/backgrounds/" + gameData.items[item.itemName].pfp
        : "";
    return (
      <div
        className={
          "rounded-2xl relative h-fit " +
          (!displayOnly &&
            "hover:contrast-100 hover:brightness-110 hover:opacity-100 hover:m-1 transition-all duration-150 ease-out contrast-[90%] brightness-95 opacity-95 ") +
          gradientBg +
          " " +
          (itemOnClick &&
            itemOnClick.itemName === item.itemName &&
            "overflow-visible cursor-pointer")
        }
        id={crypto.randomUUID()}
        onClick={(e) => {
          if (displayOnly !== "true") {
            scrollToTop();
            setItemOnClick(item);
          }
        }}
        style={{
          border:
            colorPalette === undefined
              ? ""
              : `5px solid ${colorPalette.primary1}`,
        }}
      >
        <Image
          src={imgPath}
          alt={item.itemName}
          height={0}
          width={0}
          sizes="100vw"
          className="w-full h-auto rounded-[11px]"
        />
      </div>
    );
  }
  // eggs
  else {
    return (
      <div
        className={
          "rounded-2xl relative h-fit " +
          (!displayOnly &&
            "hover:contrast-100 hover:brightness-110 hover:opacity-100 hover:m-1 transition-all duration-150 ease-out contrast-[90%] brightness-95 opacity-95 ") +
          gradientBg +
          " " +
          (itemOnClick &&
            itemOnClick.itemName === item.itemName &&
            "overflow-visible cursor-pointer")
        }
        id={crypto.randomUUID()}
        onClick={(e) => {
          if (displayOnly !== "true") {
            scrollToTop();
            setItemOnClick(item);
          }
        }}
        style={{
          border:
            colorPalette === undefined
              ? ""
              : `5px solid ${colorPalette.primary1}`,
        }}
      >
        <Image
          src={"/assets/items/" + gameData.items[item.itemName].icon}
          alt={item.itemName}
          height={0}
          width={0}
          sizes="100vw"
          className="place-self-center p-4 w-full h-auto"
        />
        <div
          className="absolute -bottom-2.5 inset-x-0 mx-auto rounded-full items-center mt-2 w-fit justify-center px-3"
          style={{
            backgroundColor:
              colorPalette === undefined ? "" : `${colorPalette.primary1}`,
            border:
              colorPalette === undefined
                ? ""
                : `3px solid ${colorPalette.primary2}`,
            color: colorPalette === undefined ? "" : colorPalette.text2,
          }}
        >
          <p className="text-sm text-center mt-1">{item.quantity}</p>
        </div>
      </div>
    );
  }
}
