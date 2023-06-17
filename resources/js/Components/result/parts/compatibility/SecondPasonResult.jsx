
import React from 'react';
import { useSelector } from "react-redux";

import ResultTableTd from '@/Components/result/parts/ResultTableTd';
import ModalLayout from '../ModalLayout';

export default function SecondPasonResult(){
    const result = useSelector(state => state.result.result.sanmei);
    const insenStyleTd="w-[50px] text-left h-9 ";
    // const insenStyleTd="w-4 text-left h-9 pr-1";
    const yousenStyleTd="px-3 py-1 text-center";
    const compatibilityStyleTd="px-3 py-1 text-center h-[70px] w-[120px]";
    const zoukanFlgTd ="text-right w-3 p-0";

    const resultCompatibility = useSelector(state => state.result.compatibilityResult);

    return(
       <div className='mx-auto w-full md:h-[360px]'>
            {/* 陰占 */}
            <div>
                <div className="card  shadow-md  bg-white w-full h-full ">
                    <div className="card-body  mx-auto">
                        <h2 className='card-title mx-auto'>
                            {resultCompatibility.second_parson.profile.name}
                            {resultCompatibility.second_parson.profile.birth_year}年
                            {resultCompatibility.second_parson.profile.birth_month}月
                            {resultCompatibility.second_parson.profile.birth_day}日
                            {resultCompatibility.second_parson.profile.gender=='0' ? '男性':'女性'}
                        </h2>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <div className='w-full'>
                                <table  className='text-2xl'>
                                    <tbody>
                                        {/* 左端に天中殺　右端に年干支天中殺　蔵干フラグで'>'の位置を調整 */}
                                        <tr className="">
                                            <ResultTableTd />
                                            <ResultTableTd />
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nikkan } tablestyle={`${insenStyleTd} `}/>
                                            <ResultTableTd />
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.gekkan } tablestyle={`${insenStyleTd}`}/>
                                            <ResultTableTd />
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nenkan } tablestyle={`${insenStyleTd} `} />
                                            <ResultTableTd />
                                            <ResultTableTd />

                                        </tr>
                                        <tr className="">
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(0,1) }  tablestyle="w-[50px]"/>
                                            <ResultTableTd />
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nisshi } tablestyle={`${insenStyleTd} `} />
                                            <ResultTableTd />
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.gesshi } tablestyle={`${insenStyleTd} `}/>
                                            <ResultTableTd />
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nenshi } tablestyle={`${insenStyleTd} `}/>
                                            <ResultTableTd tablestyle="w-0"/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.kanshi_detail.nenkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(0,1) }tablestyle="w-0"/>

                                        </tr>
                                        <tr className="">
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(1,1) }/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nikkanshizoukanflg == 0?  ">": ""} tablestyle={zoukanFlgTd}/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nikkanshizoukan1 }tablestyle={`${insenStyleTd} `} />
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.gekkanshizoukanflg == 0?  ">": ""} tablestyle={zoukanFlgTd}/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.gekkanshizoukan1 }tablestyle={`${insenStyleTd} `} />
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nenkanshizoukanflg == 0?  ">": ""} tablestyle={zoukanFlgTd}/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nenkanshizoukan1 } tablestyle={`${insenStyleTd} `}/>
                                            <ResultTableTd />
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.kanshi_detail.nenkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(1,1) }/>
                                        </tr>
                                        <tr className="">
                                            <ResultTableTd />
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nikkanshizoukanflg == 1?  ">": ""} tablestyle={zoukanFlgTd}/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nikkanshizoukan2 } tablestyle={`${insenStyleTd}  `}/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.gekkanshizoukanflg == 1?  ">": ""} tablestyle={zoukanFlgTd}/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.gekkanshizoukan2 } tablestyle={`${insenStyleTd}  `} />
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nenkanshizoukanflg == 1?  ">": ""} tablestyle={zoukanFlgTd}/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nenkanshizoukan2 } tablestyle={`${insenStyleTd} `}/>
                                            <ResultTableTd />
                                            <ResultTableTd />
                                        </tr>
                                        <tr>
                                            <ResultTableTd />
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nikkanshizoukanflg == 2?  ">": ""} tablestyle={zoukanFlgTd}/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nikkanshizoukan3 } tablestyle={`${insenStyleTd}  `} />
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.gekkanshizoukanflg == 2?  ">": ""} tablestyle={zoukanFlgTd}/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.gekkanshizoukan3 } tablestyle={`${insenStyleTd}  `} />
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nenkanshizoukanflg == 2?  ">": ""} tablestyle={zoukanFlgTd}/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nenkanshizoukan3 } tablestyle={`${insenStyleTd} `} />
                                            <ResultTableTd />
                                            <ResultTableTd />
                                        </tr>
                                        </tbody>
                                </table>
                                <div className='flex justify-center w-full gap-2 mb-2'>
                                    <button className="btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700 " onClick={()=>window.second_parson_nikkanshi_modal.showModal()}>日干支</button>
                                    <button className="btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700 " onClick={()=>window.second_parson_gekkanshi_modal.showModal()}>月干支</button>
                                    <button className="btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700 " onClick={()=>window.second_parson_nenkanshi_modal.showModal()}>年干支</button>
                                </div>
                            </div>
                            {/* 陽占 */}
                            <div className='mx-auto'>
                                <table className='mt-[20px]'>
                                    <tbody>
                                        <tr className="border-b">
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.yousen.bansei } tablestyle={`${yousenStyleTd} border-r`}/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.yousen.north } tablestyle={`${yousenStyleTd} border-r`}/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.yousen.first } tablestyle={`${yousenStyleTd}`}/>

                                        </tr>
                                        <tr className="border-b">
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.yousen.west } tablestyle={`${yousenStyleTd} border-r`}/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.yousen.center } tablestyle={`${yousenStyleTd} border-r`}/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.yousen.east } tablestyle={`${yousenStyleTd}`}/>

                                        </tr>
                                        <tr>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.yousen.last } tablestyle={`${yousenStyleTd} border-r`}/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.yousen.south } tablestyle={`${yousenStyleTd} border-r`}/>
                                            <ResultTableTd value={resultCompatibility.second_parson.sanmei.yousen.middle } tablestyle={`${yousenStyleTd}`}/>
                                        </tr>
                                    </tbody>
                                </table>      
                            </div>
                        </div>
                    </div>
                   
                </div>
     
                {/* モーダル内容 */}
                <ModalLayout title='日干支解説' idName='second_parson_nikkanshi_modal'>
                <hr  className=" border-yellow-300 mb-4"/>    

                <div className='text-2xl font-semibold text-center md:text-left'>
                    <p>
                        <span className='mx-4'>干支：{resultCompatibility.second_parson.sanmei.kanshi_detail.nikkanshi_detail.kanshi_detail.kanshi}</span>
                        <span className='md:inline block '>～{resultCompatibility.second_parson.sanmei.kanshi_detail.nikkanshi_detail.kanshi_detail.nickname}～</span>
                    </p>
                    
                </div>
                <p className='text-lg mt-[20px] indent-4 leading-loose tracking-normal md:ml-6'>
                    {resultCompatibility.second_parson.sanmei.kanshi_detail.nikkanshi_detail.kanshi_detail.kanshi_detail}
                </p>
                <p className='text-lg mt-[20px] indent-4 mb-6 leading-loose tracking-normal md:ml-6'>
                    {resultCompatibility.second_parson.sanmei.kanshi_detail.nikkanshi_detail.kanshi_detail.explanation}
                </p>

                {resultCompatibility.second_parson.sanmei.kanshi_detail.nikkanshi_detail.gou_detail[0].gou_id !=0 ?
                    (<dl className="mx-3 my-3 p-2 bg-gray-100  rounded">
                        <dt>●{resultCompatibility.second_parson.sanmei.kanshi_detail.nikkanshi_detail.gou_detail[0].gou}</dt>
                        <dd className="ml-2 mt-1">{resultCompatibility.second_parson.sanmei.kanshi_detail.nikkanshi_detail.gou_detail[0].gou_detail}</dd>
                    </dl>)
                :""}
                {resultCompatibility.second_parson.sanmei.kanshi_detail.nikkanshi_detail.ijou_detail[0].ijou_kanshi_id !=0 ?
                    (<dl className="mx-3 my-3 p-2 bg-gray-100 rounded">
                        <dt>{resultCompatibility.second_parson.sanmei.kanshi_detail.nikkanshi_detail.ijou_detail[0].ijou_kanshi}</dt>
                        <dd className="ml-2 mt-1">{resultCompatibility.second_parson.sanmei.kanshi_detail.nikkanshi_detail.ijou_detail[0].ijou_detail}</dd>
                    </dl>)
                :""}
                </ModalLayout>

                <ModalLayout title='月干支解説' idName='second_parson_gekkanshi_modal'>
                <hr  className=" border-yellow-300 mb-4"/>    

                    <div className='text-2xl font-semibold text-center md:text-left'>
                        <p>
                            <span className='mx-4'>干支：{resultCompatibility.second_parson.sanmei.kanshi_detail.gekkanshi_detail.kanshi_detail.kanshi}</span>
                            <span className='md:inline block '>～{resultCompatibility.second_parson.sanmei.kanshi_detail.gekkanshi_detail.kanshi_detail.nickname}～</span>
                        </p>
                        
                    </div>
                    <p className='text-lg mt-[20px] indent-4 leading-loose tracking-normal md:ml-6'>
                        {resultCompatibility.second_parson.sanmei.kanshi_detail.gekkanshi_detail.kanshi_detail.kanshi_detail}
                    </p>
                    <p className='text-lg mt-[20px] indent-4 mb-6 leading-loose tracking-normal md:ml-6'>
                        {resultCompatibility.second_parson.sanmei.kanshi_detail.gekkanshi_detail.kanshi_detail.explanation}
                    </p>

                    {resultCompatibility.second_parson.sanmei.kanshi_detail.gekkanshi_detail.gou_detail[0].gou_id !=0 ?
                        (<dl className="mx-3 my-3 p-2 bg-gray-100  rounded">
                            <dt>●{resultCompatibility.second_parson.sanmei.kanshi_detail.gekkanshi_detail.gou_detail[0].gou}</dt>
                            <dd className="ml-2 mt-1">{resultCompatibility.second_parson.sanmei.kanshi_detail.gekkanshi_detail.gou_detail[0].gou_detail}</dd>
                        </dl>)
                    :""}
                    {resultCompatibility.second_parson.sanmei.kanshi_detail.gekkanshi_detail.ijou_detail[0].ijou_kanshi_id !=0 ?
                        (<dl className="mx-3 my-3 p-2 bg-gray-100 rounded">
                            <dt>{resultCompatibility.second_parson.sanmei.kanshi_detail.gekkanshi_detail.ijou_detail[0].ijou_kanshi}</dt>
                            <dd className="ml-2 mt-1">{resultCompatibility.second_parson.sanmei.kanshi_detail.gekkanshi_detail.ijou_detail[0].ijou_detail}</dd>
                        </dl>)
                    :""}
                </ModalLayout>

                <ModalLayout title='年干支解説' idName='second_parson_nenkanshi_modal'>
                    <hr  className=" border-yellow-300 mb-4"/>    

                    <div className='text-2xl font-semibold text-center md:text-left'>
                        <p>
                            <span className='mx-4'>干支：{resultCompatibility.second_parson.sanmei.kanshi_detail.nenkanshi_detail.kanshi_detail.kanshi}</span>
                            <span className='md:inline block '>～{resultCompatibility.second_parson.sanmei.kanshi_detail.nenkanshi_detail.kanshi_detail.nickname}～</span>
                        </p>
                        
                    </div>
                    <p className='text-lg mt-[20px] indent-4 leading-loose tracking-normal md:ml-6'>
                        {resultCompatibility.second_parson.sanmei.kanshi_detail.nenkanshi_detail.kanshi_detail.kanshi_detail}
                    </p>
                    <p className='text-lg mt-[20px] indent-4 mb-6 leading-loose tracking-normal md:ml-6'>
                        {resultCompatibility.second_parson.sanmei.kanshi_detail.nenkanshi_detail.kanshi_detail.explanation}
                    </p>

                    {resultCompatibility.second_parson.sanmei.kanshi_detail.nenkanshi_detail.gou_detail[0].gou_id !=0 ?
                        (<dl className="mx-3 my-3 p-2 bg-gray-100  rounded">
                            <dt>●{resultCompatibility.second_parson.sanmei.kanshi_detail.nenkanshi_detail.gou_detail[0].gou}</dt>
                            <dd className="ml-2 mt-1">{resultCompatibility.second_parson.sanmei.kanshi_detail.nenkanshi_detail.gou_detail[0].gou_detail}</dd>
                        </dl>)
                    :""}
                    {resultCompatibility.second_parson.sanmei.kanshi_detail.nenkanshi_detail.ijou_detail[0].ijou_kanshi_id !=0 ?
                        (<dl className="mx-3 my-3 p-2 bg-gray-100 rounded">
                            <dt>{resultCompatibility.second_parson.sanmei.kanshi_detail.nenkanshi_detail.ijou_detail[0].ijou_kanshi}</dt>
                            <dd className="ml-2 mt-1">{resultCompatibility.second_parson.sanmei.kanshi_detail.nenkanshi_detail.ijou_detail[0].ijou_detail}</dd>
                        </dl>)
                    :""}
                </ModalLayout>
            </div>

        </div>
    )
}