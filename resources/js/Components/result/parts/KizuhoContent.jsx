import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { isEmpty } from 'lodash';

export default function KizuhoContent(){
    const result = useSelector(state => state.result.result.sanmei);

    return(
        <div className='mx-auto w-11/12 h-[340px]'>
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
                    </div>
                    

                </div>
        </div>
    )
}