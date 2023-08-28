import { gameData } from '../../../data/gameData';

export default function NewSlimePopup({ updatedSlime }) {
    
    const maxLevel = updatedSlime.maxLevel;
    const baseProduction = updatedSlime.baseProduction;
    const levelUpCost= updatedSlime.levelUpCost;

    return (
        <div 
            className="fixed inset-0 z-50 text-white flex items-center justify-center">
            <div className="grid grid-rows-2 place-content-center m-20 rounded-lg p-8 bg-slate-400">
                <div className="flex flex-col p-4 w-full text-center">
                    <h3 className="font-galindo text-black text-lg">New Slime Unlocked</h3>
                    <img src={ "/assets/pfp/slimes/" + updatedSlime.slimeName}></img>
                    <div className="flex flex-row p-4">
                        <p className="font-galindo text-white px-2">{ updatedSlime.slimeName }</p>
                        <p className="text-white"
                            style={{ color: gameData.rarityColours[updatedSlime.rarity].text }}>{ updatedSlime.rarity }</p>
                    </div>
                    <div className="flex flex-row p-4">
                        <p>Max Level: { maxLevel } Lvl.</p>
                        <p>Base Production: { baseProduction }</p>
                        <p>Level Up Cost: { levelUpCost }</p>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <button 
                        className="rounded-sm bg-white text-black mr-2 p-2 hover:bg-white/75"
                        onClick={(e) => {
                            setEggsLacked(0);
                        }}>
                        Cancel</button>
                    <button 
                        className="rounded-sm bg-red-300 text-white p-2 hover:bg-red-300/75"
                        onClick={() => {
                            handlePurchaseEggs(eggsLacked);
                        }}>Purchase</button>
                </div>
            </div>
        </div>
    );
}