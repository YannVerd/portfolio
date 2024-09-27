import React, {useRef,useState, useEffect} from "react";
import MenuOptions from "./menuOptions";
import MenuBurger from "./burgerMenu";
import BurgerMenu from "./burgerMenu";
import SwitcherTheme from "./switcherTheme";



export default function Header(){

    const links = [{name: "GitHub", img:"/github-50.png", imgWhite:"/github-white-50.png", link: "#"}, {name: "LinkedIn", img:"/linkedin-50.png",imgWhite:"/linkedin-white-50.png", link: "#"}, {name: "CV", img:"/cv-50.png", imgWhite:"/cv-white-50.png", link: "#"}]
    const sections = [{name: "Présentation" , id: "#"}, {name: "Compétences" , id: "#"}, {name: "Projets" , id: "#"} ]


    

    return (
        <header className="p-2 w-full h-16 flex justify-between sticky border-b-2 border-cv hover:animate-glowBlue">
            <div>
                {/* responsive menu burger: display or not the burger menu depends on screen size
                    When the screen size is too small, we hide the menu options and display the burger menu. 
                    The user can then display the links whenever he or she wishes, without any discomfort.
                */}
                <BurgerMenu /> 
                <div className="hidden md:flex flex-col w-auto absolute top-40 -left-48 mt-1 ">
                    {links.map( (link, index) => {
                        return (
                            <MenuOptions index={index} key={index} isOpen={true} name={link.name} img={link.img} imgWhite={link.imgWhite}/>
                            
                        );                    
                    })}
                    
                </div>
            </div>
            <nav className="flex w-[80%] lg:w-[50%] justify-between items-center mr-6">
                {
                    sections.map((section, index) => {
                        return (
                            <a key={index} className="hover:text-secondary hover:decoration-secondary hover:animate-blink underline font-bold text-2xl" href={section.id}>{section.name}</a>
                        );
                    })                  
                }
                <SwitcherTheme />
            </nav>
           
                 
            
        </header>
    );
}