import {useEffect, useRef, useState} from "react";
import { IModal } from "@/app/components/legalNotices";
import Image from "next/image";
import { difficulties, gameObjectType } from "../utils/constants.";


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

interface IGameSettings{
    virusSpeed: number;
    playerSpeed: number;  
    shootsSpeed: number;  
    gameSpeed: number;
    spawnSpeed: number;
}

export default function GameWindow(props: IModal){
    const gameWin = useRef<HTMLDivElement>(null);
    const [gameSizes, setGameSizes] = useState<IGameWin>({ width: 0, height: 0 });
    const [playerX, setPlayerX]= useState(0); // keep this useState state for rendering
    const [virusList, setVirusList]= useState<Array<IGameObject>>([]);
    const [shootsList, setShootsList]= useState<Array<IGameObject>>([]);
    const [score, setScore]=useState(0);
    const [lives, setLives]=useState(5);
    const [gameOver, setGameOver] = useState(false);
    const [gameLevel, setGameLevel] = useState (difficulties[0].name)
    const [upcomingCollisions, setUpcomingCollisions] = useState<Array<IObjectCollision>>([]);


    const playerXRef = useRef(0); // to bypass asynchronus effect for retrieve current value of player x coordQ
    const currentId = useRef(0);

    const initialsGameSettings: IGameSettings= {
        virusSpeed: 5,
        playerSpeed: 10,  
        shootsSpeed: 15,  
        gameSpeed: 100,
        spawnSpeed:2500,

    }
    
    const gameSettings = useRef<IGameSettings>({
        virusSpeed: initialsGameSettings.virusSpeed,
        playerSpeed: initialsGameSettings.playerSpeed, 
        shootsSpeed: initialsGameSettings.shootsSpeed, 
        gameSpeed: initialsGameSettings.gameSpeed,
        spawnSpeed: initialsGameSettings.spawnSpeed,
    });
    
    // constants physics game
    const playerWidth = 48;
    const playerHeight = 25;
    const virusHitBox = 40;
  
    // intervals
    const intervalsRef = useRef<{ generateVirus?: NodeJS.Timeout; movementsObjects?: NodeJS.Timeout }>({});

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.code) {      
            case "ArrowLeft":
                setPlayerX((value) => {
                    const newX = value - gameSettings.current.playerSpeed > 0 - playerWidth? value - gameSettings.current.playerSpeed : value;
                    playerXRef.current = newX; // update ref
                    return newX;
                });
                break;
            case "ArrowRight":
                setPlayerX((value) => {
                    const newX = value + gameSettings.current.playerSpeed < gameSizes.width - playerWidth ? value + gameSettings.current.playerSpeed : value;
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
        
        if(gameWin.current && props.isVisible && !gameOver){ // test if modal game is visible and div mounted
            const { width, height } = gameWin.current.getBoundingClientRect();
            setGameSizes((win) => {
                win.height = height;
                win.width = width;
                return win;
            });
            playerXRef.current = Math.floor(width/2);
            setPlayerX(Math.floor(width/2)); // set initial play position to the middel of de game window
            intervalsRef.current.generateVirus = setInterval(()=>{generateObject(gameObjectType.virus)}, gameSettings.current.spawnSpeed); // generate Virus each 4 seconds
            intervalsRef.current.movementsObjects = setInterval(()=>{movementsObject()}, gameSettings.current.gameSpeed); // move virus          
        }
        return () => { // remove intervals when unmount or hidden
            window.removeEventListener("keydown", handleKeyDown);
            clearInterval(intervalsRef.current.generateVirus);
            clearInterval(intervalsRef.current.movementsObjects);
        }; 
    }, [props.isVisible, gameOver]);

    useEffect(() => {
        if (virusList.length > 0 && shootsList.length > 0) {
            detectUpcomingCollisions();
        }
        if(upcomingCollisions.length > 0){
            // console.log('upcoming collisions :',upcomingCollisions)
            detectCollisions();
        }
    }, [virusList, shootsList]);

    //handle difficulty
    useEffect(()=>{
        const ten= Math.floor(score/10);
        if(score >= 10 && !difficulties[ten].reach){ // change difficulty every ten
            difficulties[ten].reach = true
            setGameLevel(difficulties[ten].name);   
                ten < 4 ? gameSettings.current.spawnSpeed -= 300 : gameSettings.current.spawnSpeed -= 500;
                console.log(gameSettings.current.spawnSpeed)
                gameSettings.current.virusSpeed += 5;
                console.log(gameSettings.current.virusSpeed)
                if(ten === 4){
                    gameSettings.current.playerSpeed += 5;
                }

        }
    }, [score])

    // handle Game Over
    useEffect(()=>{
        if(lives < 1){
            // retrieve initial values for all game settings
            setGameOver(true);
            clearInterval(intervalsRef.current.generateVirus);
            clearInterval(intervalsRef.current.movementsObjects);
            setScore(0);
            setLives(5);
            setVirusList(()=> []);
            setShootsList(()=>[]);
            setUpcomingCollisions(()=>[]);
            setGameLevel(difficulties[0].name)
            for(const key in gameSettings.current){
                const typedKey = key as keyof IGameSettings;
                gameSettings.current[typedKey] = initialsGameSettings[typedKey];
            }
        }
    }, [lives])


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
        // console.log("in movementsObject function")
        setVirusList((prevList) => {
            const updatedList = prevList
                .map((virus) => ({ 
                    ...virus,
                    y: virus.y + gameSettings.current.virusSpeed, 
                }));
                
            // Count how many viruses are out of bounds
            const virusesOutOfBounds = updatedList.filter(
                (virus) => virus.y >= gameSizes.height - virus.height
            ).length;
            // console.log("in setVirusList, virus out counts :", virusesOutOfBounds)
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
                    y: shoot.y - gameSettings.current.shootsSpeed, // depend on bottom
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
            <div className="flex justify-between items-center w-full bg-gradient-to-r from-win98blue1 via-win98blue2 to-win98blue3 border-2 border-gray-400">
                <h3 className="text-xl ml-2">Virus attack</h3>
                <button className="bg-gray-400 hover:bg-gray-200 text-white font-bold py-2 px-4 border my-1 mr-1" onClick={()=> { props.hook('game')}}>X</button>
            </div>
            { 
                gameOver ? 
                <div ref={gameWin} className="h-full w-full flex flex-col justify-center items-center">
                    <h2 className="text-2xl"> Game Over</h2>
                    <h3>Final Score : {score}</h3>
                    <button className="bg-transparent" onClick={()=> setGameOver(false)}>retry</button>
                </div>
                :
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
                    <h4 className="absolute top-0 left-[20%]">Level: {gameLevel}</h4>
                    <h4 className="absolute top-0 right-[5%]">Score: {score}</h4>
                    <p className="absolute bottom-10 ml-2 text-gray-500"> left and rigth: move</p>
                    <p className="absolute bottom-6 ml-2 text-gray-500"> space: shoot</p>


                    
                </div>
            }
        </div>
        
    );
} 