import { useState, useRef, useEffect } from "react";
import MenuOptions from "./menuOptions";

export default function BurgerMenu(){
    const links = [{name: "GitHub", img:"/github-50.png", imgWhite:"/github-white-50.png", link: "#"}, {name: "LinkedIn", img:"/linkedin-50.png",imgWhite:"/linkedin-white-50.png", link: "#"}, {name: "CV", img:"/cv-50.png", imgWhite:"/cv-white-50.png", link: "#"}]
    
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
        <div className="md:invisible">
            <button onClick={handleBurgerMenu}
                    // ref={wrapperRef}
                    className={`group hover:bg-secondary h-10 w-10 flex flex-col justify-center items-center border-2 rounded-md gap-1 ${isOpen && "bg-gray-400"}`}>
                        <span className={`bg-black h-0.5 w-8 rounded-md duration-500 group-hover:bg-white group-hover:rotate-45 group-hover:translate-y-1.5 ${ isOpen && 'bg-white rotate-45 translate-y-1.5'}`}></span>
                        <span className={`bg-black h-0.5 w-8 rounded-md duration-500 group-hover:bg-white group-hover:scale-x-0 transition ${ isOpen && 'bg-white scale-x-0'}`}></span>
                        <span className={`bg-black h-0.5 w-8 rounded-md duration-500 group-hover:bg-white group-hover:-rotate-45 group-hover:-translate-y-1.5 ${ isOpen && 'bg-white -rotate-45 -translate-y-1.5'}`}></span>
            </button>
            <div className="flex flex-col w-auto absolute top-40 -left-48 mt-1">
                {links.map( (link, index) => {
                    return (
                        <MenuOptions index={index} key={index} isOpen={isOpen} name={link.name} img={link.img} imgWhite={link.imgWhite}/>
                        
                    );                    
                })}
            </div> 
        </div>
        
                
    );
}