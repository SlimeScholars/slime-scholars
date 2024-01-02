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
        <div className={"w-full h-full bg-gray-100 p-10 flex flex-col justify-between"}
        onClick={() => {
          props.close()
        }}>
          <div className="text-center text-gray-800 flex-[50%] font-galindo font-light text-xl">
            <div className="flex flex-col gap-8">
              <div className="text-2xl font-galindo">
                Tutorial: {props.content.slidename}
              </div>
              {props.content.description}
            </div>
          </div>
          <section className="flex flex-row items-center justify-end">
            <button className="text-xl font-galindo">
                {/* FINSH BUTTON */}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
