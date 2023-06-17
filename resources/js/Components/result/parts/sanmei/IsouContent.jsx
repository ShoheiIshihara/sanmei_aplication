import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { isEmpty } from 'lodash';
import ModalLayout from '../ModalLayout';

export default function IsouContent(){
    const result = useSelector(state => state.result.result.sanmei);
    const resultIsouho = useSelector(state => state.result.result.isoho.life_time);

    return(
        <div className='mx-auto  w-full   h-[360px]'>
             <div className="card  shadow-md  bg-white  h-full w-full  ">
                    <div className="card-body  w-full  ">
                        <h2 className="card-title mx-auto">位相法</h2>
                        <div className=" h-44 relative text-center ">
                            <div className="absolute w-12 text-center top-1/3 left-0 -mt-6">
                                <span className="block text-base">{result.kanshi_detail.nikkanshi_detail.kanshi_detail.kanshi}</span>
                            </div>
                            <div className="absolute w-12 text-center top-1/3 left-1/2 -mt-6 -ml-6">
                                <span className="block text-base">{result.kanshi_detail.gekkanshi_detail.kanshi_detail.kanshi}</span>
                            </div>
                            <div className="absolute w-12 text-center top-1/3 right-0 -mt-6">
                                <span className="block text-base">{result.kanshi_detail.nenkanshi_detail.kanshi_detail.kanshi}</span>
                            </div>

                            {/* 位相法 */}
                            {/* 日月 */}
                            {!isEmpty(resultIsouho['nichigetsu']) ?
                                Object.keys(resultIsouho['nichigetsu']).map((i,key)=>{
                                    return (
                                        <>
                                        <div key={key} className="absolute w-28 text-center text-sm top-1/2 left-8 -mt-6 leading-3">
                                            <div className="text-sm grid grid-cols-1">
                                                <div className={` absolute right-[16px] top-${i*4} ${resultIsouho['nichigetsu'][i]['gou_san'] == '0' ? 'text-blue-500' : 'text-red-300' }`}>
                                                    {resultIsouho['nichigetsu'][i]['isou_name']}
                                                </div>
                                            </div>
                                        </div>
                                        {/* 日月罫線 */}
                                        <p className='absolute w-12 text-center top-1/2 left-0 -mt-4'>└</p>
                                        <p className='absolute w-12 text-center top-1/2 left-1/3 ml-6 -mt-4'>┘</p>
                                        </>
                                    )
                                }) : ''
                            }
                            {/* 年月 */}
                            {!isEmpty(resultIsouho['nengetsu']) ?
                                Object.keys(resultIsouho['nengetsu']).map((i,key)=>{
                                    return (
                                        <>
                                        <div key={key} className="absolute w-[300px] text-center text-sm top-1/2 right-10 -mt-2 leading-3">
                                            <div className="text-sm">
                                                <p className={`absolute right-[16px] bottom-[${(i)*16}px]  ${resultIsouho['nengetsu'][i]['gou_san'] == '0' ? 'text-blue-500' : 'text-red-300' }`}>{resultIsouho['nengetsu'][i]['isou_name']}</p>
                                            </div>
                                        </div>
                                        {/* 年月罫線 */}
                                        <p className='absolute w-12 text-center top-1/2 left-1/2 -ml-5 -mt-4'>└</p>
                                        <p className='absolute w-12 text-center top-1/2 right-0 -ml-5 -mt-4'>┘</p>
                                        </>
                                    )
                                }) : ''
                            }
                            {/* 年日 */}
                            {!isEmpty(resultIsouho['nichinen']) ?
                                Object.keys(resultIsouho['nichinen']).map((i,key)=>{
                                    return (
                                        <>
                                        <div key={key} className="absolute w-28 h-12 text-center top-2/3 left-1/2 -ml-14 leading-3">
                                            <div className="text-sm">
                                                <p className={`absolute right-[16px] top-${i*4} ${resultIsouho['nichinen'][i]['gou_san'] == '0' ? 'text-blue-500' : 'text-red-300' }`}>{resultIsouho['nichinen'][i]['isou_name']}</p>
                                            </div>
                                        </div>
                                        {/* 年日罫線 */}
                                        <p className='absolute w-12 text-center top-2/3 left-0 mt-2 '>└</p>
                                        <p className='absolute w-12 text-center top-2/3  right-0 -ml-5 mt-2'>┘</p>
                                        </>
                                    )
                                }) : ''
                            }
                        </div>       
                    </div>
                    <div className='flex justify-center w-full gap-2 mb-2'>
                        <button className={`btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700 ${isEmpty(resultIsouho['nichigetsu']) ? 'hidden' : ''}`}  onClick={()=>window.nichi_getsu_modal.showModal()}>日月</button>
                        <button className={`btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700 ${isEmpty(resultIsouho['nengetsu']) ? 'hidden' : ''}`} onClick={()=>window.nen_getsu_modal.showModal()}>年月</button>
                        <button className={`btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700 ${isEmpty(resultIsouho['nichinen']) ? 'hidden' : ''}`} onClick={()=>window.nichi_nen_modal.showModal()}>日年</button>
                    </div>
            </div>
            {/* /////モーダル内容///// */}
            {/* 日月 */}
            <ModalLayout title='日月位相解説' idName='nichi_getsu_modal'>
                {!isEmpty(resultIsouho['nichigetsu']) ?
                    <>
                        {Object.keys(resultIsouho['nichigetsu']).map((index,key)=>{
                        return(
                            <>
                                <dl key={key} className="mx-3 my-3 p-2 ">
                                    <dt className="text-xl font-semibold">{resultIsouho['nichigetsu'][index]['isou_name']}</dt>
                                    <dd className="ml-6 mt-4 text-lg tracking-normal whitespace-normal">{resultIsouho['nichigetsu'][index]['shukumei_detail']}</dd>
                                    <dd className="ml-6 mt-1 text-lg">{resultIsouho['nichigetsu'][index]['nichigetsu']}</dd>
                                </dl>
                            </>
                        )
                        })}
                    </>
                :""}
            </ModalLayout>

            {/* 年月 */}
            <ModalLayout title='年月位相解説' idName='nen_getsu_modal'>
                {!isEmpty(resultIsouho['nengetsu']) ?
                    <>
                        {Object.keys(resultIsouho['nengetsu']).map((index,key)=>{
                        return(
                            <>
                                <dl key={key} className="mx-3 my-3 p-2 ">
                                    <dt className="text-xl font-semibold">{resultIsouho['nengetsu'][index]['isou_name']}</dt>
                                    <dd className="ml-6 mt-4 text-lg tracking-normal whitespace-normal">{resultIsouho['nengetsu'][index]['shukumei_detail']}</dd>
                                    <dd className="ml-6 mt-1 text-lg">{resultIsouho['nengetsu'][index]['nengetsu']}</dd>
                                </dl>
                            </>
                        )
                        })}
                    </>
                :""}
            </ModalLayout>
            {/* 日年 */}
            <ModalLayout title='日年位相解説' idName='nichi_nen_modal'>
                {!isEmpty(resultIsouho['nengetsu']) ?
                    <>
                        {Object.keys(resultIsouho['nichinen']).map((index,key)=>{
                        return(
                            <>
                                <dl key={key} className="mx-3 my-3 p-2 ">
                                    <dt className="text-xl font-semibold">{resultIsouho['nichinen'][index]['isou_name']}</dt>
                                    <dd className="ml-6 mt-4 text-lg tracking-normal whitespace-normal">{resultIsouho['nichinen'][index]['shukumei_detail']}</dd>
                                    <dd className="ml-6 mt-1 text-lg">{resultIsouho['nichinen'][index]['nichinen']}</dd>
                                </dl>
                            </>
                        )
                        })}
                    </>
                :""}
            </ModalLayout>
        </div>
    )
}