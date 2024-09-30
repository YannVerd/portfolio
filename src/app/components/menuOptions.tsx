import {useState} from "react";
import Image from "next/image";


interface IOptionsMenu {
    isOpen: boolean,
    index: number,
    name: string,
    img: string,
    imgWhite: string,
    link: string,
    hook(type: string): void,
}


export default function MenuOptions(props: IOptionsMenu){
    const [isHover, setIsHover] = useState(false);
   

    const handleBoutonHoverMenu = () =>{
        setIsHover(!isHover);
   
    }

    
    /* manage dynamic css with inline style: use 'index' for setup transisiton delay and use the name's props property for select colors variables */
    return (
        <>  
            <button
                onClick={() => { props.name === 'CV' ? props.hook('CV'): window.open(props.link) }}
                key={props.index}  
                style={{ transitionDelay: `${props.index * 100}ms`, }}
                onMouseEnter={handleBoutonHoverMenu}
                onMouseLeave={handleBoutonHoverMenu}
                className={
                    `hover:bg-gray-400 hover:text-white bg-white dark:bg-secondary p-4 flex justify-around items-center w-48 rounded-xl shadow-xl border-2 border-secondary dark:border-white
                        hover:shadow-inner hover:translate-x-44
                        transform transition-all duration-500 ${props.isOpen ? "translate-x-24": "-translate-x-0"}`
                } 
                ><p>{props.name}</p >{ isHover ? 
                <Image src={props.imgWhite} width={50} height={50} alt={props.name}/>
                :<Image src={props.img} width={50} height={50} alt={props.name}/>}
            </button>
        </>
    );
       
        
}