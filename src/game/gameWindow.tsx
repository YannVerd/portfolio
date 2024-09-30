import React from "react";
import { IModal } from "@/app/components/legalNotices";
import Image from "next/image";



export default function GameWindow(props: IModal){
    
    return (
            <div className="flex-col w-[70%] h-[80%] fixed border-gray-300 border-2 text-white bg-black shadow-lg left-[15%] top-[20%] z-50" style={{ display: props.isVisible ? 'flex' : 'none'}}>
                <div className="flex justify-between items-center w-full bg-blue-700 border-2 border-gray-400">
                    <h3 className="text-xl ml-">Virus attack</h3>
                    <button className="bg-gray-300 hover:bg-gray-200 text-white font-bold py-2 px-4 border my-1" onClick={()=> { props.hook('game')}}>X</button>
                </div>
                <div className="h-full w-full relative">
                        <Image src="/game/virus.png" width={50} height={50} alt="easterEgg" className="absolute left-10"/>
                        <Image src="/game/player.png" width={50} height={50} alt="easterEgg" className="absolute bottom-0"/>
                </div>
            </div>
        
    );
}