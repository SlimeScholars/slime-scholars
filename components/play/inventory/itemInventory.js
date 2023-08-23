import { gameData } from '../../../data/gameData';

export default function ItemInventory({
    handleItemClick,
    itemOnClick,
    item,
    displayOnly
}) {

    const classNameDefault="w-20 h-20 border-solid border-8 border-white rounded-lg hover:border-white/75";
    const classNameClick="w-20 h-20 border-solid border-8 border-red-300 rounded-lg hover:border-white/75";
    const classNameDisplay="w-22 h-22 border-solid border-8 border-white rounded-lg";
    // for background
    if (item.isBg) {

        const itemName = item.itemName;
        const imgPath = '/assets/pfp/backgrounds/'+gameData.items[itemName].pfp;
        return (
            <div className={
                displayOnly=="true"? (classNameDisplay) : (
                    itemOnClick._id==item._id? (classNameClick):(classNameDefault)
                )
            } key={item._id}
                onClick={(e) => {
                    if (displayOnly !== "true") {
                        handleItemClick(item);
                    }
                }}>
                <img src={imgPath}></img>
            </div>
        )
    }
    // eggs
    else if (item.quantity) {

    }
}