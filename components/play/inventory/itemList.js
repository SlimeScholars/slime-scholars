import ItemInventory from './itemInventory';

export default function ItemList({
    items,
    itemOnClick,
    setItemOnClick
}) 
{
    console.log(items);
    
    return (
        <div className="bg-white/75 rounded-lg pr-4 grid grid-rows-5 grid-flow-col gap-4 overflow-y-auto">
            {
                Array.isArray(items)? (
                    items.map((item) => {
                        <ItemInventory
                            itemName={item.itemName}
                            isBg={item.isBg}
                            quantity={item.quantity}
                            rarity={item.rarity}
                        />
                    })
                ): (
                    <p>No items in inventory.</p>
                )
            }
        </div>
    )
}