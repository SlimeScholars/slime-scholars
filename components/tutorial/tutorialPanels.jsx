import { useState, useEffect } from "react";
import { Image } from "antd";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi"
import { AiOutlineClose } from "react-icons/ai";

export function TutorialPanels({ panels, user, panelsVisible, setPanelsVisible }) {
  const [index, setIndex] = useState(0);
  const [visitedPanels, setVisitedPanels] = useState([0]);

  useEffect(() => {
    if(true || (user && user.tutorialActive)){ //USE TRUE FOR NOW
      setPanelsVisible(true)
    }
  }, [user])

  useEffect(() => {
    setTimeout(() => {
      setIndex(0)
      setVisitedPanels([0])
    }, 300)
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
    <div className="absolute top-0 left-0 flex w-full h-full items-center justify-center transition-all duration-300"
    style={{
      opacity: panelsVisible ? 1 : 0,
      zIndex: panelsVisible? 800 : -100
    }}>
      <div className="relative bg-neutral-800/[0.80] h-[85vh] w-[70vw] rounded-2xl shadow-md items-center justify-center"
      style={{
        display: "grid",
        gridTemplateRows: "15% 70% 15%",
      }}>
        <button className="absolute top-0 right-0 m-6 text-white text-[1.5em] hover:text-neutral-200 transition-all duration-150"
        onClick={handleClosePanels}>
          <AiOutlineClose/>
        </button>
        <section className="flex flex-row items-center justify-center w-full h-full text-4xl font-galindo text-white">
          Tutorial: {panels[index].slidename}
        </section>
        <section className="grid grid-cols-2 justify-center items-center px-8 gap-8 h-full overflow-hidden">
          <div className="flex flex-col px-4 gap-[1rem]">
            <Image
              src={panels[index].image1}
              preview={false}
              className="w-auto min-h-[50%] h-[50%]"
              placeholder={
                <></>
              }
            />
            <Image
              src={panels[index].image2}
              preview={false}
              className="w-auto min-h-[50%] h-[50%]"
              placeholder={
                <></>
              }
            />
          </div>
          <div className="text-center text-white flex-[50%] font-galindo font-light text-xl">
            {panels[index].description}
          </div>
        </section>
        <section className="relative flex flex-row gap-8 items-center mx-auto mb-[1rem] mt-4 w-full justify-center">
          <div className="flex flex-row gap-2 items-center">
            {/* <span className="text-[0.9em] text-white w-[400px] text-right">
                {panels[index-1] ? panels[index-1].slidename : ""}
            </span> */}
            <button
              className={`text-2xl transition-colors duration-150 ${index > 0 ? 
                "text-white hover:text-neutral-200" : "text-neutral-500 cursor-not-allowed"}`}
              onClick={previous}
            >
              <BiSolidLeftArrow />
            </button>
          </div>
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
          
          <div className="flex flex-row gap-2 items-center ">
            <button className={`text-2xl transition-colors duration-150 ${index < panels.length - 1 ? 
            "text-white hover:text-neutral-200" : "text-neutral-500 cursor-not-allowed"}`}
            onClick={next}>
              <BiSolidRightArrow/>
            </button>
            {/* <span className="text-[0.9em] text-white w-[400px] text-left">
                {panels[index+1] ? panels[index+1].slidename : "Finish"}
            </span> */}
          </div>
          {index === panels.length - 1 && 
          <div className="absolute right-0 pr-12">
            <button className="text-white hover:text-neutral-200 transition-colors 
            duration-150 text-2xl font-galindo"
            onClick={() => {setPanelsVisible(false)}}>
              Finish
            </button>
          </div>}
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
