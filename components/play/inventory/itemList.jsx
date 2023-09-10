import ItemInventory from "./itemInventory";
import gameData from "../../../data/gameData";
import { Fragment, useEffect } from "react";

export default function ItemList({ gameItems, items, itemOnClick, setItemOnClick, shopping, user, colorPalette }) {

  return (
    <div className="w-full"
    >
      <div
        className="rounded-lg grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-8 h-full w-full"
        style={{
          backgroundColor:
            colorPalette === undefined ? "" : `${colorPalette.white}88`,
          color: colorPalette === undefined ? "" : colorPalette.text1,
        }}
      >
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
                    colorPalette={colorPalette}
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
                    colorPalette={colorPalette}
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
                  colorPalette={colorPalette}
                />
              )
            })
          ) : (
            <p>No items in inventory.</p>
          )
        )}
      </div>
    </div>
  );
}
