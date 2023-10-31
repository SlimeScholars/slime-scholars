import { useState, useEffect, useCallback } from "react";
import { AiFillEye, AiOutlineClose } from "react-icons/ai";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"
import {TbTypography, TbAdjustmentsQuestion} from 'react-icons/tb'
import {FiImage} from 'react-icons/fi'
import {BsPencilSquare, BsFillTrashFill} from 'react-icons/bs'
import { Segmented } from "../segmented";
import TextElement from "./../activity/elements/textElement";
import FreeResponseElement from "./../activity/elements/freeResponseElement";
import ImageElement from "./../activity/elements/imageElement";
import MultipleChoiceElement from "./../activity/elements/multipleChoiceElement";

export default function Section({ section, index, max, theme, handleAppendElement, 
  handleModifyElement, handleDeleteElement, handleModifySection, handleSectionSwap, handleElementSwap, 
  handleDeleteSection }) {
  const [data, setData] = useState(section);
  const [open, setOpen] = useState(false);
  const [elementsVisible, setElementsVisible] = useState(false)
  const [addElementWidth, setAddElementWidth] = useState(null)

  const memoHandleModify = useCallback((elementId, params) => {
    handleModifyElement(index-1, elementId, params)
  }, [section, handleModifyElement])

  const memoHandleDelete = useCallback((elementId) => {
    handleDeleteElement(index, elementId)
  }, [section, handleDeleteElement])

  const memoHandleSwap = useCallback((index1, index2) => {
    handleElementSwap(index-1, index1, index2)
  }, [section, handleElementSwap])

  useEffect(() => {
    const element = document.getElementById("add-element");
    if (element) {
      const elementWidth = element.offsetWidth;
      setAddElementWidth(elementWidth)
    }
  }, [elementsVisible]);

  const elementOptions = [
    { label: "Text", icon: <TbTypography/>, params: {elementType: 0, text: "", isBox: false}},
    { label: "Image", icon: <FiImage/>, params: {elementType: 1, text: "",image: "", isBox: false, rounded:0, size:0, border:false}},
    { label: "Free Response", icon: <BsPencilSquare/>, params: {elementType: 3, text: "", afterBlank: "", blank: [], isBox: false}},
    { label: "Multiple Choice", icon: <TbAdjustmentsQuestion/>, params: {elementType: 2, text: "", isBox: false}},
  ];

  useEffect(() => {
    setData(section);
  }, [section]);

  return (
    <div className="w-full p-5 rounded-md shadow-md flex flex-col items-start gap-3" 
    style={{ backgroundColor: theme.ultra_light }}>
      <div className="flex flex-row justify-between items-center w-full">
        <span className="font-bold text-xl">Section {index}</span>
        <div className="flex flex-row items-center justify-center text-md gap-4 px-4 rounded-md py-1"
        style={{ backgroundColor: theme.light }}>
          <div className="flex flex-col items-center justify-center">
            <button 
            disabled={index === 1}
            className={`${index === 1 ? "text-neutral-500 cursor-not-allowed" : "hover:text-neutral-500"}`} 
            onClick={() => {
              handleSectionSwap(index-1, index-2)
            }}>
              <IoIosArrowUp/>
            </button>
            <button
            disabled={index === max}
            className={`${index === max ? "text-neutral-500 cursor-not-allowed" : "hover:text-neutral-500"}`} 
            onClick={() => {
              handleSectionSwap(index-1, index)
            }}>
              <IoIosArrowDown/>
            </button>
          </div>
          <button className="text-[1.25rem] hover:text-red-500"
          onClick={() => {
            handleDeleteSection(index-1)
          }}>
            <BsFillTrashFill/>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full">
        <div className="flex flex-row gap-2 items-center"><span className="font-bold">Style: </span>
        <Segmented options={["Plain", "Bold"]} defaultIndex={data.sectionStyle.toLowerCase() === "plain" ? 0 : 1}
        theme={theme} input={elementsVisible} onChange={(item) => {
          handleModifySection(index-1, {sectionStyle:item.toLowerCase()})
        }}/></div>
        <div className="flex flex-row gap-2 items-center"><span className="font-bold">Direction: </span>
        <Segmented options={["Vertical", "Horizontal"]} defaultIndex={data.sectionDirection.toLowerCase() === "vertical" ? 0 : 1}
        theme={theme} input={elementsVisible} onChange={(item) => {
          handleModifySection(index-1, {sectionDirection:item.toLowerCase()})
        }}/></div>
      </div>
      {/* <span>Elements: {data.elements.length}</span> */}
      <div className={`flex flex-col ${elementsVisible ? "gap-3" : "gap-0"} p-3 w-full rounded-md transition-all`} 
      style={{ backgroundColor: theme.light }}>
        <button className="flex flex-row gap-2 items-center font-bold self-center"
        onClick={() => {setElementsVisible(!elementsVisible)}}>
          {elementsVisible ? <><span>Close Elements</span><AiOutlineClose/></> : 
          <><span>View Elements ({data.elements.length})</span> <AiFillEye/></>}
        </button>
        {elementsVisible && <div className={`transition-all duration-200 ease-out origin-top ${elementsVisible ? "scale-y-100" : "scale-y-0 h-0"}`}>
          <div className="flex flex-col gap-3"> 
            {data.elements && data.elements.length > 0 ? 
            <div className="flex flex-col gap-3">
              {data.elements.map((element, key) => 
                {const props = {element:element, index:key+1, key:key, theme:theme, max:data.elements.length,
                handleChanges:memoHandleModify,
                handleDelete:memoHandleDelete,
                handleSwap:memoHandleSwap}
                return(
                element.elementType === 0 ? <TextElement {...props}/> : 
                element.elementType === 1 ? <ImageElement {...props}/> : 
                element.elementType === 2 ? <MultipleChoiceElement {...props}/> : 
                element.elementType === 3 ? <FreeResponseElement {...props}/> : 
                <></>
                )})}
            </div>:
            <span>
              {"[No Elements]"}
            </span>}
            
          <div className="flex flex-row">
            <button
              id="add-element"
              className="relative z-[60] px-4 py-1 rounded-md text-sm hover:brightness-[1.25]"
              style={{ backgroundColor: theme.semi_dark, color: theme.ultra_light }}
              onClick={(e) => {
                e.stopPropagation()
                setOpen(!open);
              }}
            >
              + Add Element
            </button>
            <section className={`relative z-[40] flex flex-row gap-1 transition-all duration-150`}
            style={{transform: open ? `translateX(0.35rem)` : `translateX(${-addElementWidth}px)`,opacity: open ? 1 : 0}}>
              <span style={{color:theme.semi_dark}} className="origin-center scale-y-[1.35] font-bold mt-[1px]">||</span>
              {addElementWidth && elementOptions.map((opt) => (
                <button
                  disabled={!open}
                  className={`flex flex-row gap-2 items-center justify-center px-6 py-1 rounded-md text-sm 
                  hover:brightness-[1.25]`}
                  style={{backgroundColor: theme.medium, color: theme.ultra_light}}
                  onClick={() => {handleAppendElement(index - 1, opt.params); setOpen(false)}}>
                  {opt.icon}{opt.label}
                </button>
              ))}
            </section>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  );
}
