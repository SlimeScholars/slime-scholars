import { gameData } from '../../../data/gameData';

export default function Item({ item }) {

    // If is background
    if (item.isBg) {

        const itemName = item.itemName;
        const imgPath = '/assets/pfp/backgrounds/'+gameData.items[itemName].pfp;
        return (
            <div className="w-10 h-10 border-solid border-4 border-white">
                <img src={imgPath}></img>
            </div>
        )
    }
    return (
        <div className="w-10 h-10">
        </div>
    )
}