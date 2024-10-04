import Image from "next/image";
import { useState } from "react";
import { IGameWin, IVirus } from "./gameWindow";

interface IVirusElement{
    index: number,
    properties: IVirus,
    win: IGameWin,
    setFromArray(index: number, virus: IVirus): void,
    removeFromArray(index: number): void,
}



export default function VirusElement(props: IVirusElement){
    const [properties, setProperties] = useState(props.properties)
    const virusHitBox = 24;

    const movementsVirus = () => {
        setProperties((virus)=>{
            if(virus.y + 10 >= props.win.height - virusHitBox){
                virus.y += 10;
                return virus
            }
            virusOut();
            return virus   
        })
    }

    const virusOut = () => {
        props.removeFromArray(props.index)
    }

    return(
        <Image src="/game/virus.png" width={50} height={50} alt="easterEgg" className="absolute left-10" style={{left:`${properties.x}px`, top: `${properties.y}px`}}/>
    );
}