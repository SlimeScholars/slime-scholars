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
        <div className="bg-white/75 rounded-lg pr-4 grid grid-cols-8 grid-flow-col gap-4 overflow-y-auto p-4">
            {
                Array.isArray(items)? (
                    items.map((item, index) => {

                        return (
                            <ItemInventory
                            handleItemClick={handleItemClick}
                            item={item}
                            itemOnClick={itemOnClick}
                            key={item._id}
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