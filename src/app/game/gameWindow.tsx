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
    virusId: number,
    shootId: number
}

interface IUpdatedCollision {
    virus: IGameObject;
    shoot: IGameObject;
    index: number;
}

export default function GameWindow(props: IModal){
    const gameWin = useRef<HTMLDivElement>(null);
    const [gameSizes, setGameSizes] = useState<IGameWin>({ width: 0, height: 0 });
    const [playerX, setPlayerX]= useState(0);
    const [virusList, setVirusList]= useState<Array<IGameObject>>([]);
    const [shootsList, setShootsList]= useState<Array<IGameObject>>([]);
    const [score, setScore]=useState(0);
    const [lives, setLives]=useState(5);
    
    const [upcomingCollisions, setUpcomingCollisions] = useState<Array<IObjectCollision>>([]);
    const playerXRef = useRef(0); // to bypass asynchronus effect for retrieve current value of
    const currentId = useRef(0);

    // game variables
    const virusSpeed = 5;
    const shootsSpeed = 20;
    const playerSpeed= 10;
    const gameSpeed = 100;
    const spawnSpeed = 4000;
    
    // constants physics
    const playerWidth = 48;
    const playerHeight = 25;
    const virusHitBox = 35;

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
        
        if(gameWin.current && props.isVisible && lives > 0){ // test if modal game is visible and div mounted
            const { width, height } = gameWin.current.getBoundingClientRect();
            setGameSizes((win) => {
                win.height = height;
                win.width = width;
                return win;
            });
            playerXRef.current = Math.floor(width/2);
            setPlayerX(Math.floor(width/2)); // set initial play position to the middel of de game window
            intervalsRef.current.generateVirus = setInterval(()=>{generateObject(gameObjectType.virus)}, spawnSpeed); // generate Virus each 4 seconds
            intervalsRef.current.movementsObjects = setInterval(()=>{movementsObject()}, gameSpeed); // move virus          
        }
        return () => { // remove intervals when unmount or hidden
            window.removeEventListener("keydown", handleKeyDown);
            clearInterval(intervalsRef.current.generateVirus);
            clearInterval(intervalsRef.current.movementsObjects);
        }; 
    }, [props.isVisible]);

    useEffect(() => {
        if (virusList.length > 0 && shootsList.length > 0) {
            detectUpcomingCollisions();
        }
        if(upcomingCollisions.length > 0){
            // console.log('upcoming collisions :',upcomingCollisions)
            detectCollisions();
        }
    }, [virusList, shootsList]);


    const generateObject = (type: string) => { 
        switch(type) {
            case gameObjectType.virus:
                setVirusList((prevList) => [
                    ...prevList,
                    { id: currentId.current, x: Math.random() * (gameSizes.width - virusHitBox), y: 0, width: virusHitBox, height: virusHitBox, upcomingCollision: false },
                ]);
                break;
                
            case gameObjectType.shoot:
                setShootsList((prevList) => [
                    ...prevList,
                    { id: currentId.current, x: playerXRef.current + playerWidth / 2, y: gameSizes.height - playerHeight, width: 4, height: 16, upcomingCollision: false },
                ]);
                break;
        }
        currentId.current++
    }

    const movementsObject = () => {
        setVirusList((prevList) => {
            const updatedList = prevList
                .map((virus) => ({ 
                    ...virus,
                    y: virus.y + virusSpeed, 
                }));
                
            // Count how many viruses are out of bounds
            const virusesOutOfBounds = updatedList.filter(
                (virus) => virus.y >= gameSizes.height - virus.height
            ).length;
            console.log(virusesOutOfBounds)
            // Filter the viruses that are still in bounds
            const filteredList = updatedList.filter(
                (virus) => virus.y < gameSizes.height - virus.height
            );
        
            // Decrease lives after the list is updated, ensuring it happens once per render
            if (virusesOutOfBounds > 0) {
                setLives((prevLives) => Math.max(prevLives - virusesOutOfBounds, 0));
                
            }
        
            return filteredList;
        });
        

        setShootsList((prevList) =>
            prevList
                .map((shoot) => ({ // update shoots coord
                    ...shoot,
                    y: shoot.y - shootsSpeed, // depend on bottom
                }))
                .filter((shoot) => shoot.y > 0 + shoot.height) // remove virus out of window
        );  
        
    }

    /** function that detects whether these new objects will collide with others. add this objects in the upcomingCollision array */
    const detectUpcomingCollisions = () => {
        const newCollisions: Array<IObjectCollision> = [];
        const updatedVirusList = [...virusList];
        const updatedShootsList = [...shootsList];
        let collisionDetected = false;
    
        updatedVirusList.forEach((virus) => {
            updatedShootsList.forEach((shoot) => {
                if (
                    virus.x < shoot.x + shoot.width &&
                    virus.x + virus.width > shoot.x &&
                    !shoot.upcomingCollision &&
                    !virus.upcomingCollision
                ) {
                    // console.log('objects will collide');
                    collisionDetected = true;
    
                    // set upcomingCollision property to true
                    shoot.upcomingCollision = true;
                    virus.upcomingCollision = true;
    
                    // add id's objects
                    newCollisions.push({ virusId: virus.id, shootId: shoot.id });
                }
            });
        });
    
        if (collisionDetected) {
            setUpcomingCollisions((prevList) => [...prevList, ...newCollisions]);
        }
    };
    
    
    /**this function detects the objects that will collide. And removes them from the list when they do. */
    const detectCollisions = () => {
        const updatedCollisions: IUpdatedCollision[] = upcomingCollisions.map((collision, index) => {
            const virus = virusList.find((v) => v.id === collision.virusId);
            const shoot = shootsList.find((s) => s.id === collision.shootId);
            return { virus, shoot, index };
        }) 
        .filter((collision): collision is IUpdatedCollision => !!collision.virus && !!collision.shoot);;
        // console.log('updatedCollision', updatedCollisions)
       
        for(let i = 0; i < updatedCollisions.length; i ++){
            if(updatedCollisions[i].virus && updatedCollisions[i].shoot){
                if(updatedCollisions[i].virus.y + updatedCollisions[i].virus.height > updatedCollisions[i].shoot.y ) {
                    // update  upcomingCollisions to remove actual object
                    setUpcomingCollisions((list) => {
                        const newList = [...list]; 
                        newList.splice(updatedCollisions[i].index, 1); //remove object into list
                        return newList; // Retourner la nouvelle liste
                    });

                    // update virus list
                    setVirusList((list) => {
                        return list.filter(virus => virus.id !== updatedCollisions[i].virus.id);
                    });

                    // update shoots list
                    setShootsList((list) => {
                        return list.filter(shoot => shoot.id !== updatedCollisions[i].shoot.id); 
                    });
                    setScore((score)=>score+1)
                }
            }
        }

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
                    <Image src="/game/player.png" width={50} height={50} alt="easterEgg" className="absolute bottom-0" style={{left:`${playerX}px`}}/>
                    <h4 className="absolute top-0 left-[3%]">Life: {lives}</h4>
                    <h4 className="absolute top-0 right-[5%]">Score: {score}</h4>
                    
            </div>
        </div>
        
    );
} 