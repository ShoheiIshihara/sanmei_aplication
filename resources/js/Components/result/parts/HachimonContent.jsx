import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { isEmpty } from 'lodash';

export default function HachimonContent(){
    const result = useSelector(state => state.result.result.sanmei);

    return(
        <div className='mx-auto  w-11/12  h-[340px]'>
              <button className="card w-full h-full shadow-md  bg-white hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700 " onClick={()=>window.nhachimon_modal.showModal()}>
                    <div className="card-body  w-full ">
                        <h2 className="card-title mx-auto">八門法</h2>
                        <div className=" w-[220px] h-[220px] mx-auto relative">
                            <div className="absolute w-12 text-center top-1 left-1/2 -ml-6">
                                <span className="block ">北</span>
                                <span className="block text-xl text-sea-pink-400 font-medium -mt-1">{result.hachimonhou.north}</span>
                            </div>
                            <div className="absolute w-12 text-center top-1/2 left-0 -mt-6">
                                <span className="block ">西</span>
                                <span className="block text-xl text-sea-pink-400 font-medium -mt-1">{result.hachimonhou.west}</span>
                            </div>
                            <div className="absolute w-12 text-center top-1/2 left-1/2 -mt-6 -ml-6">
                                <span className="block ">中央</span>
                                <span className="block text-xl text-sea-pink-400 font-medium -mt-1">{result.hachimonhou.center}</span>
                            </div>
                            <div className="absolute w-12 text-center top-1/2 right-0 -mt-6">
                                <span className="block ">東</span>
                                <span className="block text-xl text-sea-pink-400 font-medium -mt-1">{result.hachimonhou.east}</span>
                            </div>
                            <div className="absolute w-12 text-center bottom-1 left-1/2 -ml-6">
                                <span className="block ">南</span>
                                <span className="block text-xl text-sea-pink-400 font-medium -mt-1">{result.hachimonhou.south}</span>
                            </div>
                            {/* 線 */}
                            <p className="absolute w-12 text-center text-sm top-10 left-1/2 -ml-6">|</p>
                            <p className="absolute w-12 text-center text-sm bottom-12 left-1/2 -ml-6">|</p>
                            <p className="absolute w-12 text-center text-sm top-1/2 right-8 -mt-3">―</p>
                            <p className="absolute w-12 text-center text-sm top-1/2 left-8 -mt-3">―</p>
                            </div>
                    </div>
                </button>
{/* モーダル内容 */}
<dialog id="nhachimon_modal" className="modal ">
                <form method="dialog" className="modal-box w-11/12 max-w-5xl bg-white">
                    <button htmlFor="nhachimon_modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
             
                    <div className='text-black'>
                        <p> {result.hachimon_type}</p>
                        <p>{result.hachimon_type_detail}</p>
                        <p className={` p-4 rounded`}>
                            最大値と最小値の差は人生の振幅のとも言われ、差が50以上なら人生のムラが大きい。特に100を超えてると激しい人生となる。<br />
                            また、差が大きいほど欲深いとも言われている
                        </p>
                    </div>
                </form>
            </dialog>
        </div>
    )
}