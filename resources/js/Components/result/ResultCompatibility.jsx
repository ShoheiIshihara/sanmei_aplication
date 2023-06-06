import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { isEmpty } from 'lodash';


import ResultTableTd from '@/Components/ResultTableTd';
import ResultContentBox from './parts/ResultContetBox';

export default function ResultCompatibility() {

    const result = useSelector(state => state.result.result.sanmei);
    const resultIsouho = useSelector(state => state.result.result.isoho.life_time);
    const resultCompatibility = useSelector(state => state.result.compatibilityResult);

    console.log(resultCompatibility);
    // console.log(result);
    // console.log(typeof(resultIsouho));
    // console.log(isEmpty(resultIsouho));


    const insenStyleTd="w-4 text-left h-9 pr-1";
    const yousenStyleTd="px-3 py-1 text-center";
    const compatibilityStyleTd="px-3 py-1 text-center h-[70px] w-[120px]";
    const zoukanFlgTd ="text-right w-3 p-0";

    //  行動領域
    function ryouiki(){
        //干支Noの取得
        let point1 = resultCompatibility.first_parson.sanmei.action_area.nikkanshi_id;
        let point2 = resultCompatibility.first_parson.sanmei.action_area.gekkanshi_id;
        let point3 = resultCompatibility.first_parson.sanmei.action_area.nenkanshi_id;
        let point4 = resultCompatibility.second_parson.sanmei.action_area.nikkanshi_id;
        let point5 = resultCompatibility.second_parson.sanmei.action_area.gekkanshi_id;
        let point6 = resultCompatibility.second_parson.sanmei.action_area.nenkanshi_id;

        console.log(point1,point2,point3,point4,point5,point6)
        // point1=4
        // point2=14
        // point3=42

        //描画する要素を取得
        let element = document.getElementById( "target" ) ;
        // console.log(element);
        let context = element.getContext( "2d" ) ;
        //既にある描画をクリア
        context.clearRect(0, 0, 200, 200);
        //描き始め
        context.beginPath () ;
        //円の描画
        context.arc( 100, 100, 95, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
        context.strokeStyle = "#d6cbcd" ; //色の指定
        context.lineWidth = 1 ; //線の幅の指定
        context.stroke() ; //描く実行

        //角度をラジアンへ変換
        function deg2Rad(angle) {
                return angle * Math.PI / 180;
        }

        context.fillStyle = '#fef8f9';//塗りつぶし色指定
        context.strokeStyle = "#ff69b4" ; //色の指定

        context.beginPath(); //描き始め
        context.moveTo(95*Math.cos(deg2Rad(point1*6-90))+100, 95*Math.sin(deg2Rad(point1*6-90))+100); //日干支Ｎｏ
        context.lineTo(95*Math.cos(deg2Rad(point2*6-90))+100, 95*Math.sin(deg2Rad(point2*6-90))+100); //月干支Ｎｏ
        context.lineTo(95*Math.cos(deg2Rad(point3*6-90))+100, 95*Math.sin(deg2Rad(point3*6-90))+100); //年干支Ｎｏ
        // context.fill(); //塗りつぶし
        context.closePath(); //パスを閉じる
        context.stroke(); //描く実行

        context.strokeStyle = "#6495ed" ; //色の指定

        context.beginPath(); //描き始め
        context.moveTo(95*Math.cos(deg2Rad(point4*6-90))+100, 95*Math.sin(deg2Rad(point4*6-90))+100); //日干支Ｎｏ
        context.lineTo(95*Math.cos(deg2Rad(point5*6-90))+100, 95*Math.sin(deg2Rad(point5*6-90))+100); //月干支Ｎｏ
        context.lineTo(95*Math.cos(deg2Rad(point6*6-90))+100, 95*Math.sin(deg2Rad(point6*6-90))+100); //年干支Ｎｏ
        // context.fill(); //塗りつぶし
        context.closePath(); //パスを閉じる
        context.stroke(); //描く実行
    }

    useEffect(() => {ryouiki();}); //レンダリング後に実行するように指定


    return(
            <div className="h-3/4 w-full overflow-y-scroll border rounded-xl mx-2 sm:m-5 sm:mt-1 bg-white px-10 py-3" >
                <hr className="mt-4 border-sea-pink-400" />
                <h1 className="text-2xl py-2 text-center border-sea-pink-400 w-full border-l-8 border-r-8 sm:border-r-0 sm:pl-2 sm:text-left font-medium ">相性鑑定結果</h1>
                    <hr className="mb-2 border-sea-pink-400" />
                {/* insen yousen table */}
                {/* 一人目 */}
                <div>
                    <div>
                        {resultCompatibility.first_parson.profile.name}
                        {resultCompatibility.first_parson.profile.birth_year}
                        {resultCompatibility.first_parson.profile.birth_month}
                        {resultCompatibility.first_parson.profile.birth_day}
                        {resultCompatibility.first_parson.profile.gender=='0' ? '男性':'女性'}
                    </div>
                    <div className="grid gap-10 mt-10 mb-12 sm:grid-cols-2  text-ebb-700">

                        <table >
                            <caption className="mb-3">陰占</caption>
                            <tbody>
                                {/* 左端に天中殺　右端に年干支天中殺　蔵干フラグで'>'の位置を調整 */}
                            <tr className="">
                                <ResultTableTd />
                                <ResultTableTd />
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.nikkan } tablestyle={`${insenStyleTd} `}/>
                                <ResultTableTd />
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.gekkan } tablestyle={`${insenStyleTd} `}/>
                                <ResultTableTd />
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.nenkan } tablestyle={`${insenStyleTd} `} />
                                <ResultTableTd />
                                <ResultTableTd />

                            </tr>
                            <tr className="">
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(0,1) } tablestyle="w-0"/>
                                <ResultTableTd />
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.nisshi } tablestyle={`${insenStyleTd} `} />
                                <ResultTableTd />
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.gesshi } tablestyle={`${insenStyleTd} `}/>
                                <ResultTableTd />
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.nenshi } tablestyle={`${insenStyleTd} `}/>
                                <ResultTableTd tablestyle="w-0"/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.kanshi_detail.nenkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(0,1) }tablestyle="w-0"/>

                            </tr>
                            <tr className="">
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(1,1) }/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.nikkanshizoukanflg == 0?  ">": ""} tablestyle={zoukanFlgTd}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.nikkanshizoukan1 }tablestyle={`${insenStyleTd} `} />
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.gekkanshizoukanflg == 0?  ">": ""} tablestyle={zoukanFlgTd}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.gekkanshizoukan1 }tablestyle={`${insenStyleTd} `} />
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.nenkanshizoukanflg == 0?  ">": ""} tablestyle={zoukanFlgTd}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.nenkanshizoukan1 } tablestyle={`${insenStyleTd} `}/>
                                <ResultTableTd />
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.kanshi_detail.nenkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(1,1) }/>
                            </tr>
                            <tr className="">
                                <ResultTableTd />
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.nikkanshizoukanflg == 1?  ">": ""} tablestyle={zoukanFlgTd}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.nikkanshizoukan2 } tablestyle={`${insenStyleTd}  `}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.gekkanshizoukanflg == 1?  ">": ""} tablestyle={zoukanFlgTd}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.gekkanshizoukan2 } tablestyle={`${insenStyleTd}  `} />
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.nenkanshizoukanflg == 1?  ">": ""} tablestyle={zoukanFlgTd}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.nenkanshizoukan2 } tablestyle={`${insenStyleTd} `}/>
                                <ResultTableTd />
                                <ResultTableTd />
                            </tr>
                            <tr>
                                <ResultTableTd />
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.nikkanshizoukanflg == 2?  ">": ""} tablestyle={zoukanFlgTd}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.nikkanshizoukan3 } tablestyle={`${insenStyleTd}  `} />
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.gekkanshizoukanflg == 2?  ">": ""} tablestyle={zoukanFlgTd}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.gekkanshizoukan3 } tablestyle={`${insenStyleTd}  `} />
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.nenkanshizoukanflg == 2?  ">": ""} tablestyle={zoukanFlgTd}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.insen.nenkanshizoukan3 } tablestyle={`${insenStyleTd} `} />
                                <ResultTableTd />
                                <ResultTableTd />
                            </tr>
                            </tbody>
                        </table>
                        {/* yousen */}
                        <table>
                        <caption className="mb-3">陽占</caption>
                        <tbody>
                            <tr className="border-b">
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.yousen.bansei } tablestyle={`${yousenStyleTd} border-r`}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.yousen.north } tablestyle={`${yousenStyleTd} border-r`}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.yousen.first } tablestyle={`${yousenStyleTd}`}/>

                            </tr>
                            <tr className="border-b">
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.yousen.west } tablestyle={`${yousenStyleTd} border-r`}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.yousen.center } tablestyle={`${yousenStyleTd} border-r`}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.yousen.east } tablestyle={`${yousenStyleTd}`}/>

                            </tr>
                            <tr>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.yousen.last } tablestyle={`${yousenStyleTd} border-r`}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.yousen.south } tablestyle={`${yousenStyleTd} border-r`}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.yousen.middle } tablestyle={`${yousenStyleTd}`}/>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 二人目 */}
                <div>
                    <div>
                        {resultCompatibility.second_parson.profile.name}
                        {resultCompatibility.second_parson.profile.birth_year}
                        {resultCompatibility.second_parson.profile.birth_month}
                        {resultCompatibility.second_parson.profile.birth_day}
                        {resultCompatibility.second_parson.profile.gender=='0' ? '男性':'女性'}
                    </div>
                    <div className="grid gap-10 mt-10 mb-12 sm:grid-cols-2  text-ebb-700">

                        <table >
                            <caption className="mb-3">陰占</caption>
                            <tbody>
                                {/* 左端に天中殺　右端に年干支天中殺　蔵干フラグで'>'の位置を調整 */}
                            <tr className="">
                                <ResultTableTd />
                                <ResultTableTd />
                                <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nikkan } tablestyle={`${insenStyleTd} `}/>
                                <ResultTableTd />
                                <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.gekkan } tablestyle={`${insenStyleTd} `}/>
                                <ResultTableTd />
                                <ResultTableTd value={resultCompatibility.second_parson.sanmei.insen.nenkan } tablestyle={`${insenStyleTd} `} />
                                <ResultTableTd />
                                <ResultTableTd />

                            </tr>
                            <tr className="">
                                <ResultTableTd value={resultCompatibility.second_parson.sanmei.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(0,1) } tablestyle="w-0"/>
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
                        {/* yousen */}
                        <table>
                            <caption className="mb-3">陽占</caption>
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
                <div>
                    <p className="text-center">行動領域</p>
                    <canvas id="target" width="200" height="200" className="mx-auto"/>
                </div>
                <div className='grid gap-10'>
                    <table>
                        <caption className="mb-3">位相法</caption>
                        <tbody>
                            <tr className="border-b">
                                <ResultTableTd tablestyle={`${yousenStyleTd} border-r`}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.kanshi_detail.nikkanshi_detail.kanshi_detail.kanshi} tablestyle={`${compatibilityStyleTd} border-r`}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.kanshi_detail.gekkanshi_detail.kanshi_detail.kanshi } tablestyle={`${compatibilityStyleTd} border-r`}/>
                                <ResultTableTd value={resultCompatibility.first_parson.sanmei.kanshi_detail.nenkanshi_detail.kanshi_detail.kanshi } tablestyle={`${compatibilityStyleTd}`}/>

                            </tr>
                            <tr className="border-b">
                                <ResultTableTd value={resultCompatibility.second_parson.sanmei.kanshi_detail.nikkanshi_detail.kanshi_detail.kanshi } tablestyle={`${compatibilityStyleTd} border-r`}/>
                                <ResultTableTd value={isEmpty(resultCompatibility.compatibility_isou['nikkanshi_nikkanshi']) ? '':
                                    <>
                                        {Object.keys(resultCompatibility.compatibility_isou['nikkanshi_nikkanshi']).map((i, key) =>{
                                            return(
                                                <p key={i} className={`${resultCompatibility.compatibility_isou['nikkanshi_nikkanshi'][i]['gou_san']==1 ? 'text-red-300' : 'text-blue-500'} `}>
                                                    {resultCompatibility.compatibility_isou['nikkanshi_nikkanshi'][i]['isou_name']}
                                                </p>
                                            )
                                        })}
                                    </>
                                    }
                                    tablestyle={`${yousenStyleTd} border-r`}
                                />

                                <ResultTableTd value={isEmpty(resultCompatibility.compatibility_isou['gekkanshi_nikkanshi']) ? '':
                                    <>
                                        {Object.keys(resultCompatibility.compatibility_isou['gekkanshi_nikkanshi']).map((i, key) =>{
                                        return(
                                                <p key={i} className={`${resultCompatibility.compatibility_isou['gekkanshi_nikkanshi'][i]['gou_san']==1 ? 'text-red-300' : 'text-blue-500'} `}>
                                                    {resultCompatibility.compatibility_isou['gekkanshi_nikkanshi'][i]['isou_name']}
                                                </p>
                                            )
                                        })}
                                    </>
                                    }
                                    tablestyle={`${yousenStyleTd} border-r`}
                                />
                                {console.log(isEmpty(resultCompatibility.compatibility_isou['nenkanshi_nikkanshi']))}
                                <ResultTableTd value={isEmpty(resultCompatibility.compatibility_isou['nenkanshi_nikkanshi']) ? '':
                                    <>
                                        {Object.keys(resultCompatibility.compatibility_isou['nenkanshi_nikkanshi']).map((i, key) =>{
                                            return(
                                                <p key={i} className={`${resultCompatibility.compatibility_isou['nenkanshi_nikkanshi'][i]['gou_san']==1 ? 'text-red-300' : 'text-blue-500'} `}>
                                                    {resultCompatibility.compatibility_isou['nenkanshi_nikkanshi'][i]['isou_name']}
                                                </p>
                                            )
                                        })}
                                    </>
                                    }
                                    tablestyle={`${yousenStyleTd} border-r`}
                                />
                            </tr>
                            <tr className="border-b">
                                <ResultTableTd value={resultCompatibility.second_parson.sanmei.kanshi_detail.gekkanshi_detail.kanshi_detail.kanshi } tablestyle={`${compatibilityStyleTd} border-r`}/>
                                <ResultTableTd value={isEmpty(resultCompatibility.compatibility_isou['nikkanshi_gekkanshi']) ? '':
                                    <>
                                        {Object.keys(resultCompatibility.compatibility_isou['nikkanshi_gekkanshi']).map((i, key) =>{
                                            return(
                                                <p key={i} className={`${resultCompatibility.compatibility_isou['nikkanshi_gekkanshi'][i]['gou_san']==1 ? 'text-red-300' : 'text-blue-500'} `}>
                                                    {resultCompatibility.compatibility_isou['nikkanshi_gekkanshi'][i]['isou_name']}
                                                </p>
                                            )
                                        })}
                                    </>
                                    }
                                    tablestyle={`${yousenStyleTd} border-r`}
                                />
                                <ResultTableTd value={isEmpty(resultCompatibility.compatibility_isou['gekkanshi_gekkanshi']) ? '':
                                    <>
                                        {Object.keys(resultCompatibility.compatibility_isou['gekkanshi_gekkanshi']).map((i, key) =>{
                                            return(
                                                <p key={i} className={`${resultCompatibility.compatibility_isou['gekkanshi_gekkanshi'][i]['gou_san']==1 ? 'text-red-300' : 'text-blue-500'} `}>
                                                    {resultCompatibility.compatibility_isou['gekkanshi_gekkanshi'][i]['isou_name']}
                                                </p>
                                            )
                                        })}
                                    </>
                                    }
                                    tablestyle={`${yousenStyleTd} border-r`}
                                />
                                <ResultTableTd value={isEmpty(resultCompatibility.compatibility_isou['nenkanshi_gekkanshi']) ? '':
                                    <>
                                        {Object.keys(resultCompatibility.compatibility_isou['nenkanshi_gekkanshi']).map((i, key) =>{
                                            return(
                                                <p key={i} className={`${resultCompatibility.compatibility_isou['nenkanshi_gekkanshi'][i]['gou_san']==1 ? 'text-red-300' : 'text-blue-500'} `}>
                                                    {resultCompatibility.compatibility_isou['nenkanshi_gekkanshi'][i]['isou_name']}
                                                </p>
                                            )
                                        })}
                                    </>
                                    }
                                    tablestyle={`${yousenStyleTd} border-r`}
                                />
                            </tr>
                            <tr>
                                <ResultTableTd value={resultCompatibility.second_parson.sanmei.kanshi_detail.nenkanshi_detail.kanshi_detail.kanshi } tablestyle={`${compatibilityStyleTd} border-r`}/>
                                <ResultTableTd value={isEmpty(resultCompatibility.compatibility_isou['nikkanshi_nenkanshi']) ? '':
                                    <>
                                        {Object.keys(resultCompatibility.compatibility_isou['nikkanshi_nenkanshi']).map((i, key) =>{
                                            return(
                                                <p key={i} className={`${resultCompatibility.compatibility_isou['nikkanshi_nenkanshi'][i]['gou_san']==1 ? 'text-red-300' : 'text-blue-500'} `}>
                                                    {resultCompatibility.compatibility_isou['nikkanshi_nenkanshi'][i]['isou_name']}
                                                </p>
                                            )
                                        })}
                                    </>
                                    }
                                    tablestyle={`${yousenStyleTd} border-r`}
                                />
                                <ResultTableTd value={isEmpty(resultCompatibility.compatibility_isou['gekkanshi_nenkanshi']) ? '':
                                    <>
                                        {Object.keys(resultCompatibility.compatibility_isou['gekkanshi_nenkanshi']).map((i, key) =>{
                                            return(
                                                <p key={i} className={`${resultCompatibility.compatibility_isou['gekkanshi_nenkanshi'][i]['gou_san']==1 ? 'text-red-300' : 'text-blue-500'} `}>
                                                    {resultCompatibility.compatibility_isou['gekkanshi_nenkanshi'][i]['isou_name']}
                                                </p>
                                            )
                                        })}
                                    </>
                                    }
                                    tablestyle={`${yousenStyleTd} border-r`}
                                />
                                <ResultTableTd value={isEmpty(resultCompatibility.compatibility_isou['nenkanshi_nenkanshi']) ? '':
                                    <>
                                        {Object.keys(resultCompatibility.compatibility_isou['nenkanshi_nenkanshi']).map((i, key) =>{
                                            return(
                                                <p key={i} className={`${resultCompatibility.compatibility_isou['nenkanshi_nenkanshi'][i]['gou_san']==1 ? 'text-red-300' : 'text-blue-500'} `}>
                                                    {resultCompatibility.compatibility_isou['nenkanshi_nenkanshi'][i]['isou_name']}
                                                </p>
                                            )
                                        })}
                                    </>
                                    }
                                    tablestyle={`${yousenStyleTd} border-r`}
                                />
                            </tr>
                        </tbody>
                    </table>
                </div>



        </div>);
}
