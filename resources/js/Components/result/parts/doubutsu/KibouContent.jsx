import React from 'react';
import { useSelector } from "react-redux";


export default function KibouContent(){
    const result = useSelector(state => state.result.result.sanmei);
    const individual_psychology = useSelector(state => state.result.result.individual_psychology);

    return(
        <div className='mx-auto w-full  h-[360px]'>
             <div className="card  shadow-md  bg-white h-full w-full ">
                <div className="card-body  pb-0 ">
                    <h2 className="card-title mx-auto text-2xl">希望 : <span className=' font-bold text-center '>{individual_psychology.kibou}</span></h2>
                    <div className='w-[200px] h-[200px] mx-auto'>
                        <img
                            className=" "
                            src={`/images/doubutsu/${individual_psychology.kibou_chara_name}.png`}
                            alt={individual_psychology.kibou_chara_name}
                        />
                    </div>
                </div>
                <div className='flex justify-center w-full gap-2 mb-2'>
                    {/* <button className='btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700' onClick={()=>window.kibouModal.showModal()}>解説</button> */}
                </div>
            </div>
              {/* モーダル内容 */}
            <dialog id="kibouModal" className="modal ">
                <form method="dialog" className="modal-box w-11/12 max-w-5xl bg-white">
                    <button htmlFor="kibouModal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                    <div className='text-black'>
                        <p> {individual_psychology.kibou}</p>
                        <p>{individual_psychology.kibou_detail}</p>
                    </div>
                </form>
            </dialog>
        </div>
    )
}