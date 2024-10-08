import { useState} from "react";
import MenuOptions from "./menuOptions";
import { IHeader } from "./header";
import { links } from "../utils/constants.";


export default function BurgerMenu(props: IHeader){
    
    const [isOpen, setIsOpen] = useState(false);

    // const wrapperRef = useRef<HTMLButtonElement>(null) // for detect outside click
    
    const handleBurgerMenu = () => {
        setIsOpen(!isOpen);
    }
 

    // useEffect(() => {
    //     const handleOutSideClick = (event: MouseEvent) => {
    //       if (!wrapperRef.current?.contains(event.target as Node)) {
    //         setIsOpen(false);
    //       }
    //     };
    
    //     window.addEventListener("mousedown", handleOutSideClick);
    
    //     return () => {
    //       window.removeEventListener("mousedown", handleOutSideClick);
    //     };
    //   }, [wrapperRef]);
   
    return(
        <div className="lg:invisible">
            <button onClick={handleBurgerMenu}
                    // ref={wrapperRef}
                    className={`group hover:bg-secondary h-10 w-10 flex flex-col justify-center items-center border-2 rounded-md gap-1 ${isOpen && "bg-gray-400"}`}>
                        <span className={`bg-black dark:bg-white h-0.5 w-8 rounded-md duration-500 group-hover:bg-white group-hover:rotate-45 group-hover:translate-y-1.5 ${ isOpen && 'bg-white rotate-45 translate-y-1.5'}`}></span>
                        <span className={`bg-black dark:bg-white h-0.5 w-8 rounded-md duration-500 group-hover:bg-white group-hover:scale-x-0 transition ${ isOpen && 'bg-white scale-x-0'}`}></span>
                        <span className={`bg-black dark:bg-white h-0.5 w-8 rounded-md duration-500 group-hover:bg-white group-hover:-rotate-45 group-hover:-translate-y-1.5 ${ isOpen && 'bg-white -rotate-45 -translate-y-1.5'}`}></span>
            </button>
            <div className="flex flex-col w-auto absolute top-40 -left-48 mt-1">
                {links.map( (link, index) => {
                    return (
                        <MenuOptions index={index} key={index} isOpen={isOpen} name={link.name} img={link.img} imgWhite={link.imgWhite} link={link.link} hook={props.hook}/>
                        
                    );                    
                })}
            </div> 
        </div>
        
                
    );
}