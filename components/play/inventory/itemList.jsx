import ItemInventory from "./itemInventory";
import { gameData } from "../../../data/gameData";
import Image from "next/image";

export default function ItemList({ gameItems, items, itemOnClick, setItemOnClick, shopping, user, colorPalette, searchContent, scrollToTop}) {
  // Separate unowned and owned items
  const unownedItems = [];
  const ownedItems = [];

  if (shopping && gameItems) {
    Object.values(gameItems).forEach((item) => {
      if ((items.includes(item.itemName) || item.isBg === false) && item.itemName !== "Slime Egg") {
        ownedItems.push(item);
      } else {
        unownedItems.push(item);
      }
    });

    // Custom sorting function
    const customSort = (a, b) => {
      if (a.itemName === "Slime Egg" && b.itemName !== "Slime Egg") return -1;
      if (a.itemName !== "Slime Egg" && b.itemName === "Slime Egg") return 1;
      return a.itemName.localeCompare(b.itemName);
    };

    // Sort the arrays with custom sorting
    unownedItems.sort(customSort);
    ownedItems.sort(customSort);
  }

  return (
    <div className="w-full">
      <div
        className="rounded-lg grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-8 h-full w-full"
        style={{
          backgroundColor: !colorPalette ? "" : `${colorPalette.white}88`,
          color: !colorPalette ? "" : colorPalette.text1,
        }}
      >
        {items.length === 0 && (
          <p className="col-span-4">No items found by the name "{searchContent}"</p>
        )}

        {shopping ? (
          // Display sorted unowned items first, then sorted owned items
          [...unownedItems, ...ownedItems].map((item) => (
            <div key={item.itemName} className="relative">
              {/* Conditionally add the extra block for "Slime Egg" */}
              {item.itemName === "Slime Egg" && (
                <div
                  className=" flex absolute -bottom-2.5 inset-x-0 mx-auto rounded-full items-center mt-2 w-fit justify-center px-3 z-10"
                  style={{
                    backgroundColor:
                      colorPalette === undefined ? '' : `${colorPalette.primary1}`,
                    border:
                      colorPalette === undefined ? '' : `3px solid ${colorPalette.primary2}`,
                    color:
                      colorPalette === undefined ? '' : colorPalette.text2,
                  }}
                >
                  <Image
                  src="/assets/icons/flower.png"
                  alt="flowers"
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="2xl:h-[1.7rem] 2xl:w-[1.7rem] h-[1.4rem] w-[1.4rem] 2xl:ml-1 mr-2 -mt-0.5"
                />
                  <p className="text-sm text-center mt-1">{gameData.items["Slime Egg"].buyPrice}</p>
                </div>
              )}

              <ItemInventory
                setItemOnClick={setItemOnClick}
                item={item}
                itemOnClick={itemOnClick}
                owned={items.includes(item.itemName) || item.isBg === false}
                shopping={shopping}
                colorPalette={colorPalette}
                scrollToTop={scrollToTop}
              />
            </div>
          ))
        ) : (
          Array.isArray(items) ? (
            items.map((item, index) => (
              <ItemInventory
                key={`item-${index}`}
                setItemOnClick={setItemOnClick}
                item={item}
                itemOnClick={itemOnClick}
                colorPalette={colorPalette}
                scrollToTop={scrollToTop}
              />
            ))
          ) : (
            <p>No items in inventory.</p>
          )
        )}
      </div>
    </div>
  );
}
