// when you level up a slime, show details of previous stats and new stats
import Image from "next/image";
import { gameData } from "../../../data/gameData";
import { useRouter } from "next/router";

export default function PopUpDetails({ user, res, onClose, oldSlime }) {
  const newSlime = res.slime;
  const router = useRouter();
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* TODO backgorund should match colour palette */}
      <div className="bg-slate-200 p-8 rounded-lg shadow-lg">
        <div>
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
          Level: {oldSlime.level} → <span className="text-green-600">{newSlime.level}{" "}</span>
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
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
