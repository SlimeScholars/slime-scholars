import React, { useState } from "react";

export default function Page(props) {
  const [flipped, setFlipped] = useState(-1); // -1: not flipped, 0: flipping, 1: flipped

  const flipPage = () => {
    console.log(props.pageNum, props.currentPage);
    if (
      // flip this page
      props.currentPage <= props.pageNum ||
      (props.currentPage === props.pageNum + 1 && flipped === 1)
    ) {
      let next = -flipped;
      console.log("flip", props.pageNum);
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
        <div className={"w-full h-full page-front bg-transparent p-4 pl-0"}>
          <div className={"w-full h-full bg-orange-200"}>
            {props.children[0]}
          </div>
        </div>
        <div className={"w-full h-full page-back bg-transparent p-4 pr-0"}>
          <div className={"w-full h-full bg-orange-200"}>
            {props.children[1]}
          </div>
        </div>
      </button>
    )
  );
}
