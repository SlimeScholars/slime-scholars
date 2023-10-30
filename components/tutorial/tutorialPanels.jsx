import { useState } from "react";
import Image from "next/image";
import {
  FaRegCircle,
  FaRegCheckCircle,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";

export function TutorialPanels({ panels }) {
  const [index, setIndex] = useState(0);
  const [visitedPanels, setVisitedPanels] = useState([0]);

  function previous() {
    const isFirstPanel = index === 0;
    const newIndex = isFirstPanel ? panels.length - 1 : index - 1;
    markPanelAsVisited(newIndex);
    setIndex(newIndex);
  }

  function next() {
    const isLastPanel = index === panels.length - 1;
    const newIndex = isLastPanel ? 0 : index + 1;
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

  return (
    <>
      <div className="flex flex-col rounded-2xl bg-neutral-700/[0.75] h-[53rem] w-[85rem] rounded shadow-md">
        <div className="flex-1 flex justify-center items-center px-[2.5rem]">
          <div className="flex flex-col gap-[1rem] flex-[60%]">
            <Image
              src={panels[index].image1}
              width={0}
              height={0}
              sizes="100vw"
              className="w-[43rem]"
            />
            <Image
              src={panels[index].image2}
              width={0}
              height={0}
              sizes="100vw"
              className="w-[43rem]"
            />
          </div>
          <div className="text-center text-white flex-[40%]">
            {panels[index].description}
          </div>
        </div>
        <div className="flex w-[75%] justify-between items-center mx-auto mb-[1rem]">
          <button className="text-4xl text-white" onClick={() => previous()}>
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
                    <FaRegCheckCircle style={{ fontSize: "23px" }} />
                  ) : visitedPanels.includes(panelIndex) ? (
                    <FaRegCheckCircle />
                  ) : (
                    <FaRegCircle />
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
    </>
  );
}
