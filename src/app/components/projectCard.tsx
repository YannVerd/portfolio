import Image from "next/image";

interface IProjectCard{
    name: string,
    description: string,
    link: string,
}

export default function ProjectCard(props: IProjectCard){
    return (
        <button 
            onClick={() => {window.open(props.link)}} 
            className="flex flex-col lg:flex-row justify-start items-center p-4 bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-xl w-[80%] h-auto hover:animate-glowBlue ">
            <Image src={`/projects/${props.name.toLowerCase()}.png`} width={300} height={200} alt={`Image of ${props.name} project`} className="object-cover rounded-lg m-4 shadow-lg w-52 h-auto" />
            <div className="flex flex-col justify-around items-center lg:items-start object-cover">
                    <h4 className="text-2xl font-semibold mr-2 text-secondary">{`Projet ${props.name}`}</h4>
                    <p className="text-justify lg:text-start dark:text-white text-black">{props.description}</p>
            </div>
           
        </button>
    );
}