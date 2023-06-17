import React from 'react';
import { useSelector} from "react-redux";

import ModalLayout from '../ModalLayout';

export default function HyomenContent(){
    const result = useSelector(state => state.result.result.sanmei);
    const individual_psychology = useSelector(state => state.result.result.individual_psychology);

    return(
        <div className='mx-auto w-full  h-[360px]'>
             <div className="card  shadow-md  bg-white h-full w-full ">
                <div className="card-body pb-0">
                    <h2 className="card-title mx-auto text-2xl">表面 : <span className='font-bold text-center'>{individual_psychology.hyomen}</span></h2>
                    
                    <div className='w-[200px] h-[200px] mx-auto'>
                        <img
                            className='' 
                            src={`/images/doubutsu/${individual_psychology.hyomen_chara_name}.png`}
                            alt={individual_psychology.hyomen_chara_name}
                        />
                    </div>
                </div>
                <div className='flex justify-center w-full gap-2 mb-2'>
                    {/* <button className='btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700' onClick={()=>window.hyomenModal.showModal()}>解説</button> */}
                </div>
            </div>
            {/* モーダル内容 */}
            <ModalLayout title='表面解説' idName='hyomenModal'>  
                <hr  className=" border-yellow-300 mb-2"/>  
                    <p>{individual_psychology.hyomen}</p>
                    <p>{individual_psychology.hyomen_detail}</p>
            </ModalLayout>
        </div>
    )
}