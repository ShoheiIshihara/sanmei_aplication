import React from 'react';
import { useSelector } from "react-redux";
import ModalLayout from '../ModalLayout';

export default function HachimonContent(){
    const result = useSelector(state => state.result.result.sanmei);

    return(
        <div className='mx-auto  w-full  h-[360px]'>
              <div className="card w-full h-full shadow-md  bg-white  " >
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
                            <p className="absolute w-12 text-center text-sm top-[50px] left-1/2 -ml-6">|</p>
                            <p className="absolute w-12 text-center text-sm bottom-12 left-1/2 -ml-6">|</p>
                            <p className="absolute w-12 text-center text-sm top-1/2 right-8 -mt-3">―</p>
                            <p className="absolute w-12 text-center text-sm top-1/2 left-8 -mt-3">―</p>
                            </div>
                            <div className='flex justify-center w-full gap-2 mb-2'>
                                <button className='btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700' onClick={()=>window.hachimon_modal.showModal()}>解説</button>
                            </div>
                    </div>
                </div>
                {/* モーダル内容 */}

            <ModalLayout title='八門法解説' idName='hachimon_modal'>
                    <p className='text-xl font-semibold'>{result.hachimon_type}</p>
                    <p className='text-xl mt-[10px] indent-4 '>{result.hachimon_type_detail}</p>
                    <p className={` p-4 `}>
                        ※最大値と最小値の差は人生の振幅のとも言われ、差が50以上なら人生のムラが大きい。<br />
                        　特に100を超えてると激しい人生となる。
                        また、差が大きいほど欲深いとも言われている
                    </p>
            </ModalLayout>
        </div>
    )
}