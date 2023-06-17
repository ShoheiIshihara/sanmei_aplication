
import React from 'react';
import { useEffect,useState } from 'react';

import { useSelector } from "react-redux";
import { isEmpty } from 'lodash';


import ResultTableTd from '@/Components/result/parts/ResultTableTd';
import ModalLayout from '../ModalLayout';

export default function KoudouIsouResult(){

    const result = useSelector(state => state.result.result.sanmei);
    const resultIsouho = useSelector(state => state.result.result.isoho.life_time);
    const resultCompatibility = useSelector(state => state.result.compatibilityResult);

    console.log(resultCompatibility);


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
       <div className='mx-auto w-full md:h-[360px]'>
            <div>
                <div className="card  shadow-md w-max-md bg-white w-full h-full ">
                    <div className="card-body  mx-auto">
                        <h2 className='card-title mx-auto'>
                           相性
                        </h2>
                    
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <div className="flex justify-center items-center ">
                                <canvas id="target" width="200" height="200" />
                            </div>
                            <table className='w-[80%] h-[80%] mx-auto'>
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
                    </div>
                </div>
     
                {/* モーダル内容 */}
              
            </div>

        </div>
    )
}