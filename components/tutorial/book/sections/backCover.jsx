import React from "react";

export default function BackCover(props) {
  return (
    <div
      id={"page" + props.pageNum}
      className={`w-1/2 h-full page outer bg-transparent`}
      style={{
        zIndex: props.totalPages - props.pageNum + 1,
      }}
    >
      <div className={"w-full h-full page-front bg-transparent"}>
        <div className={"w-full h-full bg-orange-200 rounded-r-xl p-4"}>
          <div className="text-center text-white flex-[50%] font-galindo font-light text-xl">
            {props.content.description}
          </div>
        </div>
      </div>
    </div>
  );
}
