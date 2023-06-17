import React from 'react';
import { useSelector } from "react-redux";
import ModalLayout from '../ModalLayout';

export default function KizuhoContent(){
    const result = useSelector(state => state.result.result.sanmei);

    return(
        <div className='mx-auto w-full  h-[360px]'>
              <div className="card shadow-md  bg-white w-full h-full  ">
                    <div className="card-body">
                        <h2 className="card-title mx-auto">気図法</h2>
                        <div className="w-[220px] h-[220px] relative text-center mx-auto">
                            <div className="absolute w-12 text-center top-1 left-1/2 -ml-6">
                                <span className="block ">水</span>
                                <span className="block text-xl text-sea-pink-400 font-medium -mt-1">{result.kizuhou.water}</span>
                            </div>
                            <div className="absolute w-12 text-center top-1/2 left-0 -mt-6">
                                <span className="block ">金</span>
                                <span className="block text-xl text-sea-pink-400 font-medium -mt-1">{result.kizuhou.gold}</span>
                            </div>
                            <div className="absolute w-12 text-center top-1/2 left-1/2 -mt-6 -ml-6">
                                <span className="block ">土</span>
                                <span className="block text-xl text-sea-pink-400 font-medium -mt-1">{result.kizuhou.soil}</span>
                            </div>
                            <div className="absolute w-12 text-center top-1/2 right-0 -mt-6">
                                <span className="block ">木</span>
                                <span className="block text-xl text-sea-pink-400 font-medium -mt-1">{result.kizuhou.wood}</span>
                            </div>

                            <div className="absolute w-12 text-center bottom-[0px] left-1/2 -ml-6">
                                <span className="block ">火</span>
                                <span className="block text-xl text-sea-pink-400 font-medium -mt-1">{result.kizuhou.fire}</span>
                            </div>
                            {/* 線 */}
                            <p className="absolute w-12 text-center text-sm top-[50px] left-1/2 -ml-6">|</p>
                            <p className="absolute w-12 text-center text-sm bottom-12 left-1/2 -ml-6">|</p>
                            <p className="absolute w-12 text-center text-sm top-1/2 right-8 -mt-3">―</p>
                            <p className="absolute w-12 text-center text-sm top-1/2 left-8 -mt-3">―</p>
                        </div>
                        <div className='flex justify-center w-full gap-2 mb-2'>
                            {/* <button className='btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700' onClick={()=>window.kizuhou_modal.showModal()}>解説</button> */}
                        </div>
                          {/* モーダル内容 */}
                    </div>
                </div>
                <ModalLayout title='気図法解説' idName='kizuhou_modal'>
                    <p className='text-xl'>気図法とは、内的エネルギーの分布図です</p>
                    <p className='text-xl mt-2'>縦線（北：水性＋南：火性）の合計値が横線（東：木性＋西：金性）の数値を上回る場合は、学問が優秀なタイプで、何事も積極的に学ぼうとします。研究に没頭したり、創作活動に勤しむ芸術家などクリエイティブな領域でも力を発揮します。</p>
                    <p className='text-xl my-2'>横線（東：木性＋西：金性）の合計値が縦線（北：水性＋南：火性）の数値を上回る場合は、現実社会に強いタイプで、世渡り上手で人付き合いも卒なくこなせます。社会で生き残るための術を追求し、お金儲けが得意だったり、働きものになります。</p>
                </ModalLayout>
        </div>
    )
}