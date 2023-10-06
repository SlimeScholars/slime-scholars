import { useState, useEffect, useCallback } from "react";
import {TbTypography, TbAdjustmentsQuestion} from 'react-icons/tb'
import {FiImage} from 'react-icons/fi'
import {BsPencilSquare} from 'react-icons/bs'
import TextElement from "./elements/textElement";
import FreeResponseElement from "./elements/freeResponseElement";
import ImageElement from "./elements/imageElement";
import MultipleChoiceElement from "./elements/multipleChoiceElement";

export default function Section({ section, index, theme, handleAppendElement, handleModifyElement, handleDeleteElement }) {
  const [data, setData] = useState(section);
  const [open, setOpen] = useState(false);
  const [addElementWidth, setAddElementWidth] = useState(null)

  const memoHandleModify = useCallback((elementId, params) => {
    handleModifyElement(index-1, elementId, params)
  }, [section, handleModifyElement])

  const memoHandleDelete = useCallback((elementId) => {
    handleDeleteElement(index, elementId)
  }, [section, handleDeleteElement])

  useEffect(() => {
    const element = document.getElementById("add-element");
    if (element) {
      const elementWidth = element.offsetWidth;
      setAddElementWidth(elementWidth)
    }
  }, []);

  const elementOptions = [
    { label: "Text", icon: <TbTypography/>, params: {elementType: 0, text: "", isBox: false}},
    { label: "Image", icon: <FiImage/>, params: {elementType: 1, text: "", isBox: false}},
    { label: "Free Response", icon: <BsPencilSquare/>, params: {elementType: 3, text: "", isBox: false}},
    { label: "Multiple Choice", icon: <TbAdjustmentsQuestion/>, params: {elementType: 2, text: "", isBox: false}},
  ];

  useEffect(() => {
    setData(section);
  }, [section]);

  return (
    <div className="w-full p-5 rounded-md shadow-md flex flex-col items-start gap-3" 
        style={{ backgroundColor: theme.ultra_light }}>
      <span className="font-bold text-lg underline">Section {index}:</span>
      <span>Style: {data.sectionStyle}</span>
      <span>Direction: {data.sectionDirection}</span>
      <span>Elements: {data.elements.length}</span>
      <div className="p-3 w-full rounded-md" style={{ backgroundColor: theme.light }}>
      <div className="flex flex-col gap-3"> 
        {data.elements.length > 0 && <div className="flex flex-col gap-3">
          {data.elements.map((element, key) => 
            {const props = {element:element, index:key+1, key:key, theme:theme, handleChanges:memoHandleModify,
            handleDelete:memoHandleDelete}
            return(
            element.elementType === 0 ? <TextElement {...props}/> : 
            element.elementType === 1 ? <ImageElement {...props}/> : 
            element.elementType === 2 ? <MultipleChoiceElement {...props}/> : 
            element.elementType === 3 ? <FreeResponseElement {...props}/> : 
            <></>
            )})}
        </div>}
        <div className="flex flex-row">
          <button
            id="add-element"
            className="relative z-[40] px-4 py-1 rounded-md text-sm hover:brightness-[1.25]"
            style={{ backgroundColor: theme.semi_dark, color: theme.ultra_light }}
            onClick={(e) => {
              e.stopPropagation()
              setOpen(!open);
            }}
          >
            + Add Element
          </button>
          <section className={`relative z-[20] flex flex-row gap-1 transition-all duration-150`}
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
    </div>
  );
}
