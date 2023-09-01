import ItemInventory from "./itemInventory";

export default function ItemList({ items, itemOnClick, setItemOnClick }) {
  return (
    <div className="h-full w-full">
      <div className="bg-white/50 rounded-lg grid xl:grid-cols-5 gap-7 p-7 h-full overflow-y-auto">
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
    </div>
  );
}
