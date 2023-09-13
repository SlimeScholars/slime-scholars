import React, { useEffect, useState } from "react";
import Controls from "../controls";
import { showToastError } from "../../../../utils/toast";
import Image from "next/image";

export default function ImgSection({
  image,
  section,
  changeSectionNumber,
  deleteSection,
  moveSection,
  active,
  sectionNumber,
  questionIndex,
  questionNumber,
  curQuizQuestion,
  colorPalette
}) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    if (image) {
      try {
        if (typeof image === "string") {
          setImg(image);
        } else {
          let url = URL.createObjectURL(image);
          setImg(url);
        }
      } catch (error) {
        showToastError(error.message);
      }
    }
  }, [image]);

  return (
    (!active || curQuizQuestion > questionNumber || (sectionNumber >= section.sectionNumber && curQuizQuestion === questionNumber)) && (
      <div className="w-full relative py-3 px-6 flex flex-col justify-start items-start"
      style={{
        backgroundColor:!colorPalette ? "" : colorPalette.primary1
      }}>
        {!active && (
          <Controls
            section={section}
            changeSectionNumber={changeSectionNumber}
            deleteSection={deleteSection}
            moveSection={moveSection}
            questionIndex={questionIndex}
          />
        )}
        <div className="w-full flex justify-center items-center mt-5">
          {img && (
            <Image
              src={img}
              alt="img"
              height={0}
              width={0}
              sizes='100vw'
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </div>
    )
  );
}
