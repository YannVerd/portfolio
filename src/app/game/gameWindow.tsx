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

class GameIntervals{
    generateVirus?: NodeJS.Timeout |  string | number |undefined;
    movementsVirus?: NodeJS.Timeout  | string | number | undefined;
    movementsShoots?: NodeJS.Timeout  | string | number | undefined;

}

export default function GameWindow(props: IModal){
    const gameWin = useRef<HTMLDivElement>(null);
    const [gameSizes, setGameSizes] = useState<IGameWin>({ width: 0, height: 0 });
    const [playerX, setPlayerX]= useState(0);
    const [virusList, setVirusList]= useState<Array<IVirus>>([]);
    const [shootsList, setShootsList]= useState<Array<IShoot>>([]);

    // game variables
    let virusSpeed = 10;
    let playerSpeed= 10;
    let gameSpeed = 500;
    

    // constants physics
    const virusHitBox = 30;
    const playerHitBox = 25;

    // intervals
    const intervalsRef = useRef<{ generateVirus?: NodeJS.Timeout; movementsVirus?: NodeJS.Timeout }>({});

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.code) {      
            case "ArrowLeft":
                setPlayerX((value) => (value - playerSpeed > 0 - playerHitBox ? value - playerSpeed : value));
                break;
            case "ArrowRight":
                setPlayerX((value) => (value + playerSpeed < gameSizes.width - playerHitBox ? value + playerSpeed : value));
                break;

            case 'Space':
                console.log('shoot');
                generateShoot();
                break;
    
        }
    };

    useEffect(()=>{
        console.log(props.isVisible)
        window.addEventListener('keydown', handleKeyDown);
        
        if(gameWin.current && props.isVisible){ // test if modal game is visible and div mounted
            const { width, height } = gameWin.current.getBoundingClientRect();
            setGameSizes((win) => {
                win.height = height;
                win.width = width;
                return win;
            });
            setPlayerX(Math.floor(width/2)); // set initial play position to the middel of de game window
            intervalsRef.current.generateVirus = setInterval(()=>{generateVirus()}, 4000); // generate Virus each 4 seconds
            intervalsRef.current.movementsVirus = setInterval(()=>{movementsVirus()}, gameSpeed); // mouve virus each seconds
            
            
            
        }
        return () => { // remove intervals when unmount or invisible
            window.removeEventListener("keydown", handleKeyDown);
            clearInterval(intervalsRef.current.generateVirus);
            clearInterval(intervalsRef.current.movementsVirus);
        };
        
    }, [props.isVisible]);


    const generateVirus = () => {
        setVirusList((prevList) => [
            ...prevList,
            { x: Math.random() * (gameSizes.width - virusHitBox), y: 0 },
        ]);
    }
    
    const generateShoot = () => {
        console.log(playerX);
        setShootsList((prevList) => [
            ...prevList,
            { x: playerX, y: 30 },
        ]);
    }



    const movementsVirus = () => {
        console.log(playerX)
        setVirusList((prevList) =>
            prevList
                .map((virus) => ({ // update virus coord
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
                    {
                        shootsList.map((shoot, index)=>{
                            return (
                                <span key={index} className="bg-white w-1 h-4 absolute" style={{left:`${shoot.x}px`, bottom:`${shoot.y}px`}}></span>
                            );
                        })
                    }
                    <Image src="/game/player.png" width={50} height={50} alt="easterEgg" className={`absolute bottom-0`} style={{left:`${playerX}px`}}/>
            </div>
        </div>
        
    );
}