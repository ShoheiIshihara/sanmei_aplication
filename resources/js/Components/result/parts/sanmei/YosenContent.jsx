import React from 'react';
import { useSelector } from "react-redux";

import ResultTableTd from '@/Components/result/parts/ResultTableTd';
import ModalLayout from '../ModalLayout';

export default function YosenContent(){
    const result = useSelector(state => state.result.result.sanmei);
    const yousenStyleTd="px-3 py-1 text-center text-4xl tracking-wider text-center align-middle";
    
    return(
        <div className='mx-auto w-full   h-[360px]'>
            <div className="card  shadow-md  bg-white h-full w-full ">
                    <div className="card-body   mx-auto  ">
                        <h2 className="card-title mx-auto">陽占</h2>
                        <table className='mt-[20px]'>
                            <tbody>
                                <tr className="border-b">
                                    <ResultTableTd value={result.yousen.bansei } tablestyle={`${yousenStyleTd} border-r`}/>
                                    <ResultTableTd value={result.yousen.north } tablestyle={`${yousenStyleTd} border-r`}/>
                                    <ResultTableTd value={result.yousen.first } tablestyle={`${yousenStyleTd}`}/>

                                </tr>
                                <tr className="border-b">
                                    <ResultTableTd value={result.yousen.west } tablestyle={`${yousenStyleTd} border-r`}/>
                                    <ResultTableTd value={result.yousen.center } tablestyle={`${yousenStyleTd} border-r`}/>
                                    <ResultTableTd value={result.yousen.east } tablestyle={`${yousenStyleTd}`}/>

                                </tr>
                                <tr>
                                    <ResultTableTd value={result.yousen.last } tablestyle={`${yousenStyleTd} border-r`}/>
                                    <ResultTableTd value={result.yousen.south } tablestyle={`${yousenStyleTd} border-r`}/>
                                    <ResultTableTd value={result.yousen.middle } tablestyle={`${yousenStyleTd}`}/>
                                </tr>
                            </tbody>
                        </table>      
                    </div>
                    <div className='flex justify-center w-full gap-2 mb-2'>
                        {/* <button className='btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700' onClick={()=>window.yosen_modal.showModal()}>解説</button> */}
                    </div>
                </div>

                 {/* モーダル内容 */}
                 <ModalLayout title='陽占解説' idName='yosen_modal'>
                   
                </ModalLayout>
        </div>
    )
}