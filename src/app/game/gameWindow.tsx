import {useEffect, useRef, useState} from "react";
import { IModal } from "@/app/components/legalNotices";
import Image from "next/image";
import VirusElement from "./virus";

export interface IVirus{
    x: number,
    y: number,
}

export interface IGameWin{
    width: number,
    height: number
}

export default function GameWindow(props: IModal){
    const gameWin = useRef<HTMLDivElement>(null);
    const [gameSizes, setGameSizes] = useState<IGameWin>({ width: 0, height: 0 });
    const [playerX, setPlayerX]= useState(0);
    const [virusList, setVirusList]= useState<Array<IVirus>>([]);

    const playerHitBox = 25

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
   
          case 'ArrowLeft':
            setPlayerX((value) =>{
                if(value-10 > 0 - playerHitBox) {
                    return value -10; 
                }
                return value
            } );
            break;
          case 'ArrowRight':
            setPlayerX((value) => {
                if((value+10)  < gameSizes.width - playerHitBox ) {
                    return value + 10;
                }
                return value;
            });
          break;

          case 'Space':
              console.log('shoot');
          break;
    
        }
    };

    useEffect(()=>{
        window.addEventListener('keydown', handleKeyDown);
        if(gameWin.current){
                const { width, height } = gameWin.current.getBoundingClientRect();
                setGameSizes((win) => {
                    win.height = height;
                    win.width = width;
                    return win;
                });
                setPlayerX(Math.floor(width/2)); // set initial play position to the middel of de game window
                setInterval(() => {generateVirus()}, 4000);
                
                
        }
        if(!props.isVisible){
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [props.isVisible]);

    const generateVirus = () => {
        let virus = {
            x: Math.random()* (gameSizes.width - 24) + 24,
            y: 0
        }
        setVirusList(list=>[...list, virus])
    }

    const setFromArray = (index: number, virus: IVirus) => {
        setVirusList(list => {
            list[index]= virus;
            return list;
        })
        
    }

    const removeFromArray = (index: number) => {
        setVirusList( list =>{
            list.splice(index, 1);
            return list;
        })
    }

    return (
        <div className="flex-col w-[70%] h-[80%] fixed border-gray-300 border-2 text-white bg-black shadow-lg left-[15%] top-[3%] z-50" style={{ display: props.isVisible ? 'flex' : 'none'}}>
            <div className="flex justify-between items-center w-full bg-blue-700 border-2 border-gray-400">
                <h3 className="text-xl ml-">Virus attack</h3>
                <button className="bg-gray-400 hover:bg-gray-200 text-white font-bold py-2 px-4 border my-1 mr-1" onClick={()=> { props.hook('game')}}>X</button>
            </div>
            <div ref={gameWin} className="h-full w-full relative">
                    {
                        virusList.map((virus, index)=>{
                            return (
                                <VirusElement key={index} index={index} properties={virus} win={gameSizes} setFromArray={setFromArray} removeFromArray={removeFromArray}/>
                            );
                        })
                    }
                    <Image src="/game/player.png" width={50} height={50} alt="easterEgg" className={`absolute bottom-0`} style={{left:`${playerX}px`}}/>
            </div>
        </div>
        
    );
}