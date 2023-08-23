import ItemInventory from './itemInventory';
import { gameData } from '../../../data/gameData';
import { showToastError } from '../../../utils/toast';
import axios from 'axios';

export default function ItemDetails({ item, user, pfpBg, setpfpBg, bg, setBg }) {

    // for background
    if (item.isBg && gameData.items[item.itemName]) {
        return (
            <div className="grid grid-cols-3 p-4 gap-4">
                <ItemInventory
                    item={item}
                    displayOnly="true"
                />
                {/* Item description */}
                <div className="col-span-2 bg-black/40 rounded-lg p-8">
                    <p className="text-yellow-300 text-2xl font-thin">
                        {item.rarity}
                    </p>
                    <p className="text-white text-2xl font-bold">
                        {item.itemName}
                    </p>
                    {
                        item.description && (
                            <p className="text-grey text-sm">{item.description}</p>
                        )
                    }
                </div>
                {/* Change pfp comparison */}
                <div className="col-span-3 bg-black/40 rounded-lg p-6">
                    <div className="flex flex-row w-full items-center">
                        <div className="basis-1/5">
                            <div className="flex flex-col items-center">
                                <p>Current</p>
                                <div className="relative rounded-full overflow-hidden  border-4 border-red-300">
                                    <img src={"/assets/pfp/backgrounds/" + gameData.items[pfpBg].pfp}
                                        className="absolute inset-0"></img>
                                    <img src={"/assets/pfp/slimes/" + gameData.slimePfps[user.pfpSlime].pfp}
                                        className="relative z-10 translate-y-1/4 scale-125"></img>
                                </div>
                            </div>
                        </div>
                        <div className="basis-1/5">
                            <span className="text-red-300 material-symbols-outlined scale-150 p-10">
                                arrow_forward
                            </span>
                        </div>
                        <div className="basis-1/5">
                            <div className="flex flex-col items-center">
                                <p>Updated</p>
                                <div className="relative rounded-full overflow-hidden border-4 border-red-300">
                                    <img src={"/assets/pfp/backgrounds/" + gameData.items[item.itemName].pfp}
                                        className="absolute inset-0"></img>
                                    <img src={"/assets/pfp/slimes/" + gameData.slimePfps[user.pfpSlime].pfp}
                                        className="relative z-10 translate-y-1/4 scale-125"></img>
                                </div>
                            </div>
                        </div>
                        <div className="basis-2/5 p-4" dir="rtl">
                            {
                                pfpBg === item.itemName ? (
                                    <button className="rounded-s-lg p-4 bg-black/20" disabled>
                                        Equipped Already
                                    </button>
                                ) : (
                                    <button className="rounded-s-lg p-4 bg-red-300 hover:bg-red-300/75 h-full"
                                        onClick={(e) => {
                                            axios
                                                .put('/api/user/change-pfp', {
                                                    pfpBg: item.itemName,
                                                    pfpSlime: user.pfpSlime,
                                                }, {
                                                    headers: {
                                                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                                                    }
                                                })
                                                .then(response => { 
                                                    setpfpBg(item.itemName);
                                                    showToastError("Profile background was changed.", true);
                                                 })
                                                .catch(error => { });
                                        }}>
                                        Equip as Profile Background
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="bg-black/40 rounded-lg p-8 col-span-3">
                    {
                        gameData.items[item.itemName].bg === bg ? (
                            <button className="text-black" disabled>Equipped as background</button>
                        ) : (
                            <button className="text-red-300 hover:text-red-300/75 p-4"
                                onClick={(e) => {
                                    axios
                                        .put('/api/user/change-bg', {
                                            bg: item.itemName
                                        }, {
                                            headers: {
                                                Authorization: `Bearer ${localStorage.getItem('jwt')}`
                                            }
                                        })
                                        .then(response => {
                                            setBg(gameData.items[item.itemName].bg);
                                        })
                                        .catch(error => {
                                            console.log(error);
                                            showToastError(error.message);
                                        });
                                }}>
                                Equip as background
                            </button>
                        )
                    }
                </div>
            </div>
        )
    } else {
        return;
    }
}