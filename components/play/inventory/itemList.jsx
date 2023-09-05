import ItemInventory from "./itemInventory";
import gameData from "../../../data/gameData";

export default function ItemList({ items, itemOnClick, setItemOnClick, shopping, user }) {

  console.log(items);
  return (
    <div className="h-full w-full">
      <div className="bg-white/50 rounded-lg grid xl:grid-cols-5 gap-7 p-7 h-full overflow-y-auto">
        {shopping ? (
          <div>{Array.isArray(items)&&
            items.map(item => {
              // Put an array of owned items
              if (user.items.includes(item)) {
                return (
                  <ItemInventory
                    key={`item-${index}`}
                    setItemOnClick={setItemOnClick}
                    item={item}
                    itemOnClick={itemOnClick}
                    owned="true"
                  />
                );
              } else {
                return (
                  <ItemInventory
                    key={`item-${index}`}
                    setItemOnClick={setItemOnClick}
                    item={item}
                    itemOnClick={itemOnClick}
                  />
                );
              }
            })
            }</div>
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
