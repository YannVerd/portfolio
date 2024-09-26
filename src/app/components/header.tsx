import React, {useRef,useState, useEffect} from "react";
import Image from "next/image";


export default function Header(){

    const links = [{name: "Git", img:"/github-50.png", link: "#"}, {name: "LinkedIn", img:"/linkedin-50.png",link: "#"}, {name: "CV", img:"/cv-50.png",link: "#"}]
    const sections = [{name: "Présentation" , id: "#"}, {name: "Compétences" , id: "#"}, {name: "Projets" , id: "#"} ]

    const [isOpen, setIsOpen] = useState(false);
    // const wrapperRef = useRef<HTMLButtonElement>(null)

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

    return (
        <header className="p-2 w-[98] h-16 flex justify-between sticky">
            <div>
                <button onClick={handleBurgerMenu}
                    // ref={wrapperRef}
                    className="group h-10 w-10 flex flex-col justify-center items-center border-2 rounded-md gap-1">
                        <span className="bg-black h-0.5 w-8 rounded-md duration-500 group-hover:rotate-45 group-hover:translate-y-1.5"></span>
                        <span className="bg-black h-0.5 w-8 rounded-md duration-500 group-hover:scale-x-0 transiton"></span>
                        <span className="bg-black h-0.5 w-8 rounded-md duration-500 group-hover:-rotate-45 group-hover:-translate-y-1.5"></span>
                </button>
                <div className="flex flex-col w-auto absolute -left-40 mt-1">
                    {links.map( (link, index) => {
                        return (
                            <button
                                key={index} 
                                style={{ transitionDelay: `${index * 100}ms`}}
                                className={
                                    `hover:bg-gray-200  p-4 flex justify-around items-center
                                        hover:shadow-inner hover:translate-x-40
                                        transform transition-all duration-500 ${isOpen ? "translate-x-24": "-translate-x-0"}`
                                } 
                                ><p>{link.name}</p><Image src={link.img} width={50} height={50} alt={link.name}></Image></button>
                            
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