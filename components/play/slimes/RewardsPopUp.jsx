import Image from "next/image";
import { gameData } from "../../../data/gameData";
import { useState } from "react";
export default function RewardsPopUp({ rewardMessages, onClose, rewards }) {
  const [currentSlimeIndex, setCurrentSlimeIndex] = useState(0);

  const handlePrevClick = () => {
    if (currentSlimeIndex > 0) {
      setCurrentSlimeIndex(currentSlimeIndex - 1);
    } else {
      setCurrentSlimeIndex(currentSlimeIndex + rewardMessages.length - 1);
    }
  };

  const handleNextClick = () => {
    if (currentSlimeIndex < rewardMessages.length - 1) {
      setCurrentSlimeIndex(currentSlimeIndex + 1);
    } else {
      setCurrentSlimeIndex(0);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* TODO backgorund should match colour palette */}
      <div className="bg-gray-400 p-8 rounded-lg shadow-lg ">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center">
            <p className="text-2xl font-semibold font-galindo">
              Today's rewards: {rewards}
            </p>
            <Image
              src="/assets/icons/slime-gel.png"
              alt="slime gel"
              height={0}
              width={0}
              sizes='100vw'
              className="h-6 w-6 mx-1"
            />
          </div>
        </div>
        {rewardMessages.length > 0 && (
          <div className="flex flex-row">
            <button
              className="p-2 bg-gray-200 rounded-full my-auto"
              onClick={handlePrevClick}
            >
              {/* FIXME: Uncomment this later */}
              {/* {'<'} */}
            </button>
            <div className="flex flex-row mt-4">
              {Array.isArray(rewardMessages) &&
                rewardMessages.map((slime, index) => {
                  if (index === currentSlimeIndex) {
                    return (
                      <div key={index} className='flex flex-col'>
                        {slime.slimeName === "rosterBonus" ? (
                          <Image
                            src="/assets/icons/slime-gel"
                            alt="slime gel"
                            height={0}
                            width={0}
                            sizes='100vw'
                            className="h-64 w-64 mx-auto"
                          />
                        ) : (
                          <Image
                            src={
                              "/assets/pfp/slimes/" +
                              gameData.slimeImgs[slime.slimeName].pfp
                            }
                            alt={slime.slimeName}
                            height={0}
                            width={0}
                            sizes='100vw'
                            className="h-64 w-64 mx-auto"
                            onClick={() => { }}
                          />
                        )}

                        <p className="text-xl text-center pb-4">
                          {slime.message}
                        </p>
                      </div>
                    );
                  }
                })}
            </div>
            <button
              className="p-2 bg-gray-200 rounded-full my-auto"
              onClick={handleNextClick}
            >
              {/* FIXME: Uncomment this later */}
              {'>'}
            </button>
          </div>
        )}
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
