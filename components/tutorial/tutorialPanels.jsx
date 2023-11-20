import { useState, useEffect, useRef } from "react";
import { Image } from "antd";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import Page from "./book/page";
import FrontCover from "./book/sections/frontCover";
import BackCover from "./book/sections/backCover";
import { panels } from "../../data/editTutorial";

export function TutorialPanels({ user, panelsVisible, setPanelsVisible }) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (user && user.tutorialActive) {
      setTimeout(() => {
        setPanelsVisible(true);
      }, 150);
    } else {
      setPanelsVisible(false);
    }
  }, [user]);

  const handleClick = (e) => {
    if (bookRef && bookRef.current && !bookRef.current.contains(e.target)) {
      handleClosePanels();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

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

  const bookRef = useRef(null);

  return (
    <div
      className="fixed top-0 left-0 flex w-screen h-screen backdrop-blur-md bg-gray-900/60 items-center justify-center transition-all duration-300"
      style={{
        opacity: panelsVisible ? 1 : 0,
        zIndex: panelsVisible ? 400 : -100,
      }}
    >
      <div
        className="h-[85vh] w-[70vw] shadow-md relative bg-yellow-950 rounded-md cursor-default flex flex-col items-center justify-center p-2"
        ref={bookRef}
      >
        <div className="w-full h-full bg-yellow-900/50 rounded-sm p-2">
          <div className="bg-gray-500 w-full h-full px-[3px] py-0">
            <div className="bg-gray-400 w-full h-full px-[3px] py-0">
              <div className="bg-gray-300 w-full h-full px-[3px] py-0">
                <div className="bg-gray-200 w-full h-full px-[3px] py-0">
                  <div className="w-full h-full outer">
                    <FrontCover
                      pageNum={0}
                      totalPages={panels.length}
                      content={panels[0]}
                    />
                    {panels.map((panel, panelIndex) => {
                      if (panelIndex === 0 || panelIndex === panels.length - 1)
                        return;
                      return (
                        <Page
                          pageNum={panelIndex}
                          currentPage={page}
                          setPage={setPage}
                          totalPages={panels.length}
                          cover={false}
                          key={panelIndex}
                        >
                          <div className="flex flex-col gap-8">
                            <div className="text-2xl font-galindo">
                              Tutorial: {panel.slidename}
                            </div>
                            <div className="text-centerflex-[50%] font-galindo font-light text-xl">
                              {panel.description}
                            </div>
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
                      close={handleClosePanels}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
