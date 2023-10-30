import { useState } from "react";
import Image from "next/image";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";

export function TutorialPanels({ panels }) {
  const [index, setIndex] = useState(0);

  function previous() {
    const isFirstPanel = index === 0;
    const newIndex = isFirstPanel ? panels.length - 1 : index - 1;
    setIndex(newIndex);
  }

  function next() {
    const isLastPanel = index === panels.length - 1;
    const newIndex = isLastPanel ? 0 : index + 1;
    setIndex(newIndex);
  }

  function goToPanel(panelIndex) {
    setIndex(panelIndex);
  }

  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-[35rem] w-[50rem] rounded shadow-md relative">
        <button
          className="text-4xl absolute top-[50%] left-0"
          onClick={() => previous()}
        >
          &lt;
        </button>
        <div className="flex-col">
          <div className="flex justify-center">
            <Image
              src={panels[index].image1}
              width={100}
              height={100}
              className="z-1000"
            />
          </div>
          <div className="text-center">{panels[index].description}</div>
          <div className="flex justify-center absolute bottom-0 w-full">
            {panels.map((panel, panelIndex) => {
              return (
                <div
                  key={panelIndex}
                  onClick={() => goToPanel(panelIndex)}
                  className="cursor-pointer m-[3px]"
                >
                  {index === panelIndex ? (
                    <FaRegCheckCircle />
                  ) : (
                    <FaRegCircle />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="text-4xl absolute top-[50%] right-0"
          onClick={() => next()}
        >
          &gt;
        </button>
      </div>
    </>
  );
}
