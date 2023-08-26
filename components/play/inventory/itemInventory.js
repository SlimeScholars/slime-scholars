import { gameData } from "../../../data/gameData";

export default function ItemInventory({
  setItemOnClick,
  itemOnClick,
  item,
  displayOnly,
}) {

    const classNameDefault="w-20 h-20 border-solid border-8 border-white rounded-lg hover:border-white/75 relative overflow-visible";
    const classNameClick="w-20 h-20 border-solid border-8 border-red-300 rounded-lg hover:border-white/75 relative overflow-visible";
    const classNameDisplay="w-22 h-22 border-solid border-8 border-white rounded-lg relative overflow-visible";
    var gradientBg;

    if (gameData.rarityColours[item.rarity]) {
        gradientBg=gameData.rarityColours[item.rarity].bg;
    }

    // for background
    if (item.isBg) {

        const itemName = item.itemName;
        const imgPath = '/assets/pfp/backgrounds/'+gameData.items[itemName].pfp;
        return (
            <div className={
                displayOnly==="true"? (classNameDisplay) : (
                    itemOnClick.itemName !== item.itemName? (classNameDefault):(classNameClick)
                )
            }   id={crypto.randomUUID()}
                onClick={(e) => {
                    if (displayOnly !== "true") {
                        setItemOnClick(item);
                    }
                }}>
                <img src={imgPath}></img>
            </div>
        )
    }
    // eggs
    else if (item.quantity) {
        return (
            <div 
                className={
                displayOnly==="true"? (classNameDisplay+" "+gradientBg) : (
                    itemOnClick.itemName===item.itemName? (classNameClick+" "+gradientBg):(classNameDefault+" "+gradientBg)
                )}   
                id={crypto.randomUUID()}
                onClick={(e) => {
                    if (displayOnly !== "true") {
                        setItemOnClick(item);
                    }
                }}>
                <div className="absolute inset-x-0 bottom-0 translate-y-4 px-2">
                    <div className="rounded-full w-15 h-5 bg-amber-50 text-sm border-2 border-amber-300 text-center">
                        { item.quantity }
                    </div>
                </div>
            </div>
        )
    }
}
