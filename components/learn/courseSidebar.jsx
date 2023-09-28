import { AiOutlineUnorderedList } from "react-icons/ai"

export default function CourseSidebar({colorPalette, open, setOpen}){

    return(
        <div className={`relative h-full transition-all duration-150
        ${open ? "w-[300px]" : "w-[20px]"}`}
        style={{
			backgroundImage:
				!colorPalette ? "" : `url('/assets/backgrounds/${colorPalette.bg}')`,
			backgroundSize: "cover",
		}}>
            <div className="absolute top-0 left-0 w-full h-full"
            style={{
                backgroundColor: !colorPalette ? "" : colorPalette.primary1 + "C0"
            }}/>
            <div className="absolute top-[50%] left-[100%] w-[1.5rem] h-[8rem] translate-y-[calc(-50%_-_4rem)]
             rounded-r-lg flex items-center justify-center" onClick={() => {setOpen(!open)}}
            style={{
                backgroundColor: !colorPalette ? "" : colorPalette.primary1 + "E0",
            }}>
                
            </div>
        </div>
    )
}