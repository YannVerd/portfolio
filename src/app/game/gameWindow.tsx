import {useEffect, useRef, useState} from "react";
import { IModal } from "@/app/components/legalNotices";
import Image from "next/image";


export interface IVirus{
    x: number,
    y: number,
}

export interface IGameWin{
    width: number,
    height: number
}

interface IShoot{
    x: number,
    y: number,
}

export default function GameWindow(props: IModal){
    const gameWin = useRef<HTMLDivElement>(null);
    const [gameSizes, setGameSizes] = useState<IGameWin>({ width: 0, height: 0 });
    const [playerX, setPlayerX]= useState(0);
    const [virusList, setVirusList]= useState<Array<IVirus>>([]);
    const [shootsList, setShootList]= useState<Array<IShoot>>([])
    const virusSpeed= 10;
    const playerSpeed= 10;
    const gameSpeed = 500;
    
    const virusHitBox = 30;
    const playerHitBox = 25;

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.code) {      
          case 'ArrowLeft':
            setPlayerX((value) =>{
                if(value-playerSpeed > 0 - playerHitBox) {
                    return value -playerSpeed; 
                }
                return value
            } );
            break;
          case 'ArrowRight':
            setPlayerX((value) => {
                if((value+playerSpeed)  < gameSizes.width - playerHitBox ) {
                    return value + playerSpeed;
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
        
        if(gameWin.current && props.isVisible){
            const { width, height } = gameWin.current.getBoundingClientRect();
            setGameSizes((win) => {
                win.height = height;
                win.width = width;
                return win;
            });
            setPlayerX(Math.floor(width/2)); // set initial play position to the middel of de game window
            setInterval(()=>{generateVirus()}, 4000); // generate Virus each 4 seconds
            setInterval(()=>{movementsVirus()}, gameSpeed); // mouve virus each seconds
            
            
            
        }else{
        window.removeEventListener('keydown', handleKeyDown);
        }
        
    }, [props.isVisible]);


    const generateVirus = () => {
        setVirusList((prevList) => [
            ...prevList,
            { x: Math.random() * (gameSizes.width - virusHitBox), y: 0 },
        ]);
    }

    // const setFromArray = (index: number, virus: IVirus) => {
    //     setVirusList(list => {
    //         list[index]= virus;
    //         return list;
    //     })
        
    // }

    // const removeFromArray = (index: number) => {
    //     setVirusList( list =>{
    //         list.splice(index, 1);
    //         return list;
    //     })
    // }

    const movementsVirus = () => {
        setVirusList((prevList) =>
            prevList
                .map((virus) => ({
                    ...virus,
                    y: virus.y + virusSpeed,
                }))
                .filter((virus) => virus.y < gameSizes.height - virusHitBox) // remove virus out of window
        );
    }

    return (
        <div className="flex-col w-[70%] h-[80%] fixed border-gray-300 border-2 text-white bg-black shadow-lg left-[15%] top-[3%] z-50 overflow-hidden" style={{ display: props.isVisible ? 'flex' : 'none'}}>
            <div className="flex justify-between items-center w-full bg-blue-700 border-2 border-gray-400">
                <h3 className="text-xl ml-">Virus attack</h3>
                <button className="bg-gray-400 hover:bg-gray-200 text-white font-bold py-2 px-4 border my-1 mr-1" onClick={()=> { props.hook('game')}}>X</button>
            </div>
            <div ref={gameWin} className="h-full w-full relative">
                    {
                        virusList.map((virus, index)=>{
                            return (
                                <Image src="/game/virus.png" key={index} width={50} height={50} alt="easterEgg" className="absolute left-10" style={{left:`${virus.x}px`, top: `${virus.y}px`}}/>
                            );
                        })
                    }
                    <Image src="/game/player.png" width={50} height={50} alt="easterEgg" className={`absolute bottom-0`} style={{left:`${playerX}px`}}/>
            </div>
        </div>
        
    );
}