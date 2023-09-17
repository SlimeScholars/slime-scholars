import ItemInventory from "./itemInventory";

export default function ItemList({ gameItems, items, itemOnClick, setItemOnClick, shopping, user, colorPalette, searchContent, scrollToTop }) {

  return (
    <div className="w-full"
    >
      <div
        className="rounded-lg grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-8 h-full w-full"
        style={{
          backgroundColor:
            !colorPalette ? "" : `${colorPalette.white}88`,
          color: !colorPalette ? "" : colorPalette.text1,
        }}
      >
        {items.length === 0 && (
          <p className="col-span-4">No items found by the name "{searchContent}"</p>
        )}
        {shopping ? (
          gameItems && (
            Object.values(gameItems).map(item => {
              // Put an array of owned items
              if (items.includes(item.itemName) || item.isBg === false) {
                return (
                  <ItemInventory
                    key={item.itemName}
                    setItemOnClick={setItemOnClick}
                    item={item}
                    itemOnClick={itemOnClick}
                    owned="true"
                    shopping={shopping}
                    colorPalette={colorPalette}
                    scrollToTop={scrollToTop}
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
                    scrollToTop={scrollToTop}
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
                  scrollToTop={scrollToTop}
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
