import ItemInventory from "./itemInventory";
import gameData from "../../../data/gameData";
import { Fragment, useEffect } from "react";

export default function ItemList({ gameItems, items, itemOnClick, setItemOnClick, shopping, user }) {

  return (
    <div className="h-full w-full">
      <div className="bg-white/50 rounded-lg grid xl:grid-cols-5 gap-7 p-7 h-full overflow-y-auto">
        {shopping ? (
            gameItems && (
              Object.values(gameItems).map(item => {
                // Put an array of owned items
                if (items.includes(item.itemName)) {
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
                      key={item.itemName}
                      setItemOnClick={setItemOnClick}
                      item={item}
                      itemOnClick={itemOnClick}
                      shopping={shopping}
                    />
                  );
                }
              }))
        ) : (
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
            )
        )}
      </div>
    </div>
  );
}
