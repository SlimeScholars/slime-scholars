
import Image from "next/image";
import { gameData } from "../../../data/gameData";
import { useRouter } from "next/router";

export default function VerifyUpgradePopup({ res, onClose, oldSlime, setShowLevelUpPopup, handleSlimeUpgrade }) {
  
  const router = useRouter();

  function handleContinue() {
    handleSlimeUpgrade(oldSlime._id)
    setShowLevelUpPopup(true)
    onClose()
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 fade-in-element text-white" >
      <div className="relative bg-black/80 py-8 rounded-lg shadow-lg px-20">
        <button className="text-white hover:text-slate-300 absolute top-[1rem] right-[2rem] text-[2.5rem]"
                onClick={onClose}>
                &times;
        </button>
        <div>
          <div className="flex flex-col justify-center items-center">
            <div className="italic mb-8 ">Are you sure you want to upgrade this slime?</div>
            <div className="font-bold flex flex-row text-2xl justify-center items-center"> 
                <h3>{oldSlime.levelUpCost}</h3>
                <Image
                    src="/assets/icons/slime-gel.png"
                    alt="slime gel"
                    height={0}
                    width={0}
                    sizes='100vw'
                    className="h-8 w-8 mx-1"
                />
            </div>
          </div>
          <div className="mt-8 flex flex-row gap-5 justify-center items-center text-lg">
            <button className="p-1 pl-12 pr-12 hover:bg-white/75 bg-white/50 rounded-lg" onClick={handleContinue}> Yes </button>
            <button className="p-1 pl-12 pr-12 hover:bg-white/75 bg-white/50 rounded-lg" onClick={onClose}> No </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
