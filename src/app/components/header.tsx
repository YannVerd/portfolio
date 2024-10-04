import React from "react";
import MenuOptions from "./menuOptions";
import BurgerMenu from "./burgerMenu";
import SwitcherTheme from "./switcherTheme";
import { links, sections } from "../utils/constants.";

export interface IHeader{
    hook(type: string): void,
}

export default function Header(props: IHeader){
    

    return (
        <header className="p-2 w-full h-auto pb-4 flex justify-between sticky ">
            <div>
                {/* responsive menu burger: display or not the burger menu depends on screen size
                    When the screen size is too small, we hide the menu options and display the burger menu. 
                    The user can then display the links whenever he or she wishes, without any discomfort.
                */}
                <BurgerMenu hook={props.hook}/> 
                <div className="hidden lg:flex flex-col w-auto absolute top-40 -left-48 mt-1">
                    {links.map( (link, index) => {
                        return (
                            <MenuOptions index={index} key={index} isOpen={true} name={link.name} img={link.img} imgWhite={link.imgWhite} link={link.link} hook={props.hook}/>
                            
                        );                    
                    })}
                    
                </div>
            </div>
            <nav className="hidden md:flex w-[80%] lg:w-[50%] flex-col md:flex-row flex-wrap justify-end items-center mr-6 md:gap-28">
                {
                    sections.map((section, index) => {
                        return (
                            <a key={index} className="hover:text-secondary hover:decoration-secondary hover:animate-blink hover:underline font-bold text-2xl" href={`#${section.id}`}>{section.name}</a>
                        );
                    })                  
                }
                <SwitcherTheme />
            </nav>  
        </header>
    );
}