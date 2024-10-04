import {useEffect, useRef, useState} from "react";
import { IModal } from "@/app/components/legalNotices";
import Image from "next/image";



export default function GameWindow(props: IModal){
    const gameWin = useRef<HTMLDivElement>(null);
    const [gameSizes, setGameSizes] = useState({ width: 0, height: 0 });
    const [playerX, setPlayerX]= useState(0);
    const [virus, setVirusPos]= useState({ x: 0, y: 0, hitbox: 24 })
    const [virusList, setVirusList]= useState<Array<{x: number, y: number, hitbox:number}>>([]);
    const virusHitBox = 24;
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
                setVirusPos((virus) => {
                    virus.x = Math.random()* (width - 24) + 24;
                    return virus;
                })
                
        }
        if(!props.isVisible){
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [props.isVisible]);

    return (
        <div className="flex-col w-[70%] h-[80%] fixed border-gray-300 border-2 text-white bg-black shadow-lg left-[15%] top-[3%] z-50" style={{ display: props.isVisible ? 'flex' : 'none'}}>
            <div className="flex justify-between items-center w-full bg-blue-700 border-2 border-gray-400">
                <h3 className="text-xl ml-">Virus attack</h3>
                <button className="bg-gray-400 hover:bg-gray-200 text-white font-bold py-2 px-4 border my-1 mr-1" onClick={()=> { props.hook('game')}}>X</button>
            </div>
            <div ref={gameWin} className="h-full w-full relative">
                    <Image src="/game/virus.png" width={50} height={50} alt="easterEgg" className="absolute left-10" style={{left:`${virus.x}px`, top: `${virus.y}px`}}/>
                    <Image src="/game/player.png" width={50} height={50} alt="easterEgg" className={`absolute bottom-0`} style={{left:`${playerX}px`}}/>
            </div>
        </div>
        
    );
}