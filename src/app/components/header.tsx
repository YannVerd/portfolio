import React, {useRef,useState, useEffect} from "react";
import MenuOptions from "./menuOptions";
import MenuBurger from "./burgerMenu";
import BurgerMenu from "./burgerMenu";



export default function Header(){

    const links = [{name: "Git", img:"/github-50.png", imgWhite:"/github-white-50.png", link: "#"}, {name: "LinkedIn", img:"/linkedin-50.png",imgWhite:"/linkedin-white-50.png", link: "#"}, {name: "CV", img:"/cv-50.png", imgWhite:"/cv-white-50.png", link: "#"}]
    const sections = [{name: "Présentation" , id: "#"}, {name: "Compétences" , id: "#"}, {name: "Projets" , id: "#"} ]


    // const wrapperRef = useRef<HTMLButtonElement>(null)

    

 

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

    return (
        <header className="p-2 w-[98] h-16 flex justify-between sticky">
            <div>
                {/* responsive menu burger: display or not the burger menu depends on screen size
                    When the screen size is too small, we hide the menu options and display the burger menu. 
                    The user can then display the links whenever he or she wishes, without any discomfort.
                */}
                <BurgerMenu /> 
                <div className="hidden md:flex flex-col w-auto absolute -left-48 mt-1 ">
                    {links.map( (link, index) => {
                        return (
                            <MenuOptions index={index} key={index} isOpen={true} name={link.name} img={link.img} imgWhite={link.imgWhite}/>
                            
                        );                    
                    })}
                    
                </div>
            </div>
            <nav className="flex w-[70%] lg:w-[50%] justify-between items-center mr-6">
                {sections.map((section, index) => {
                    return (
                        <a key={index} className="hover:underline-offset-2 font-bold text-2xl" href={section.id}>{section.name}</a>
                    );
                })
                    
                }
            </nav>
           
                 
            
        </header>
    );
}