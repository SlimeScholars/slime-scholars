import { useState, useEffect } from "react";
import Image from "next/image";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi"
import { AiOutlineClose } from "react-icons/ai";

export function TutorialPanels({ panels, user, panelsVisible, setPanelsVisible }) {
  const [index, setIndex] = useState(0);
  const [visitedPanels, setVisitedPanels] = useState([0]);

  useEffect(() => {
    if(false || (user && user.tutorialActive)){
      setPanelsVisible(true)
    }
  }, [user])

  useEffect(() => {
    setIndex(0)
    setVisitedPanels([0])
  }, [panelsVisible])

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
    <div className="fixed inset-0 flex items-center justify-center transition-all duration-300"
    style={{
      opacity: panelsVisible ? 1 : 0,
      zIndex: panelsVisible? 800 : -100
    }}>
      <div className="relative bg-neutral-800/[0.80] h-[85vh] w-[70vw] rounded-2xl shadow-md items-center justify-center"
      style={{
        display: "grid",
        gridTemplateRows: "10% 80% 10%"
      }}>
        <button className="absolute top-0 right-0 m-6 text-white text-[1.5em] hover:text-neutral-200 transition-all duration-150"
        onClick={handleClosePanels}>
          <AiOutlineClose/>
        </button>
        <section className="flex flex-row items-center justify-center w-full h-full text-4xl font-galindo text-white">
          Tutorial
        </section>
        <section className="grid grid-cols-2 justify-center items-center px-8 gap-8 h-full overflow-hidden">
          <div className="flex flex-col px-4 gap-[1rem]">
            <Image
              src={panels[index].image1}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full"
            />
            <Image
              src={panels[index].image2}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full"
            />
          </div>
          <div className="text-center text-white flex-[50%]">
            {panels[index].description}
          </div>
        </section>
        <section className="flex flex-row gap-8 items-center mx-auto mb-[1rem]">
          <button
            className="text-2xl text-white transition-colors duration-150 hover:text-neutral-200"
            onClick={() => previous()}
          >
            <BiSolidLeftArrow />
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
                  className="cursor-pointer m-[5px]"
                >
                  {index === panelIndex ? 
                    <div className="tutorial-dots bg-white scale-125"/>
                  : visitedPanels.includes(panelIndex) ? 
                    <div className="tutorial-dots bg-white/[0.8]"/>
                    : (
                    <div className="tutorial-dots bg-transparent"/>
                  )}
                </div>
              );
            })}
          </div>

          <button className="text-2xl  text-white transition-colors duration-150 hover:text-neutral-200" onClick={() => next()}>
            <BiSolidRightArrow/>
          </button>
        </section>
      </div>
    </div>
    //   ) : (
    //     <div className="flex justify-center">
    //       <button
    //         className="px-10 py-2 rounded-lg bg-pink-500 hover:bg-pink-500/75 transition-all duration-300 text-white font-bold mt-[0.7rem]"
    //         onClick={() => setPanelsVisible(true)}
    //       >
    //         Begin Tutorial
    //       </button>
    //     </div>
    //   )}
    // </>
  );
}
