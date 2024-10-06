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
    const [currentId, setCurrentId] = useState(0);
    const [upcomingCollisions, setUpcomingCollisions] = useState<Array<IObjectCollision>>([]);
    const playerXRef = useRef(0); // to bypass asynchronus effect for retrieve current value of 

    // game variables
    const virusSpeed = 10;
    const shootsSpeed = 20;
    const playerSpeed= 10;
    const gameSpeed = 500;
    
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
            playerXRef.current = Math.floor(width/2);
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

    useEffect(() => {
        if (virusList.length > 0 && shootsList.length > 0) {
            detectUpcomingCollisions();
        }
        if(upcomingCollisions.length > 0){
            console.log('upcoming collisions :',upcomingCollisions)
            detectCollisions();
        }
    }, [virusList, shootsList]);

    const generateObject = (type: string) => {
        setCurrentId((id) => {
    
            switch(type) {
                case gameObjectType.virus:
                    setVirusList((prevList) => [
                        ...prevList,
                        { id: id, x: Math.random() * (gameSizes.width - virusHitBox), y: 0, width: virusHitBox, height: virusHitBox, upcomingCollision: false },
                    ]);
                    break;
                   
                case gameObjectType.shoot:
                    setShootsList((prevList) => [
                        ...prevList,
                        { id: id, x: playerXRef.current + playerWidth / 2, y: gameSizes.height - playerHeight, width: 4, height: 16, upcomingCollision: false },
                    ]);
                    break;
            }
            const newId = id + 1;
            return newId;
        });
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
        
    }

    /** when an object is created, we detect whether these new objects will collide with others. add this objects in the upcomingCollision array */
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
                    console.log('objects will collide');
                    collisionDetected = true;
    
                    // Marquer les objets comme ayant une collision
                    shoot.upcomingCollision = true;
                    virus.upcomingCollision = true;
    
                    // Ajouter seulement les IDs à upcomingCollisions
                    newCollisions.push({ virusId: virus.id, shootId: shoot.id });
                }
            });
        });
    
        if (collisionDetected) {
            setUpcomingCollisions((prevList) => [...prevList, ...newCollisions]);
        }
        console.log('upcomingCollisions', upcomingCollisions)
    };
    
    
    /**this function detects the objects that will collide. And removes them from the list when they do. */
    const detectCollisions = () => {
        const updatedCollisions: IUpdatedCollision[] = upcomingCollisions.map((collision, index) => {
            const virus = virusList.find((v) => v.id === collision.virusId);
            const shoot = shootsList.find((s) => s.id === collision.shootId);
            return { virus, shoot, index };
        }) 
        .filter((collision): collision is IUpdatedCollision => !!collision.virus && !!collision.shoot);;
        console.log('updatedCollision', updatedCollisions)
       
        for(let i = 0; i < updatedCollisions.length; i ++){
            if(updatedCollisions[i].virus && updatedCollisions[i].shoot){
                if(updatedCollisions[i].virus.y + updatedCollisions[i].virus.height > updatedCollisions[i].shoot.y ) {
                    console.log('bou')
                    // Mettre à jour upcomingCollisions en supprimant l'élément actuel
                    setUpcomingCollisions((list) => {
                        const newList = [...list]; // Créer une copie de la liste
                        newList.splice(updatedCollisions[i].index, 1); // Supprimer l'élément en collision
                        return newList; // Retourner la nouvelle liste
                    });

                    // Mettre à jour la liste des virus
                    setVirusList((list) => {
                        return list.filter(virus => virus.id !== updatedCollisions[i].virus.id); // Filtrer les virus qui ne sont pas en collision
                    });

                    // Mettre à jour la liste des tirs
                    setShootsList((list) => {
                        return list.filter(shoot => shoot.id !== updatedCollisions[i].shoot.id); // Filtrer les tirs qui ne sont pas en collision
                    });
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
                    <Image src="/game/player.png" width={50} height={50} alt="easterEgg" className={`absolute bottom-0`} style={{left:`${playerX}px`}}/>
            </div>
        </div>
        
    );
} 