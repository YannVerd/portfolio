import Image from "next/image";

interface ISkillCard{
    name: string,
}

export default function SkillCard(props : ISkillCard){
    return (
            <div className="flex flex-col w-16 items-center">
                <Image src={`/skills/${props.name.toLowerCase()}.png`} width={150} height={150} alt={`${props.name}`} className="w-auto h-14"/>
                <h4 className="font-semibold md:text-xl">{props.name}</h4>
            </div>
    );
}