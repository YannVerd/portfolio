import {useState} from "react";
import Image from "next/image";


interface IOptionsMenu {
    isOpen: boolean,
    index: number,
    name: string,
    img: string,
    imgWhite: string,
}


export default function MenuOptions(props: IOptionsMenu){
    const [isHover, setIsHover] = useState(false);

    const handleBoutonHoverMenu = () =>{
        setIsHover(!isHover);
        console.log(isHover)
    }

    return (
        <button
            key={props.index} 
            style={{ transitionDelay: `${props.index * 100}ms`}}
            onMouseEnter={handleBoutonHoverMenu}
            onMouseLeave={handleBoutonHoverMenu}
            className={
                `hover:bg-gray-400 hover:text-white  p-4 flex justify-around items-center
                    hover:shadow-inner hover:translate-x-40
                    transform transition-all duration-500 ${props.isOpen ? "translate-x-24": "-translate-x-0"}`
            } 
            ><p>{props.name}</p >{ isHover ? 
            <Image src={props.imgWhite} width={50} height={50} alt={props.name}/>
            :<Image src={props.img} width={50} height={50} alt={props.name}/>}</button>
    );
}