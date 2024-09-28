import React from "react";


export interface IModal {
    isVisible: boolean,
    hook(type: string): void,
}

export default function LegalNotices(props: IModal){
    
    return (
        <>
            <div className="w-[70%] h-auto fixed rounded-lg border-secondary border-2 dark:bg-black shadow-lg left-[15%] top-[20%] flex-col justify-around items-center gap-4  z-50 bg-white p-4 overflow-hidden" style={{ display: props.isVisible ? 'flex' : 'none'}}>
                <h2 className="text-6xl font-semibold text-secondary self-center">Mentions légales</h2>
                <h3 className="text-3xl font-semibold">Propriétaire</h3>
                <p>Nom: Yann Verdier</p>
                <p>email: yann.e.verdier@gmail.com</p>
                <p>Ce site est hébergé par la société Vercel Inc., située 340 S Lemon Ave #4133 Walnut, CA 91789, et joignable au (559) 288-7060.</p>
                <button className="bg-secondary hover:bg-secondaryLight text-white font-bold py-2 px-4 border mt-1 border-secondary rounded" onClick={()=> { props.hook('legalNotices')}}>close</button>
            </div>
        </>
        
    );
}