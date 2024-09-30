import { IModal } from "./legalNotices";

export default function CVModal(props: IModal){
    return (
        <div className="bg-white w-[95%] h-[90%] fixed rounded-lg border-secondary border-2 dark:bg-black shadow-lg left-2 lg:left-[3%] top-[6%] flex-col justify-around items-center z-50" style={{ display: props.isVisible ? 'flex' : 'none'}}>
            <object data="/pdf/cv.pdf" type="application/pdf" width="100%" height="100%"></object>
            <button className="bg-secondary hover:bg-secondaryLight text-white font-bold py-2 px-4 mb-2 border mt-1 border-secondary rounded" onClick={()=> { props.hook('CV')}}>close</button>
        </div>
        
    );
}