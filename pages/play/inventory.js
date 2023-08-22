import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../../components/play/Navbar";
import SearchInventory from "../../components/play/inventory/searchInventory";
import ItemList from "../../components/play/inventory/itemList";
import { gameData } from "../../data/gameData";

export default function Backpack({ loading, user }) {
  const router = useRouter();
  const [items, setItems] = useState("empty for now");
  const [itemOnClick, setItemOnCLick] = useState("empty for now");
  const [bg, setBg] = useState("bg-beach.png"); // Default background

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || user.userType !== 1) {
      router.push("/");
    }

    console.log(user.items);
    // Set the items for displaying in inventory to user's items
    setItems(user.items);

    if (Array.isArray(items)) {
      setItemOnCLick(items[0]);
    }
    if (user.bg && gameData.items[user.bg].bg) {
      setBg(gameData.items[user.bg].bg);
    }
  }, [user, loading]);

  return (
    <div
      className={`w-screen h-screen bg-cover bg-[url('/assets/backgrounds/${bg}')]`}
    >
      <div className="p-8 w-full h-full justify-center items-center backdrop-brightness-50">
        <Navbar current="4" className=""></Navbar>
        <div className="pt-5">
          <div className="items-center justify-between">
            {/*  Inventory bar */}
            <div className="flex flex-row bg-white/75 rounded-lg items-center">
              <div className="grow-0 pl-4">
                <img
                  src="/assets/icons/backpack.png"
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
              <div className="pr-4 basis-2/3">
                <ItemList
                  items={items}
                  itemOnClick={itemOnClick}
                  setItemOnCLick={setItemOnCLick}
                />
              </div>

              {/* Item details */}
              <div className="pl-4 basis-1/3 bg-white/75 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
