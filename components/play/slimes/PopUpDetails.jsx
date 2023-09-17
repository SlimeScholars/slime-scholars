// when you level up a slime, show details of previous stats and new stats
import Image from "next/image";
import { gameData } from "../../../data/gameData";
import { useRouter } from "next/router";
import { FaArrowAltCircleUp } from "react-icons/fa";

export default function PopUpDetails({ user, res, onClose, oldSlime }) {
  const newSlime = res.slime;
  const router = useRouter();
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 fade-in-element text-white">
      {/* TODO backgorund should match colour palette */}
      <div className="relative bg-black/80 py-8 rounded-lg shadow-lg px-20">
        <button className="text-white hover:text-slate-300 absolute top-[1rem] right-[2rem] text-[2.5rem]"
                onClick={onClose}>
                &times;
        </button>
        <div>
          <div className="flex flex-col">
            <div className="text-2xl font-semibold">{gameData.slimes[newSlime.slimeName].slimeName}</div>
            <div className="italic">Upgraded to level {newSlime.level}</div>
          </div>
          <Image
            src={
              "/assets/pfp/slimes/" + gameData.slimes[newSlime.slimeName].pfp
            }
            alt={newSlime.slimeName}
            height={0}
            width={0}
            sizes='100vw'
            className="md:h-64 md:w-64 sm:h-32 sm:w-32 mx-auto"
            onClick={() => {
              router.push("/play/slimes");
            }}
          />
        </div>
        <p className="text-lg font-semibold mb-4">
          Level: {oldSlime.level} → <span className="text-green-400">{newSlime.level}{" "}</span>
        </p>
        <div className="flex flex-row items-center mb-4">
          <p className="text-lg font-semibold">
            Base production: {oldSlime.baseProduction}
          </p>
          <Image
            src="/assets/icons/slime-gel.png"
            alt="slime gel"
            height={0}
            width={0}
            sizes='100vw'
            className="h-4 w-4 mx-1"
          />
          <p className="text-lg font-semibold"> → <span className="text-green-600">{newSlime.baseProduction}</span></p>
          <Image
            src="/assets/icons/slime-gel.png"
            alt="slime gel"
            height={0}
            width={0}
            sizes='100vw'
            className="h-4 w-4 mx-1"
          />
        </div>
        <div className="flex flex-row items-center mb-4">
          <p className="text-lg font-semibold">
            Level up cost: {oldSlime.levelUpCost}
          </p>
          <Image
            src="/assets/icons/slime-gel.png"
            alt="slime gel"
            height={0}
            width={0}
            sizes='100vw'
            className="h-4 w-4 mx-1"
          />
          <p className="text-green-600 text-lg font-semibold"> → {newSlime.levelUpCost} </p>
          <Image
            src="/assets/icons/slime-gel.png"
            alt="slime gel"
            height={0}
            width={0}
            sizes='100vw'
            className="h-4 w-4 mx-1"
          />
        </div>
      </div>
    </div>
  );
}
