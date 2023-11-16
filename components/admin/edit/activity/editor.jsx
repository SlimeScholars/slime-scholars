import { useEffect, useState } from "react"
import { activityService } from "../../../../services"
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi"
import Section from "./section"

export default function EditActivitySide({activity, refresh, setLoading, theme}){

    const [page, setPage] = useState(activity.pages.length > 0 ? 0 : null)

    useEffect(() => {
        if(page === null && activity.pages.length > 0){setPage(activity.pages.length-1)}
    }, [activity])

    const handleNewPage = async() => {
        setLoading(true)
        try{
            await activityService.update(activity._id, [...activity.pages.map((page, num) => {return{...page, pageNumber:num+1}}), {sections:[], 
                pageNumber:activity.pages.length+1}], activity.pages.length, 0)
            setTimeout(() => {setLoading(false)}, 150)
            setPage(activity.pages.length)
            refresh(true)
        }
        catch(err){
            console.log(err) 
            setTimeout(() => {setLoading(false)}, 150)
        }
    }

    const handleDeletePage = async() => {
        setLoading(true)
        try{
            const clone = [...activity.pages]
            clone.splice(page, 1)
            await activityService.update(activity._id, [...clone.map((page, num) => {return{...page, pageNumber:num+1}})], 
                page-1, 0)
            setTimeout(() => {setLoading(false)}, 150)
            setPage((current) => current === 0 ? (activity.pages.length === 1 ? null : 0) : current-1)
            refresh(true)
        }
        catch(err){
            console.log(err) 
            setTimeout(() => {setLoading(false)}, 150)
        }
    }
    
    const handleAppendSection = async() => {
        setLoading(true)
        try{
            await activityService.update(activity._id, [...activity.pages.map((pageData, num) => {
                if(num != page){return {...pageData, pageNumber:num+1}}
                else{
                    return {...pageData, pageNumber:num+1, sections:[...pageData.sections, 
                        {sectionIndex: pageData.sections.length+1, sectionStyle: "plain", sectionDirection: "vertical", elements:[]}]}
                }
            })], 
            page, 0)
            setTimeout(() => {setLoading(false)}, 150)
            refresh(true)
        }
        catch(err){
            console.log(err)
            setTimeout(() => {setLoading(false)}, 150)
        }
    }

    const handleDeleteSection = async(sectionIndex) => {
        setLoading(true)
        try{
            await activityService.update(activity._id, [...activity.pages.map((pageData, num) => {
                if(num != page){return {...pageData, pageNumber:num+1}}
                else{
                    const clone = [...pageData.sections]
                    clone.splice(sectionIndex, 1)
                    return {...pageData, pageNumber:num+1, sections:[...clone.map((item, key) => {return {
                        ...item, sectionIndex:key+1
                    }})]}
                }
            })], 
            page, 0)
            refresh(true)
            setTimeout(() => {setLoading(false)}, 150)
        }
        catch(err){
            console.log(err) 
            setTimeout(() => {setLoading(false)}, 150)
        }
    }

    const handleSectionSwap = async(sectionIndex, swapIndex) => {
        const swap = (arr, index1, index2) => {
            let clone = [...arr]
            let output = [...arr]
            output[index1] = {...clone[index2]}
            output[index1].sectionIndex = clone[index1].sectionIndex
            output[index2] = {...clone[index1]}
            output[index2].sectionIndex = clone[index2].sectionIndex
            return output
        }

        setLoading(true)
        try{
            await activityService.update(activity._id, [...activity.pages.map((pageData, num) => {
                if(num != page){return {...pageData, pageNumber:num+1}}
                else{
                    return {...pageData, pageNumber:num+1, sections:[...swap(pageData.sections, sectionIndex, swapIndex)]}
                }
            })], 
            page, 0)
            refresh(true)
            setTimeout(() => {setLoading(false)}, 150)
        }
        catch(err){
            console.log(err)
            setTimeout(() => {setLoading(false)}, 150) 
        }
    }

    const handleModifySection = async(sectionIndex, params) => {
        try{
            await activityService.update(activity._id, [...activity.pages.map((pageData, num) => {
                if(num != page){return {...pageData, pageNumber:num+1}}
                else{
                    return {...pageData, pageNumber:num+1, sections:[...pageData.sections.map((sectionData, num) => {
                        if(num != sectionIndex){return {...sectionData, sectionData:num+1}}
                        else{
                            return {...sectionData, sectionIndex:num+1, ...params}
                        }
                    })]}
                }
            })], 
            page, 0)
            refresh(false)
        }
        catch(err){
            console.log(err)
        }
    }

    const handleAppendElement = async(sectionIndex, params) => {
        setLoading(true)
        try{
            await activityService.update(activity._id, [...activity.pages.map((pageData, num) => {
                if(num != page){return {...pageData, pageNumber:num+1}}
                else{
                    return {...pageData, pageNumber:num+1, sections:[...pageData.sections.map((sectionData, num) => {
                        if(num != sectionIndex){return {...sectionData, sectionData:num+1}}
                        else{
                            return {...sectionData, sectionIndex:num+1, elements:[...sectionData.elements, 
                                {index: sectionData.elements.length+1, ...params}]}
                        }
                    })]}
                }
            })], 
            page, 0)
            refresh(true)
            setTimeout(() => {setLoading(false)}, 150)
        }
        catch(err){ 
            console.log(err)
            setTimeout(() => {setLoading(false)}, 150)
        }
    }

    const handleElementSwap = async(sectionIndex, elementIndex, swapIndex) => {
        const swap = (arr, index1, index2) => {
            let clone = [...arr]
            let output = [...arr]
            output[index1] = {...clone[index2], index:clone[index1].index}
            output[index2] = {...clone[index1], index:clone[index2].index}
            console.log(output)
            return output
        }
        setLoading(true)

        try {
            await activityService.update(
              activity._id,
              [...activity.pages.map((pageData, num) => ({
                  ...pageData, pageNumber: num + 1,
                  sections: [...pageData.sections.map((sectionData, snum) => {
                    return({ 
                      ...sectionData, sectionIndex: snum + 1,
                      elements: num === page && snum === sectionIndex ? [...swap(sectionData.elements, elementIndex, swapIndex)] 
                      : [...sectionData.elements],
                  })})],
              }))],
            page, 0);
            refresh()
            setTimeout(() => {setLoading(false)}, 150)
          } 
        catch(err){
            console.log(err)
            setTimeout(() => {setLoading(false)}, 150)
        }
    }

    const handleModifyElement = async (sectionIndex, elementIndex, params) => {
        try {
            await activityService.update(
                activity._id,
                [
                    ...activity.pages.map((pageData, num) => {
                        if (num !== page) {
                            return { ...pageData, pageNumber: num + 1 };
                        } else {
                            return {
                                ...pageData,
                                pageNumber: num + 1,
                                sections: [
                                    ...pageData.sections.map((sectionData, snum) => ({
                                        ...sectionData,
                                        sectionIndex: snum + 1,
                                        elements: [
                                            ...sectionData.elements.map((elementData, elnum) => ({
                                                ...elementData,
                                                index: num + 1,
                                                ...(num === page && snum === sectionIndex && elnum === elementIndex ? params : {}),
                                            })),
                                        ],
                                    })),
                                ],
                            };
                        }
                    }),
                ],
                page,
                0
            );
            
          refresh(false);
        } catch (err) {
          console.log(err);
        }
      };

    const handleDeleteElement = async(sectionIndex, elementIndex) => {
        setLoading(true)
        try{
            await activityService.update(
                activity._id,
                [...activity.pages.map((pageData, num) => ({
                    ...pageData, pageNumber: num + 1,
                    sections: [...pageData.sections.map((sectionData, snum) => {
                        //alert(`Comparing: section ${snum} to ${sectionIndex-1} -> ${num === page && snum === sectionIndex-1}`)
                        if(snum !== sectionIndex-1){
                            return{...sectionData, sectionIndex: snum + 1}}
                        else{
                            const clone = [...sectionData.elements]
                            clone.splice(elementIndex, 1)
                            return {...sectionData, sectionIndex: snum + 1, elements:[...clone]}
                        }
                    })],
                }))],
            page, 0);
            refresh(true);    
            setTimeout(() => {setLoading(false)}, 150)
        }
        catch(err){
            console.log(err)
            setTimeout(() => {setLoading(false)}, 150)
        }
    } 

    if(page === null){return(
        <div className={`flex flex-col gap-4 items-center justify-center w-full h-full text-black
        transition-colors duration-300`}>
            <div className="text-2xl font-bold">
                This lesson currently has no content!
            </div>
            <button className={`rounded-md ${theme.bg_primary1} hover:brightness-[1.2] py-2 px-8`}
            onClick={handleNewPage}
            style={{backgroundColor: theme.ultra_light, color: theme.dark}}>
                + New Page
            </button>
        </div>
    )}

    if(activity.pages.length <= page){return(
        <div className={`flex flex-col gap-4 items-center justify-center w-full h-full text-black
        transition-colors duration-300`}>
        </div>
    )}

    return(
        <div className={`relative flex flex-col py-5 items-center w-full h-full text-black
        transition-colors duration-300`}>
            <button className={`absolute top-[1.5rem] right-[1.5rem]
            hover:brightness-[1.2] text-md px-10 rounded-xl py-1 shadow-lg`}
            style={{color: theme.ultra_light, backgroundColor: theme.dark}}
                onClick={handleNewPage}>
                + New Page
            </button>
            <button className={`absolute top-[1.5rem] left-[1.5rem]
            hover:brightness-[1.2] text-md px-10 rounded-xl py-1 shadow-lg`} 
            style={{color: theme.ultra_light, backgroundColor: theme.dark}}
                onClick={handleDeletePage}>
                Delete Page
            </button>
            <div className="text-lg font- flex flex-row gap-7 items-center rounded-full px-4 py-1 shadow-xl"
            style={{backgroundColor: theme.ultra_light + "D0"}}>
                <button disabled={page === 0}
                onClick={() => {setPage((prev) => prev-1)}}>
                    <BiSolidLeftArrow className={page === 0 ? "text-neutral-400 cursor-not-allowed" : 
                    "hover:text-neutral-600"}/>
                </button>
                Page {page+1} / {activity.pages.length}
                <button disabled={page === activity.pages.length-1}
                onClick={() => {setPage((prev) => prev+1)}}>
                    <BiSolidRightArrow className={page === activity.pages.length-1 ? "text-neutral-400 cursor-not-allowed" : 
                    "hover:text-neutral-600"}/>
                </button>
            </div>
            <div className="flex flex-col gap-4 mt-4 p-6 border-t-2 border-black/[0.4] w-full">
                {activity.pages[page].sections.map((section, key) => 
                <Section section={section} key={key} index={key+1} theme={theme} max={activity.pages[page].sections.length}
                handleAppendElement={handleAppendElement}
                handleModifyElement={handleModifyElement}
                handleDeleteElement={handleDeleteElement}
                handleModifySection={handleModifySection}
                handleSectionSwap={handleSectionSwap}
                handleElementSwap={handleElementSwap}
                handleDeleteSection={handleDeleteSection}/>)}
                <button className={`w-full rounded-xl text-white py-1 hover:brightness-[1.5]`} style={{backgroundColor: theme.dark}}
                onClick={handleAppendSection}>
                    + Add Section
                </button>
            </div>
        </div>
    )
}