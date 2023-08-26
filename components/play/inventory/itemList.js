import ItemInventory from "./itemInventory";

export default function ItemList({ items, itemOnClick, setItemOnClick }) {
  return (
    <div className="bg-white/50 rounded-lg pr-4 grid grid-cols-8 grid-flow-col gap-4 overflow-y-auto p-4">
      {Array.isArray(items) ? (
        items.map((item, index) => {
          return (
            <ItemInventory
              key={`item-${index}`}
              setItemOnClick={setItemOnClick}
              item={item}
              itemOnClick={itemOnClick}
            />
          );
        })
      ) : (
        <p>No items in inventory.</p>
      )}
    </div>
  );
}
