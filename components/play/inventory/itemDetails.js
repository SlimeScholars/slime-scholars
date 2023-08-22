import ItemInventory from './itemInventory';

export default function ItemDetails({ item }) {

    // for background
    if (item.isBg) {
        return (
            <div className="grid grid-cols-3 p-4 gap-2">
                <ItemInventory
                    item={item}
                    displayOnly="true"
                />
                {/* Item description */}
                <div className="col-span-2 bg-black/60 rounded-lg p-8">
                    <p className="text-yellow-300 text-2xl font-thin">
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
                {/* Change pfp */}
                <div className="col-span-3 bg-black/60 rounded-lg p-8">

                </div>
            </div>
        )
    } else {
        return ;
    }
}