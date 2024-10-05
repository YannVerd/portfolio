import {useEffect, useRef, useState} from "react";
import { IModal } from "@/app/components/legalNotices";
import Image from "next/image";
import { gameObjectType } from "../utils/constants.";


interface IGameObject{
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    upcomingCollision: boolean,
}

interface IGameWin{ // Game Window (div)
    width: number,
    height: number
}

interface IObjectCollision{
    virus: IGameObject,
    shoot: IGameObject
}

export default function GameWindow(props: IModal){
    const gameWin = useRef<HTMLDivElement>(null);
    const [gameSizes, setGameSizes] = useState<IGameWin>({ width: 0, height: 0 });
    const [playerX, setPlayerX]= useState(0);
    const [virusList, setVirusList]= useState<Array<IGameObject>>([]);
    const [shootsList, setShootsList]= useState<Array<IGameObject>>([]);
    const [currentId, setCurrentId] = useState(0);
    const [upcomingCollisions, setUpcomingCollisions] = useState<Array<IObjectCollision>>([]);
    let playerXRef = useRef(0); // to bypass asynchronus effect for retrieve current value of 

    // game variables
    let virusSpeed = 10;
    let shootsSpeed = 20;
    let playerSpeed= 10;
    let gameSpeed = 500;
    
    // constants physics
    const playerWidth = 48;
    const playerHeight = 25;
    const virusHitBox = 30;

    // intervals
    const intervalsRef = useRef<{ generateVirus?: NodeJS.Timeout; movementsObjects?: NodeJS.Timeout }>({});

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.code) {      
            case "ArrowLeft":
                setPlayerX((value) => {
                    const newX = value - playerSpeed > 0 - playerWidth? value - playerSpeed : value;
                    playerXRef.current = newX; // update ref
                    return newX;
                });
                break;
            case "ArrowRight":
                setPlayerX((value) => {
                    const newX = value + playerSpeed < gameSizes.width - playerWidth ? value + playerSpeed : value;
                    playerXRef.current = newX;
                    return newX;
                });
                break;
            case 'Space':
                generateObject(gameObjectType.shoot);
                break;
    
        }
    };

    useEffect(()=>{
        window.addEventListener('keydown', handleKeyDown);
        
        if(gameWin.current && props.isVisible){ // test if modal game is visible and div mounted
            const { width, height } = gameWin.current.getBoundingClientRect();
            setGameSizes((win) => {
                win.height = height;
                win.width = width;
                return win;
            });
            setPlayerX(Math.floor(width/2)); // set initial play position to the middel of de game window
            intervalsRef.current.generateVirus = setInterval(()=>{generateObject(gameObjectType.virus)}, 4000); // generate Virus each 4 seconds
            intervalsRef.current.movementsObjects = setInterval(()=>{movementsObject()}, gameSpeed); // move virus          
        }
        return () => { // remove intervals when unmount or invisible
            window.removeEventListener("keydown", handleKeyDown);
            clearInterval(intervalsRef.current.generateVirus);
            clearInterval(intervalsRef.current.movementsObjects);
        }; 
    }, [props.isVisible]);


    const generateObject = (type: string) => {
        switch(type){
            case gameObjectType.virus:
                setVirusList((prevList) => [
                    ...prevList,
                    { id: currentId, x: Math.random() * (gameSizes.width - virusHitBox), y: 0, width: virusHitBox, height: virusHitBox, upcomingCollision: false },
                ]);
                setCurrentId((id)=>id++);
                break;
               
            case gameObjectType.shoot:
                setShootsList((prevList) => [
                    ...prevList,
                    { id: currentId, x: playerXRef.current + playerWidth / 2, y: gameSizes.height - playerHeight , width: 4, height: 16, upcomingCollision: false },
                ]);
                setCurrentId((id)=>id++);
                break;
        } 
        detectUpcomingCollisions();   
    }

    const movementsObject = () => {

        setVirusList((prevList) =>
            prevList
                .map((virus) => ({ // update virus coord
                    ...virus,
                    y: virus.y + virusSpeed, // depend on top
                }))
                .filter((virus) => virus.y < gameSizes.height - virus.height) // remove virus out of window
        );

        setShootsList((prevList) =>
            prevList
                .map((shoot) => ({ // update shoots coord
                    ...shoot,
                    y: shoot.y - shootsSpeed, // depend on bottom
                }))
                .filter((shoot) => shoot.y > 0 + shoot.height) // remove virus out of window
        );  
        
        detectCollisions();
    }

    /** when an object is created, we detect whether these new objects will collide with others. add this objects in the upcomingCollision array */
    const detectUpcomingCollisions = () => {

        virusList.forEach((virus) => {
            shootsList.forEach((shoot) => {
                if (
                    virus.x < shoot.x + shoot.width &&
                    virus.x + virus.width > shoot.x &&
                    !shoot.upcomingCollision
                  ) {
                    setUpcomingCollisions((prevList)=>{
                        let newList = [...prevList];
                        shoot.upcomingCollision = true;
                        virus.upcomingCollision = true;
                        newList.push({virus: virus, shoot: shoot});
                        return newList
                    })
                  }
            })
        });

    }

    /**this function detects the objects that will collide. And removes them from the list when they do. */
    const detectCollisions = () => {
        upcomingCollisions.forEach((collision, index) => {
            if(collision.virus.y + collision.virus.height > collision.shoot.y ) {
                setUpcomingCollisions((list => {
                    list.splice(index, 1);
                    return list;
                }))
                setVirusList((list)=>{
                    list.filter( virus => virus.id !== collision.virus.id);
                    return list;
                })
                setShootsList((list)=>{
                    list.filter( shoot => shoot.id !== collision.shoot.id);
                    return list;
                })
            }
        })
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
                                <span key={index} className="bg-white w-1 h-4 absolute" style={{left:`${shoot.x}px`, top:`${shoot.y}px`}}></span>
                            );
                        })
                    }
                    <Image src="/game/player.png" width={50} height={50} alt="easterEgg" className={`absolute bottom-0`} style={{left:`${playerX}px`}}/>
            </div>
        </div>
        
    );
} 