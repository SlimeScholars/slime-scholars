import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../../components/play/Navbar";
import SearchInventory from "../../components/play/inventory/searchInventory";
import ItemList from "../../components/play/inventory/itemList";
import ItemDetails from "../../components/play/inventory/itemDetails";
import { gameData } from "../../data/gameData";
import Home from "../../components/play/Home";

export default function Backpack({ loading, user }) {
  const router = useRouter();
  const [items, setItems] = useState("empty for now");
  const [itemOnClick, setItemOnClick] = useState("empty for now");

  // item.itemName => "Forest Mountains"
  // bg => "forest-mountains.png"
  const [bg, setBg] = useState("bg-beach.png"); // Default background
  const [pfpBg, setpfpBg] = useState("empty for now");

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || user.userType !== 1) {
      router.push("/");
    } else if (user.bg && gameData.items[user.bg].bg) {
      setBg(gameData.items[user.bg].bg);
    }

    // Set the items for displaying in inventory to user's items
    setItems(user.items);
    console.log(items);

    setpfpBg(user.pfpBg);

    if (Array.isArray(items)) {
      setItemOnClick(items[0]);
    }
    if (user.bg && gameData.items[user.bg].bg) {
      setBg(gameData.items[user.bg].bg);
    }
  }, [user, loading]);

  return (
    <div>
      <div className="pt-5">
        <div className="items-center justify-between">
          {/*  Inventory bar */}
          <div className="flex flex-row bg-white/50 rounded-lg items-center">
            <div className="grow-0 pl-4">
              <img
                src="/assets/icons/inventory.png"
                className="p-4 h-20 w-20"
              ></img>
            </div>
            <div className="grow pl-4 font-galindo text-xl">Inventory</div>
            <div className="shrink pr-6">
              {/* Search Bar */}
              {/* Handle Submit Function TODO */}
              <SearchInventory />
            </div>
          </div>

          {/* Default: inventory lists and item details */}
          <div className="py-8 flex flex-row font-galindo w-full">
            {/* Inventory List */}
            <div className="pr-4 basis-4/7">
              <ItemList
                items={items}
                itemOnClick={itemOnClick}
                setItemOnClick={setItemOnClick}
              />
            </div>

            {/* Item details */}
            <div className="basis-3/7 bg-white/50 rounded-lg">
              <ItemDetails
                item={itemOnClick}
                user={user}
                pfpBg={pfpBg}
                setpfpBg={setpfpBg}
                bg={bg}
                setBg={setBg}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
