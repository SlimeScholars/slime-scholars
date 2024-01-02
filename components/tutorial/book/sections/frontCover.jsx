import React from "react";
import { Image } from "antd";

export default function FrontCover(props) {
  return (
    <div
      id={"page" + props.pageNum}
      className={`w-1/2 h-full page outer bg-transparent flip-page`}
      style={{
        zIndex: props.pageNum + props.totalPages - 1,
      }}
    >
      <></>
      <div className={"w-full h-full page-back bg-transparent"}>
        <div className={"w-full h-full bg-gray-100 p-10"}>
          <div className="flex flex-col px-4 gap-[1rem]">
            <Image
              src={props.content.image1}
              preview={false}
              className="w-auto min-h-[50%] h-[50%]"
              placeholder={<></>}
            />
            <Image
              src={props.content.image2}
              preview={false}
              className="w-auto min-h-[50%] h-[50%]"
              placeholder={<></>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
