import { useState, useEffect } from "react";
import { Image } from "antd";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import Page from "./book/page";
import FrontCover from "./book/sections/frontCover";
import BackCover from "./book/sections/backCover";
import { panels } from "../../data/editTutorial";

export function TutorialPanels({ user, panelsVisible, setPanelsVisible }) {
  const [index, setIndex] = useState(0);
  const [visitedPanels, setVisitedPanels] = useState([0]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (user && user.tutorialActive) {
      setPanelsVisible(true);
    } else {
      setPanelsVisible(false);
    }
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setIndex(0);
      setVisitedPanels([0]);
    }, 300);
  }, [panelsVisible]);

  function handleClosePanels() {
    const token = localStorage.getItem("jwt");

    // Set the authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.post("/api/user/end-tutorial", {}, config);
    setPanelsVisible(false);
  }

  return (
    <div
      className="absolute top-0 left-0 flex w-full h-full items-center justify-center transition-all duration-300"
      style={{
        opacity: panelsVisible ? 1 : 0,
        zIndex: panelsVisible ? 800 : -100,
      }}
    >
      <section className="h-[85vh] w-[70vw] shadow-md relative outer bg-orange-950 p-4">
        <FrontCover
          pageNum={0}
          totalPages={panels.length}
          content={panels[0]}
        />
        {panels.map((panel, panelIndex) => {
          if (panelIndex === 0 || panelIndex === panels.length - 1) return;
          return (
            <Page
              pageNum={panelIndex}
              currentPage={page}
              setPage={setPage}
              totalPages={panels.length}
              cover={false}
            >
              <div className="text-center text-white flex-[50%] font-galindo font-light text-xl">
                {panel.description}
              </div>
              <div className="flex flex-col px-4 gap-[1rem]">
                <Image
                  src={panel.image1}
                  preview={false}
                  className="w-auto min-h-[50%] h-[50%]"
                  placeholder={<></>}
                />
                <Image
                  src={panel.image2}
                  preview={false}
                  className="w-auto min-h-[50%] h-[50%]"
                  placeholder={<></>}
                />
              </div>
            </Page>
          );
        })}
        <BackCover
          pageNum={panels.length - 1}
          totalPages={panels.length}
          content={panels[panels.length - 1]}
        />
      </section>
      {/*
        <button className="absolute top-0 right-0 m-6 text-white text-[1.5em] hover:text-neutral-200 transition-all duration-150"
          onClick={handleClosePanels}>
          <AiOutlineClose />
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
                    <div className="tutorial-dots bg-white scale-125" />
                    : visitedPanels.includes(panelIndex) ?
                      <div className="tutorial-dots bg-white/[0.8]" />
                      : (
                        <div className="tutorial-dots bg-transparent" />
                      )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-row gap-2 items-center ">
            <button className={`text-2xl transition-colors duration-150 ${index < panels.length - 1 ?
              "text-white hover:text-neutral-200" : "text-neutral-500 cursor-not-allowed"}`}
              onClick={next}>
              <BiSolidRightArrow />
            </button>
          </div>
          {index === panels.length - 1 &&
            <div className="absolute right-0 pr-12">
              <button className="text-white hover:text-neutral-200 transition-colors 
            duration-150 text-2xl font-galindo"
                onClick={() => { setPanelsVisible(false) }}>
                Finish
              </button>
            </div>}
          </section>*/}
    </div>
  );
}
