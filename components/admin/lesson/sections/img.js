import React, { useEffect, useState } from "react";
import Controls from "../controls";

export default function ImgSection({
  image,
  section,
  changeSectionNumber,
  deleteSection,
  moveSection,
}) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    if (image) {
      let url = URL.createObjectURL(image);
      setImg(url);
    }
  }, [image]);

  return (
    <div className="w-full relative py-3 px-6 flex flex-col justify-start items-start bg-purple-50">
      <Controls
        section={section}
        changeSectionNumber={changeSectionNumber}
        deleteSection={deleteSection}
        moveSection={moveSection}
      />
      <div className="w-full flex justify-center items-center mt-5">
        {img && (
          <img src={img} alt="img" className="w-full h-full object-contain" />
        )}
      </div>
    </div>
  );
}
