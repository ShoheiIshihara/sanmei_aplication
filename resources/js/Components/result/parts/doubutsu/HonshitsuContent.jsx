import React from 'react';
import { useSelector,useDispatch } from "react-redux";

import ModalLayout from '../ModalLayout';

export default function HonshitsuContent(){
    const result = useSelector(state => state.result.result.sanmei);
    let nikkanshiNo = result.action_area.nikkanshi_id;
    const individual_psychology = useSelector(state => state.result.result.individual_psychology);

    return(
        <div className='mx-auto w-full  h-[360px]'>
             <div className="card  shadow-md  bg-white h-full w-full ">
                <div className="card-body  w-full  pb-0">
                    <h2 className="card-title mx-auto">本質</h2>
                    <span className='text-2xl font-bold text-center'>{individual_psychology.honshitsu}</span>
                    <div className='w-[200px] h-[150px] mx-auto'>
                        <img
                            className="h-[150px] mx-auto"
                            src={`/images/doubutsu60/${nikkanshiNo}.png`}
                            alt={individual_psychology.honshitsu_chara_name}
                        />
                    </div>
                </div>
                <div className='flex justify-center w-full gap-2 mb-2'>
                    <button className='btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700' onClick={()=>window.honsthitsuModal.showModal()}>解説</button>
                </div>
            </div>
              {/* モーダル内容 */}
            <ModalLayout title='本質解説' idName='honsthitsuModal'>
                <h1 className='text-2xl text-center mt-8 mb-2 font-semibold lg:text-left lg:mb-4 '>{individual_psychology.honshitsu}</h1>
                <hr  className=" border-yellow-300"/>    
                <p className=' mt-4 text-lg tracking-normal my-12 lg:ml-4'>{individual_psychology.honshitsu_detail}</p>
          </ModalLayout>
        </div>
    )
}