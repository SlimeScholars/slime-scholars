import { useState } from "react";
import Image from "next/image";
import { FaCircle } from "react-icons/fa6";
import { FaRegCircle, FaArrowRight, FaArrowLeft } from "react-icons/fa";

export function TutorialPanels({ panels }) {
  const [index, setIndex] = useState(0);
  const [visitedPanels, setVisitedPanels] = useState([0]);
  const [panelsVisible, setPanelsVisible] = useState(true);

  function previous() {
    const isFirstPanel = index === 0;
    const newIndex = isFirstPanel ? index : index - 1;
    markPanelAsVisited(newIndex);
    setIndex(newIndex);
  }

  function next() {
    const isLastPanel = index === panels.length - 1;
    const newIndex = isLastPanel ? index : index + 1;
    markPanelAsVisited(newIndex);
    setIndex(newIndex);
  }

  function goToPanel(panelIndex) {
    setIndex(panelIndex);
  }

  function markPanelAsVisited(panelIndex) {
    if (!visitedPanels.includes(panelIndex)) {
      setVisitedPanels([...visitedPanels, panelIndex]);
    }
  }

  function handleClosePanels() {
    setPanelsVisible(false);
  }

  return (
    <>
      {panelsVisible ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="flex flex-col rounded-2xl bg-neutral-700/[0.75] h-[43rem] w-[75rem] rounded shadow-md">
            <button
              className="px-10 py-2 rounded-lg bg-pink-500 hover:bg-pink-500/75 transition-all duration-300 text-white font-bold"
              onClick={handleClosePanels}
            >
              I know what I'm doing
            </button>
            <div className="flex-1 flex justify-center items-center px-[2.5rem]">
              <div className="flex flex-col gap-[1rem] flex-[50%]">
                <Image
                  src={panels[index].image1}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-[33rem]"
                />
                <Image
                  src={panels[index].image2}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-[33rem]"
                />
              </div>
              <div className="text-center text-white flex-[50%]">
                {panels[index].description}
              </div>
            </div>
            <div className="flex w-[75%] justify-between items-center mx-auto mb-[1rem]">
              <button
                className="text-4xl text-white"
                onClick={() => previous()}
              >
                <FaArrowLeft />
              </button>
              <div className="flex items-center">
                {panels.map((panel, panelIndex) => {
                  return (
                    <div
                      key={panelIndex}
                      onClick={() => {
                        goToPanel(panelIndex);
                        markPanelAsVisited(panelIndex);
                      }}
                      className="cursor-pointer m-[3px] text-white"
                    >
                      {index === panelIndex ? (
                        <FaCircle style={{ fontSize: "20px" }} />
                      ) : visitedPanels.includes(panelIndex) ? (
                        <FaCircle />
                      ) : (
                        <FaRegCircle style={{ fontSize: "15px" }} />
                      )}
                    </div>
                  );
                })}
              </div>

              <button className="text-4xl text-white" onClick={() => next()}>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            className="px-10 py-2 rounded-lg bg-pink-500 hover:bg-pink-500/75 transition-all duration-300 text-white font-bold mt-[0.7rem]"
            onClick={() => setPanelsVisible(true)}
          >
            Begin Tutorial
          </button>
        </div>
      )}
    </>
  );
}
