import ItemInventory from "./itemInventory";

export default function ItemList({ gameItems, items, itemOnClick, setItemOnClick, shopping, user }) {

  return (
    <div className="h-full w-full">
      <div className="bg-white/50 rounded-lg grid xl:grid-cols-5 gap-7 p-7 h-full overflow-y-auto">
        {(shopping&&shopping==="true") ? (
          Array.isArray(gameItems)?
            (gameItems.map((item, index) => {
              // Compare with owned items
              if (user&& user.items.includes(item)) {
                console.log("Owned")
                return (
                  <ItemInventory
                    key={item.itemName}
                    setItemOnClick={setItemOnClick}
                    item={item}
                    itemOnClick={itemOnClick}
                    owned="true"
                    shopping={shopping}
                  />
                );
              } else {
                return (
                  <ItemInventory
                    key={`item-${index}`}
                    setItemOnClick={setItemOnClick}
                    item={item}
                    itemOnClick={itemOnClick}
                    shopping={shopping}
                  />
                );
              }
            })) : (<p>No items in shop.</p>)
        ) : (
          <div>{
            Array.isArray(items) ? (
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
        )
        }
      </div>
    </div>
  );
}
