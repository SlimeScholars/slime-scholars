import React, { useState } from "react";

export default function Page(props) {
  const [flipped, setFlipped] = useState(-1); // -1: not flipped, 0: flipping, 1: flipped

  const flipPage = () => {
    if (
      // flip this page
      props.currentPage <= props.pageNum ||
      (props.currentPage === props.pageNum + 1 && flipped === 1)
    ) {
      let next = -flipped;
      setFlipped(next);
      props.setPage(props.pageNum + next); // set current page tracker to next page
    }
  };

  return (
    Math.abs(props.currentPage - props.pageNum) <= 2 && ( // only render if within 2 pages of current page
      <button
        id={"page" + props.pageNum}
        className={
          `w-1/2 h-full page outer bg-transparent ` +
          (flipped === 1 ? " flip-page" : "")
        }
        style={{
          zIndex:
            flipped === 1
              ? props.pageNum + props.totalPages - 1
              : props.totalPages - props.pageNum + 1,
        }}
        onClick={flipPage}
      >
        <div className={"w-full h-full page-front bg-transparent"}>
          <div className={"w-full h-full bg-gray-100 text-gray-800 p-10"}>
            {props.children[0]}
          </div>
          <span className="fold-corner-right"></span>
        </div>
        <div className={"w-full h-full page-back bg-transparent"}>
          <div className={"w-full h-full bg-gray-100 text-gray-800 p-10"}>
            {props.children[1]}
          </div>
          <span className="fold-corner-left"></span>
        </div>
      </button>
    )
  );
}
