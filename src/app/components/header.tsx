import React from "react";
import MenuOptions from "./menuOptions";
import BurgerMenu from "./burgerMenu";
import SwitcherTheme from "./switcherTheme";

export interface IHeader{
    hook(type: string): void,
}

export default function Header(props: IHeader){

    const links = [{name: "GitHub", img:"/github-50.png", imgWhite:"/github-white-50.png", link: "https://github.com/YannVerd"}, {name: "LinkedIn", img:"/linkedin-50.png",imgWhite:"/linkedin-white-50.png", link: "https://www.linkedin.com/in/yann-verdier-a7b457271/"}, {name: "CV", img:"/cv-50.png", imgWhite:"/cv-white-50.png", link: "#"}]
    const sections = [{name: "Présentation" , id: "presentationSection"}, {name: "Compétences" , id: "skillsSection"}, {name: "Projets" , id: "projectsSection"} ]


    

    return (
        <header className="p-2 w-full h-auto pb-4 flex justify-between sticky border-b-2 border-cv hover:animate-glowBlue">
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
            <nav className="flex w-[80%] lg:w-[50%] flex-col md:flex-row flex-wrap justify-between items-center mr-6 gap-2">
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