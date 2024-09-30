import Image from "next/image";

interface IProject{
    name: string,
    description: string,
    link: string,
}

export default function Project(props: IProject){
    return (
        <div className="flex flex-col lg:flex-row justify-start items-center p-4 bg-gray-200 dark:bg-gray-900 border-secondary border-2 rounded-lg shadow-lg w-[80%] h-auto hover:animate-glowBlue ">
                <Image src={`/projects/${props.name.toLowerCase()}.png`} width={300} height={200} alt={`Image of ${props.name} project`} className="object-cover rounded-lg m-4 shadow-lg" />

            
            <div className="flex flex-col justify-between">
                <div className="flex justify-stretch items-center">
                    <h4 className="text-2xl font-semibold mr-2 text-secondary">{`Projet ${props.name}`}</h4>
                    <a href={props.link} target="_blank"><Image src={"/github-white-50.png"} width={40} height={40} alt="github picture" className="bg-white rounded-full"/></a>
                </div>
                <p>{props.description}</p>
            </div>
           
        </div>
    );
}