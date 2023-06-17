
import React from 'react';
import { useSelector } from "react-redux";

import ResultTableTd from '@/Components/result/parts/ResultTableTd';
import ModalLayout from '../ModalLayout';

export default function InsenContent(){
    const result = useSelector(state => state.result.result.sanmei);
    const insenStyleTd="w-[50px] text-left h-9 ";
    const zoukanFlgTd ="text-right w-3 p-0";

    return(
       <div className='mx-auto w-full h-[360px]'>
                <div className="card  shadow-md  bg-white w-full h-full ">
                    <div className="card-body max-w-sm mx-auto">
                        <h2 className="card-title mx-auto">陰占</h2>
                        <table  className='text-2xl'>
                            <tbody>
                                {/* 左端に天中殺　右端に年干支天中殺　蔵干フラグで'>'の位置を調整 */}
                                <tr className="">
                                    <ResultTableTd />
                                    <ResultTableTd />
                                    <ResultTableTd value={result.insen.nikkan } tablestyle={`${insenStyleTd} `}/>
                                    <ResultTableTd />
                                    <ResultTableTd value={result.insen.gekkan } tablestyle={`${insenStyleTd}`}/>
                                    <ResultTableTd />
                                    <ResultTableTd value={result.insen.nenkan } tablestyle={`${insenStyleTd} `} />
                                    <ResultTableTd />
                                    <ResultTableTd />

                                </tr>
                                <tr className="">
                                    <ResultTableTd value={result.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(0,1) } tablestyle="w-[50px]"/>
                                    <ResultTableTd />
                                    <ResultTableTd value={result.insen.nisshi } tablestyle={`${insenStyleTd} `} />
                                    <ResultTableTd />
                                    <ResultTableTd value={result.insen.gesshi } tablestyle={`${insenStyleTd} `}/>
                                    <ResultTableTd />
                                    <ResultTableTd value={result.insen.nenshi } tablestyle={`${insenStyleTd} `}/>
                                    <ResultTableTd tablestyle="w-0"/>
                                    <ResultTableTd value={result.kanshi_detail.nenkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(0,1) }tablestyle="w-0"/>

                                </tr>
                                <tr className="">
                                    <ResultTableTd value={result.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(1,1) }/>
                                    <ResultTableTd value={result.insen.nikkanshizoukanflg == 0?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.nikkanshizoukan1 }tablestyle={`${insenStyleTd} `} />
                                    <ResultTableTd value={result.insen.gekkanshizoukanflg == 0?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.gekkanshizoukan1 }tablestyle={`${insenStyleTd} `} />
                                    <ResultTableTd value={result.insen.nenkanshizoukanflg == 0?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.nenkanshizoukan1 } tablestyle={`${insenStyleTd} `}/>
                                    <ResultTableTd />
                                    <ResultTableTd value={result.kanshi_detail.nenkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(1,1) }/>
                                </tr>
                                <tr className="">
                                    <ResultTableTd />
                                    <ResultTableTd value={result.insen.nikkanshizoukanflg == 1?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.nikkanshizoukan2 } tablestyle={`${insenStyleTd}  `}/>
                                    <ResultTableTd value={result.insen.gekkanshizoukanflg == 1?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.gekkanshizoukan2 } tablestyle={`${insenStyleTd}  `} />
                                    <ResultTableTd value={result.insen.nenkanshizoukanflg == 1?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.nenkanshizoukan2 } tablestyle={`${insenStyleTd} `}/>
                                    <ResultTableTd />
                                    <ResultTableTd />
                                </tr>
                                <tr>
                                    <ResultTableTd />
                                    <ResultTableTd value={result.insen.nikkanshizoukanflg == 2?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.nikkanshizoukan3 } tablestyle={`${insenStyleTd}  `} />
                                    <ResultTableTd value={result.insen.gekkanshizoukanflg == 2?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.gekkanshizoukan3 } tablestyle={`${insenStyleTd}  `} />
                                    <ResultTableTd value={result.insen.nenkanshizoukanflg == 2?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.nenkanshizoukan3 } tablestyle={`${insenStyleTd} `} />
                                    <ResultTableTd />
                                    <ResultTableTd />
                                </tr>
                                </tbody>
                        </table>
                    </div>
                    <div className='flex justify-center w-full gap-2 mb-2'>
                        <button className="btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700 " onClick={()=>window.nikkanshi_modal.showModal()}>日干支</button>
                        <button className="btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700 " onClick={()=>window.gekkanshi_modal.showModal()}>月干支</button>
                        <button className="btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700 " onClick={()=>window.nenkanshi_modal.showModal()}>年干支</button>
                    </div>
                   
                </div>
     
            {/* モーダル内容 */}
            <ModalLayout title='日干支解説' idName='nikkanshi_modal'>
            <hr  className=" border-yellow-300 mb-4"/>    

            <div className='text-2xl font-semibold text-center md:text-left'>
                <p>
                    <span className='mx-4'>干支：{result.kanshi_detail.nikkanshi_detail.kanshi_detail.kanshi}</span>
                    <span className='md:inline block '>～{result.kanshi_detail.nikkanshi_detail.kanshi_detail.nickname}～</span>
                </p>
                
            </div>
            <p className='text-lg mt-[20px] indent-4 leading-loose tracking-normal md:ml-6'>
                {result.kanshi_detail.nikkanshi_detail.kanshi_detail.kanshi_detail}
            </p>
            <p className='text-lg mt-[20px] indent-4 mb-6 leading-loose tracking-normal md:ml-6'>
                {result.kanshi_detail.nikkanshi_detail.kanshi_detail.explanation}
            </p>

            {result.kanshi_detail.nikkanshi_detail.gou_detail[0].gou_id !=0 ?
                (<dl className="mx-3 my-3 p-2 bg-gray-100  rounded">
                    <dt>●{result.kanshi_detail.nikkanshi_detail.gou_detail[0].gou}</dt>
                    <dd className="ml-2 mt-1">{result.kanshi_detail.nikkanshi_detail.gou_detail[0].gou_detail}</dd>
                </dl>)
            :""}
            {result.kanshi_detail.nikkanshi_detail.ijou_detail[0].ijou_kanshi_id !=0 ?
                (<dl className="mx-3 my-3 p-2 bg-gray-100 rounded">
                    <dt>{result.kanshi_detail.nikkanshi_detail.ijou_detail[0].ijou_kanshi}</dt>
                    <dd className="ml-2 mt-1">{result.kanshi_detail.nikkanshi_detail.ijou_detail[0].ijou_detail}</dd>
                </dl>)
            :""}
            </ModalLayout>

            <ModalLayout title='月干支解説' idName='gekkanshi_modal'>
              <hr  className=" border-yellow-300 mb-4"/>    

                <div className='text-2xl font-semibold text-center md:text-left'>
                    <p>
                        <span className='mx-4'>干支：{result.kanshi_detail.gekkanshi_detail.kanshi_detail.kanshi}</span>
                        <span className='md:inline block '>～{result.kanshi_detail.gekkanshi_detail.kanshi_detail.nickname}～</span>
                    </p>
                    
                </div>
                <p className='text-lg mt-[20px] indent-4 leading-loose tracking-normal md:ml-6'>
                    {result.kanshi_detail.gekkanshi_detail.kanshi_detail.kanshi_detail}
                </p>
                <p className='text-lg mt-[20px] indent-4 mb-6 leading-loose tracking-normal md:ml-6'>
                    {result.kanshi_detail.gekkanshi_detail.kanshi_detail.explanation}
                </p>

                {result.kanshi_detail.gekkanshi_detail.gou_detail[0].gou_id !=0 ?
                    (<dl className="mx-3 my-3 p-2 bg-gray-100  rounded">
                        <dt>●{result.kanshi_detail.gekkanshi_detail.gou_detail[0].gou}</dt>
                        <dd className="ml-2 mt-1">{result.kanshi_detail.gekkanshi_detail.gou_detail[0].gou_detail}</dd>
                    </dl>)
                :""}
                {result.kanshi_detail.gekkanshi_detail.ijou_detail[0].ijou_kanshi_id !=0 ?
                    (<dl className="mx-3 my-3 p-2 bg-gray-100 rounded">
                        <dt>{result.kanshi_detail.gekkanshi_detail.ijou_detail[0].ijou_kanshi}</dt>
                        <dd className="ml-2 mt-1">{result.kanshi_detail.gekkanshi_detail.ijou_detail[0].ijou_detail}</dd>
                    </dl>)
                :""}
            </ModalLayout>

            <ModalLayout title='年干支解説' idName='nenkanshi_modal'>
                <hr  className=" border-yellow-300 mb-4"/>    

                <div className='text-2xl font-semibold text-center md:text-left'>
                    <p>
                        <span className='mx-4'>干支：{result.kanshi_detail.nenkanshi_detail.kanshi_detail.kanshi}</span>
                        <span className='md:inline block '>～{result.kanshi_detail.nenkanshi_detail.kanshi_detail.nickname}～</span>
                    </p>
                    
                </div>
                <p className='text-lg mt-[20px] indent-4 leading-loose tracking-normal md:ml-6'>
                    {result.kanshi_detail.nenkanshi_detail.kanshi_detail.kanshi_detail}
                </p>
                <p className='text-lg mt-[20px] indent-4 mb-6 leading-loose tracking-normal md:ml-6'>
                    {result.kanshi_detail.nenkanshi_detail.kanshi_detail.explanation}
                </p>

                {result.kanshi_detail.nenkanshi_detail.gou_detail[0].gou_id !=0 ?
                    (<dl className="mx-3 my-3 p-2 bg-gray-100  rounded">
                        <dt>●{result.kanshi_detail.nenkanshi_detail.gou_detail[0].gou}</dt>
                        <dd className="ml-2 mt-1">{result.kanshi_detail.nenkanshi_detail.gou_detail[0].gou_detail}</dd>
                    </dl>)
                :""}
                {result.kanshi_detail.nenkanshi_detail.ijou_detail[0].ijou_kanshi_id !=0 ?
                    (<dl className="mx-3 my-3 p-2 bg-gray-100 rounded">
                        <dt>{result.kanshi_detail.nenkanshi_detail.ijou_detail[0].ijou_kanshi}</dt>
                        <dd className="ml-2 mt-1">{result.kanshi_detail.nenkanshi_detail.ijou_detail[0].ijou_detail}</dd>
                    </dl>)
                :""}
            </ModalLayout>
        </div>
    )
}