import Item from './item';

export default function ItemList({
    items,
    itemOnClick,
    setItemOnClick
}) 
{
    return (
        <div className="bg-white/75 rounded-lg pr-4 grid grid-rows-5 grid-flow-col gap-4 overflow-y-auto">
            {
                Array.isArray(items)? (
                    items.map((item) => {
                        <Item
                            item={item}
                        />
                    })
                ): (
                    <p>No items in inventory.</p>
                )
            }
        </div>
    )
}