import { IModal } from "./legalNotices";

export default function CVModal(props: IModal){
    return (
        <div className="bg-white w-[80%] md:w-fit h-fit md:h-[70%] fixed rounded-lg border-secondary border-2 dark:bg-black shadow-lg left-0 lg:left-[10%] top-[8%] flex-col justify-around items-center z-50" style={{ display: props.isVisible ? 'flex' : 'none'}}>
            <iframe src={"/pdf/cv.pdf#navpanes=0&toolbar=1&view=fit&zoom=300"}  height={800} width={600}/>
            <button className="bg-secondary hover:bg-secondaryLight text-white font-bold py-2 px-4 mb-2 border mt-1 border-secondary rounded" onClick={()=> { props.hook('CV')}}>close</button>
        </div>
        
    );
}