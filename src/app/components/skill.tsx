import Image from "next/image";

interface ISkill{
    name: string,
}

export default function Skill(props : ISkill){
    return (
            <div className="flex flex-col w-16 items-center">
                <Image src={`/skills/${props.name.toLowerCase()}.png`} width={150} height={150} alt={`${props.name}`}/>
                <h4 className="font-semibold md:text-xl">{props.name}</h4>
            </div>
    );
}