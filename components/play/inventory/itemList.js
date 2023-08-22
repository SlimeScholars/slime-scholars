import ItemInventory from './itemInventory';

export default function ItemList({
    items,
    itemOnClick,
    setItemOnClick
}) 
{

    function handleItemClick(item) {
        setItemOnClick(item);
    }
    return (
        <div className="bg-white/75 rounded-lg pr-4 grid grid-rows-5 grid-flow-col gap-4 overflow-y-auto p-4">
            {
                Array.isArray(items)? (
                    items.map((item) => {

                        return (
                            <ItemInventory
                            handleItemClick={handleItemClick}
                            item={item}
                            itemOnClick={itemOnClick}
                            />
                        )
                        
                    })
                ): (
                    <p>No items in inventory.</p>
                )
            }
        </div>
    )
}