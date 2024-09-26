import React, {useRef,useState, useEffect} from "react";



export default function Header(){

    const links = [{name: "Git", link: "#"}, {name: "LinkedIn", link: "#"}, {name: "CV", link: "#"}]
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
                            <a 
                                key={index} 
                                style={{ transitionDelay: `${index * 100}ms`}}
                                className={`bg-white hover:bg-gray-200 hover:shadow-inner border-2 p-4 transform transition-all duration-500 ${isOpen ? "translate-x-40": "-translate-x-40"}`} href={link.link}>{link.name}</a>
                            
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