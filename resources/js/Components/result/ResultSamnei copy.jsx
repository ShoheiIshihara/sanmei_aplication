import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { isEmpty } from 'lodash';


import ResultTableTd from '@/Components/ResultTableTd';
import ResultContentBox from './parts/ResultContetBox';

export default function ResultSumnei() {

    const result = useSelector(state => state.result.result.sanmei);
    const resultIsouho = useSelector(state => state.result.result.isoho.life_time);

    // console.log(result);
    // console.log(typeof(resultIsouho));
    // console.log(isEmpty(resultIsouho));

    const startDateTimeUnix = new Date(result.tenchusatsu_term.start_date_unix * 1000);
    const startDateTimeStr = startDateTimeUnix.toLocaleDateString();

    const endDateTimeUnix = new Date(result.tenchusatsu_term.end_date_unix * 1000);
    const endDateTimeStr = endDateTimeUnix.toLocaleDateString();

    const startDateTimeMonthUnix = new Date(result.tenchusatsu_term_month.start_date_unix * 1000);
    const startDateTimeMonthStr =  startDateTimeMonthUnix.toLocaleDateString();
    const endDateTimeMonthUnix = new Date(result.tenchusatsu_term_month.end_date_unix * 1000);
    const endDateTimeMonthStr = endDateTimeMonthUnix.toLocaleDateString();

    const insenStyleTd="w-4 text-left h-9 pr-1";
    const yousenStyleTd="px-3 py-1 text-center";
    const zoukanFlgTd ="text-right w-3 p-0";
    const[nikkanshiCommentOpen, setNikkanshiCommentOpen] = useState(false);
    const[gekkanshiCommentOpen, setGekkanshiCommentOpen] = useState(false);
    const[nenkanshiCommentOpen, setNenkanshiCommentOpen] = useState(false);

    const[nikkanGouCommentOpen, setNikkanGouCommentOpen] = useState(false);
    const[gekkanGouCommentOpen, setGekkanGouCommentOpen] = useState(false);
    const[nenkanGouCommentOpen, setNenkanGouCommentOpen] = useState(false);

    const[nikkanIjouCommentOpen, setNikkanIjouCommentOpen] = useState(false);
    const[gekkanIjouCommentOpen, setGekkanIjouCommentOpen] = useState(false);
    const[nenkanIjouCommentOpen, setNenkanIjouCommentOpen] = useState(false);

    const[energyCommentOpen, setEnergyCommentOpen] = useState(false);
    const[hachimonCommentOpen, setHachimonCommentOpen] = useState(false);

    const energy_th = ['甲','乙','丙','丁','戊','己','庚','辛','壬', '癸','合計'];
    //  行動領域
    function ryouiki(){
        //干支Noの取得
        let point1 = result.action_area.nikkanshi_id;
        let point2 = result.action_area.gekkanshi_id;
        let point3 = result.action_area.nenkanshi_id;
        // console.log(point1,point2,point3)
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
        context.strokeStyle = "#D35F74" ; //色の指定
        context.beginPath(); //描き始め
        context.moveTo(95*Math.cos(deg2Rad(point1*6-90))+100, 95*Math.sin(deg2Rad(point1*6-90))+100); //日干支Ｎｏ
        context.lineTo(95*Math.cos(deg2Rad(point2*6-90))+100, 95*Math.sin(deg2Rad(point2*6-90))+100); //月干支Ｎｏ
        context.lineTo(95*Math.cos(deg2Rad(point3*6-90))+100, 95*Math.sin(deg2Rad(point3*6-90))+100); //年干支Ｎｏ
        context.fill(); //塗りつぶし
        context.closePath(); //パスを閉じる
        context.stroke(); //描く実行
    }

    useEffect(() => {ryouiki();}); //レンダリング後に実行するように指定


    return(
            <div className="" >
                <hr className="mt-4 border-sea-pink-400" />
                <h1 className="text-2xl py-2 text-center border-sea-pink-400 w-full border-l-8 border-r-8 sm:border-r-0 sm:pl-2 sm:text-left font-medium ">算命学　鑑定結果</h1>
                    <hr className="mb-2 border-sea-pink-400" />
                {/* insen yousen table */}
                <div className="grid gap-4 mb-12 sm:grid-cols-2  lg:grid-cols-3 text-ebb-700">
                     {/* カードコンポーネント及びモーダル  */}
                     <div className='mt-10 '>
                        <button className='' onClick={()=>window.my_modal_2.showModal()}>
                            <div className="card w-96 bg-base-100 shadow-xl  hover:bg-gray-700 " >
                                <div className="card-body bg-white ">
                                    <h2 className="card-title">陰占</h2>
                                    <table >
                                        <caption className="mb-3">陰占</caption>
                                        <tbody>
                                            {/* 左端に天中殺　右端に年干支天中殺　蔵干フラグで'>'の位置を調整 */}
                                            <tr className="">
                                                <ResultTableTd />
                                                <ResultTableTd />
                                                <ResultTableTd value={result.insen.nikkan } tablestyle={`${insenStyleTd} `}/>
                                                <ResultTableTd />
                                                <ResultTableTd value={result.insen.gekkan } tablestyle={`${insenStyleTd} `}/>
                                                <ResultTableTd />
                                                <ResultTableTd value={result.insen.nenkan } tablestyle={`${insenStyleTd} `} />
                                                <ResultTableTd />
                                                <ResultTableTd />

                                            </tr>
                                            <tr className="">
                                                <ResultTableTd value={result.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(0,1) } tablestyle="w-0"/>
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
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">詳細</button>
                                    </div>
                                </div>
                            </div>
                        </button>

                        {/* モーダル内容 */}
                        <dialog id="my_modal_2" className="modal">
                            <form method="dialog" className="modal-box">
                            <button htmlFor="my_modal_2" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                   {/* 日干支詳細 */}
                                   <ResultContentBox
                                    title="日干支"
                                    content={result.kanshi_detail.nikkanshi_detail.kanshi_detail.kanshi}
                                    subcontent={result.kanshi_detail.nikkanshi_detail.kanshi_detail.nickname}
                                    detail={result.kanshi_detail.nikkanshi_detail.kanshi_detail.kanshi_detail}
                                >
                                    {/* //コメント表示 */}
                                    <button className="m-4 ml-0 mb-0 p-3 text-sm hover:font-semibold" onClick={(e) => setNikkanshiCommentOpen(!nikkanshiCommentOpen)}>
                                        <span  className="pr-1">{nikkanshiCommentOpen ? "-": "+"}</span>
                                        コメント
                                        <span className={`${nikkanshiCommentOpen ? 'hidden' : ''}`}>...</span>
                                    </button>

                                    <p className={`mx-4 text-sm border-y-4 p-4 rounded ${nikkanshiCommentOpen ? '' : 'hidden'}`}>
                                        {result.kanshi_detail.nikkanshi_detail.kanshi_detail.explanation}
                                    </p>
                                            {result.kanshi_detail.nikkanshi_detail.gou_detail[0].gou_id !=0 ?
                                                (<dl className="mx-3 my-3 p-2 bg-gray-100 text-xs rounded">
                                                    <dt>●{result.kanshi_detail.nikkanshi_detail.gou_detail[0].gou}</dt>
                                                    <dd className="ml-2 mt-1">{result.kanshi_detail.nikkanshi_detail.gou_detail[0].gou_detail}</dd>
                                                    <button className="m-4 ml-0 mb-0 p-3 text-xs hover:font-semibold" onClick={(e) => setNikkanGouCommentOpen(!nikkanGouCommentOpen)}>
                                                        <span  className="pr-1">{nikkanGouCommentOpen ? "-": "+"}</span>
                                                            業について
                                                        <span className={`${nikkanGouCommentOpen ? 'hidden' : ''}`}>...</span>
                                                    </button>
                                                    <p className={`mx-4 text-xs border-y-4 p-4 rounded ${nikkanGouCommentOpen ? '' : 'hidden'}`}>
                                                        業を持っていると目に見えないモノを直感的に見抜く力が出てくる。霊力がある人が多い。また、業の現象が現れると運勢が上がる。<br />
                                                        日干支に業を持っていると影響が強くすぐに現象が現れる。月干支は年を取るにつれてじわじわ出てくる。<br />
                                                        年干支に業を持っている場合、影響はあまり出ないが、周囲の陽転者の影響を受け発現することがある。
                                                    </p>
                                                </dl>)
                                            :""}
                                            {result.kanshi_detail.nikkanshi_detail.ijou_detail[0].ijou_kanshi_id !=0 ?
                                                (<dl className="mx-3 my-3 p-2 bg-gray-100 text-xs rounded">
                                                    <dt>{result.kanshi_detail.nikkanshi_detail.ijou_detail[0].ijou_kanshi}</dt>
                                                    <dd className="ml-2 mt-1">{result.kanshi_detail.nikkanshi_detail.ijou_detail[0].ijou_detail}</dd>
                                                </dl>)
                                            :""}

                                </ResultContentBox>

                                  {/* 月干支詳細 */}
                                <ResultContentBox
                                    title="月干支"
                                    content={result.kanshi_detail.gekkanshi_detail.kanshi_detail.kanshi}
                                    subcontent={result.kanshi_detail.gekkanshi_detail.kanshi_detail.nickname}
                                    detail={result.kanshi_detail.gekkanshi_detail.kanshi_detail.kanshi_detail}
                                >
                                    {/* //コメント表示 */}
                                    <button className="m-4 ml-0 mb-0 p-3 text-sm hover:font-semibold" onClick={(e) => setGekkanshiCommentOpen(!gekkanshiCommentOpen)}>
                                        <span  className="pr-1">{gekkanshiCommentOpen ? "-": "+"}</span>
                                        コメント
                                        <span className={`${gekkanshiCommentOpen ? 'hidden' : ''}`}>...</span>
                                    </button>

                                    <p className={`mx-4 text-sm border-y-4 p-4 rounded ${gekkanshiCommentOpen ? '' : 'hidden'}`}>
                                        {result.kanshi_detail.gekkanshi_detail.kanshi_detail.explanation}
                                    </p>
                                    {result.kanshi_detail.gekkanshi_detail.gou_detail[0].gou_id !=0 ?
                                        (<dl className="mx-3 my-3 p-2 bg-gray-100 text-xs rounded">
                                            <dt>●{result.kanshi_detail.gekkanshi_detail.gou_detail[0].gou}</dt>
                                            <dd className="ml-2 mt-1">{result.kanshi_detail.gekkanshi_detail.gou_detail[0].gou_detail}</dd>
                                            <button className="m-4 ml-0 mb-0 p-3 text-xs hover:font-semibold" onClick={(e) => setGekkanGouCommentOpen(!gekkanGouCommentOpen)}>
                                                <span  className="pr-1">{gekkanGouCommentOpen ? "-": "+"}</span>
                                                    業について
                                                <span className={`${gekkanGouCommentOpen ? 'hidden' : ''}`}>...</span>
                                            </button>
                                            <p className={`mx-4 text-xs border-y-4 p-4 rounded ${gekkanGouCommentOpen ? '' : 'hidden'}`}>
                                                業を持っていると目に見えないモノを直感的に見抜く力が出てくる。霊力がある。また、業の現象が現れると運勢が上がる。<br />
                                                日干支に業を持っていると影響が強くすぐに現象が現れる。月干支は年を取るにつれてじわじわ出てくる。<br />
                                                年干支に業を持っている場合、影響はあまり出ないが、周囲の陽転者の影響を受け発現することがある。
                                            </p>
                                        </dl>)
                                    :""}
                                    {result.kanshi_detail.gekkanshi_detail.ijou_detail[0].ijou_kanshi_id !=0 ?
                                        (<dl className="mx-3 my-3 p-2 bg-gray-100 text-xs rounded">
                                            <dt>●{result.kanshi_detail.gekkanshi_detail.ijou_detail[0].ijou_kanshi}</dt>
                                            <dd className="ml-2 mt-1">{result.kanshi_detail.gekkanshi_detail.ijou_detail[0].ijou_detail}</dd>
                                        </dl>)
                                    :""}
                                </ResultContentBox>

                                {/* 年干支詳細 */}
                                <ResultContentBox
                                    title="年干支"
                                    content={result.kanshi_detail.nenkanshi_detail.kanshi_detail.kanshi}
                                    subcontent={result.kanshi_detail.nenkanshi_detail.kanshi_detail.nickname}
                                    detail={result.kanshi_detail.nenkanshi_detail.kanshi_detail.kanshi_detail}
                                >
                                    {/* //コメント表示 */}
                                    <button className="m-4 ml-0 mb-0 p-3 text-sm hover:font-semibold" onClick={(e) => setNenkanshiCommentOpen(!nenkanshiCommentOpen)}>
                                        <span  className="pr-1">{nenkanshiCommentOpen ? "-": "+"}</span>
                                        コメント
                                        <span className={`${nenkanshiCommentOpen ? 'hidden' : ''}`}>...</span>
                                    </button>

                                    <p className={`mx-4 text-sm border-y-4 p-4 rounded ${nenkanshiCommentOpen ? '' : 'hidden'}`}>
                                        {result.kanshi_detail.nenkanshi_detail.kanshi_detail.explanation}
                                    </p>

                                    {result.kanshi_detail.nenkanshi_detail.gou_detail[0].gou_id !=0 ?
                                        (<dl className="mx-3 my-3 p-2 bg-gray-100 text-xs rounded">
                                            <dt>●{result.kanshi_detail.nenkanshi_detail.gou_detail[0].gou}</dt>
                                            <dd className="ml-2 mt-1">{result.kanshi_detail.nenkanshi_detail.gou_detail[0].gou_detail}</dd>
                                            <button className="m-4 ml-0 mb-0 p-3 text-xs hover:font-semibold" onClick={(e) => setNenkanGouCommentOpen(!nenkanGouCommentOpen)}>
                                                <span  className="pr-1">{nenkanGouCommentOpen ? "-": "+"}</span>
                                                    業について
                                                <span className={`${nenkanGouCommentOpen ? 'hidden' : ''}`}>...</span>
                                            </button>
                                            <p className={`mx-4 text-xs border-y-4 p-4 rounded ${nenkanGouCommentOpen ? '' : 'hidden'}`}>
                                                業を持っていると目に見えないモノを直感的に見抜く力が出てくる。霊力がある。また、業の現象が現れると運勢が上がる。<br />
                                                日干支に業を持っていると影響が強くすぐに現象が現れる。月干支は年を取るにつれてじわじわ出てくる。<br />
                                                年干支に業を持っている場合、影響はあまり出ないが、周囲の陽転者の影響を受け発現することがある。
                                            </p>
                                        </dl>)
                                    :""}
                                    {result.kanshi_detail.nenkanshi_detail.ijou_detail[0].ijou_kanshi_id !=0 ?
                                        (<dl className="mx-3 my-3 p-2 bg-gray-100 text-xs rounded">
                                            <dt>{result.kanshi_detail.nenkanshi_detail.ijou_detail[0].ijou_kanshi}</dt>
                                            <dd className="ml-2 mt-1">{result.kanshi_detail.nenkanshi_detail.ijou_detail[0].ijou_detail}</dd>
                                        </dl>)
                                    :""}
                                </ResultContentBox>
                            </form>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>

                    {/* yousen */}
                    <div className='mt-10 '>
                        <button className='' onClick={()=>window.my_modal_3.showModal()}>
                            <div className="card w-96 bg-base-100 shadow-xl hover:bg-gray-700 " >
                                <div className="card-body">
                                    <h2 className="card-title">陽占</h2>
                                    <table>
                                    <caption className="mb-3">陽占</caption>
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
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">詳細</button>
                                    </div>
                                </div>
                            </div>
                        </button>

                        {/* モーダル内容 */}
                        <dialog id="my_modal_3" className="modal">
                            <form method="dialog" className="modal-box">
                            <button htmlFor="my_modal_2" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                               
                            </form>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>

                   
                    <div>
                        <p className="text-center">行動領域</p>
                        <canvas id="target" width="200" height="200" className="mx-auto"/>
                    </div>

                    <div className="text-center relative ">

                        <div className="absolute teop-1/4 left-1/4">
                            {/* 天中殺： */}
                            <div className="">天中殺：{result.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu}</div>
                            {/* エネルギー */}
                            <div className="">エネルギー：{result.energy[10]}</div>
                        </div>
                    </div>
                    {/* 生涯天中殺 */}
                    <div className='text-center mx-auto'>
                        <p className='mb-2'>生涯位相法</p>
                        <div className="bg-ebb-100 w-[300px] h-44 relative text-center">
                            <div className="absolute w-12 text-center top-1/3 left-0 -mt-6">
                                <span className="block text-sm">{result.kanshi_detail.nikkanshi_detail.kanshi_detail.kanshi}</span>
                            </div>
                            <div className="absolute w-12 text-center top-1/3 left-1/2 -mt-6 -ml-6">
                                <span className="block text-sm">{result.kanshi_detail.gekkanshi_detail.kanshi_detail.kanshi}</span>
                            </div>
                            <div className="absolute w-12 text-center top-1/3 right-0 -mt-6">
                                <span className="block text-sm">{result.kanshi_detail.nenkanshi_detail.kanshi_detail.kanshi}</span>
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
                                                    <div key={key} className="absolute w-28 text-center text-sm top-1/2 right-7 -mt-6 leading-3">
                                                        <div className="text-sm">
                                                            <p className={`absolute right-[16px] top-${i*4}  ${resultIsouho['nengetsu'][i]['gou_san'] == '0' ? 'text-blue-500' : 'text-red-300' }`}>{resultIsouho['nengetsu'][i]['isou_name']}</p>
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
                    <div className='text-center mx-auto'>
                        <p className='mb-2'>気図法</p>
                        <div className="bg-ebb-100 w-44 h-44 relative text-center">
                            <div className="absolute w-12 text-center top-1 left-1/2 -ml-6">
                                <span className="block text-sm">水</span>
                                <span className="block text-sea-pink-400 font-medium -mt-1">{result.kizuhou.water}</span>
                            </div>
                            <div className="absolute w-12 text-center top-1/2 left-0 -mt-6">
                                <span className="block text-sm">金</span>
                                <span className="block text-sea-pink-400 font-medium -mt-1">{result.kizuhou.gold}</span>
                            </div>
                            <div className="absolute w-12 text-center top-1/2 left-1/2 -mt-6 -ml-6">
                                <span className="block text-sm">土</span>
                                <span className="block text-sea-pink-400 font-medium -mt-1">{result.kizuhou.soil}</span>
                            </div>
                            <div className="absolute w-12 text-center top-1/2 right-0 -mt-6">
                                <span className="block text-sm">木</span>
                                <span className="block text-sea-pink-400 font-medium -mt-1">{result.kizuhou.wood}</span>
                            </div>

                            <div className="absolute w-12 text-center bottom-1 left-1/2 -ml-6">
                                <span className="block text-sm">火</span>
                                <span className="block text-sea-pink-400 font-medium -mt-1">{result.kizuhou.fire}</span>
                            </div>
                            {/* 線 */}
                            <p className="absolute w-12 text-center text-sm top-10 left-1/2 -ml-6">|</p>
                            <p className="absolute w-12 text-center text-sm bottom-12 left-1/2 -ml-6">|</p>
                            <p className="absolute w-12 text-center text-sm top-1/2 right-8 -mt-3">―</p>
                            <p className="absolute w-12 text-center text-sm top-1/2 left-8 -mt-3">―</p>
                        </div>
                    </div>
                    <div className='text-center mx-auto'>
                        <p className='mb-2'>八門法</p>
                        <div className="bg-ebb-100 w-44 h-44 relative">

                            <div className="absolute w-12 text-center top-1 left-1/2 -ml-6">
                                <span className="block text-sm">北</span>
                                <span className="block text-sea-pink-400 font-medium -mt-1">{result.hachimonhou.north}</span>
                            </div>
                            <div className="absolute w-12 text-center top-1/2 left-0 -mt-6">
                                <span className="block text-sm">西</span>
                                <span className="block text-sea-pink-400 font-medium -mt-1">{result.hachimonhou.west}</span>
                            </div>
                            <div className="absolute w-12 text-center top-1/2 left-1/2 -mt-6 -ml-6">
                                <span className="block text-sm">中央</span>
                                <span className="block text-sea-pink-400 font-medium -mt-1">{result.hachimonhou.center}</span>
                            </div>
                            <div className="absolute w-12 text-center top-1/2 right-0 -mt-6">
                                <span className="block text-sm">東</span>
                                <span className="block text-sea-pink-400 font-medium -mt-1">{result.hachimonhou.east}</span>
                            </div>
                            <div className="absolute w-12 text-center bottom-1 left-1/2 -ml-6">
                                <span className="block text-sm">南</span>
                                <span className="block text-sea-pink-400 font-medium -mt-1">{result.hachimonhou.south}</span>
                            </div>
                            {/* 線 */}
                            <p className="absolute w-12 text-center text-sm top-10 left-1/2 -ml-6">|</p>
                            <p className="absolute w-12 text-center text-sm bottom-12 left-1/2 -ml-6">|</p>
                            <p className="absolute w-12 text-center text-sm top-1/2 right-8 -mt-3">―</p>
                            <p className="absolute w-12 text-center text-sm top-1/2 left-8 -mt-3">―</p>
                        </div>
                    </div>
                </div>

                {/* ここから解説 */}

                <div className="whitespace-pre-wrap text-justify">
                    <h1 className="text-2xl w-full border-l-8  border-r-8 sm:border-r-0 text-center sm:text-left sm:pl-2 font-medium border-sea-pink-400 ">解説</h1>
                    <hr className="mb-2 border border-sea-pink-400" />
                  

                    {/* 月干支詳細 */}
                    <ResultContentBox
                        title="月干支"
                        content={result.kanshi_detail.gekkanshi_detail.kanshi_detail.kanshi}
                        subcontent={result.kanshi_detail.gekkanshi_detail.kanshi_detail.nickname}
                        detail={result.kanshi_detail.gekkanshi_detail.kanshi_detail.kanshi_detail}
                    >
                        {/* //コメント表示 */}
                        <button className="m-4 ml-0 mb-0 p-3 text-sm hover:font-semibold" onClick={(e) => setGekkanshiCommentOpen(!gekkanshiCommentOpen)}>
                            <span  className="pr-1">{gekkanshiCommentOpen ? "-": "+"}</span>
                            コメント
                            <span className={`${gekkanshiCommentOpen ? 'hidden' : ''}`}>...</span>
                        </button>

                        <p className={`mx-4 text-sm border-y-4 p-4 rounded ${gekkanshiCommentOpen ? '' : 'hidden'}`}>
                            {result.kanshi_detail.gekkanshi_detail.kanshi_detail.explanation}
                        </p>
                        {result.kanshi_detail.gekkanshi_detail.gou_detail[0].gou_id !=0 ?
                            (<dl className="mx-3 my-3 p-2 bg-gray-100 text-xs rounded">
                                <dt>●{result.kanshi_detail.gekkanshi_detail.gou_detail[0].gou}</dt>
                                <dd className="ml-2 mt-1">{result.kanshi_detail.gekkanshi_detail.gou_detail[0].gou_detail}</dd>
                                <button className="m-4 ml-0 mb-0 p-3 text-xs hover:font-semibold" onClick={(e) => setGekkanGouCommentOpen(!gekkanGouCommentOpen)}>
                                    <span  className="pr-1">{gekkanGouCommentOpen ? "-": "+"}</span>
                                        業について
                                    <span className={`${gekkanGouCommentOpen ? 'hidden' : ''}`}>...</span>
                                </button>
                                <p className={`mx-4 text-xs border-y-4 p-4 rounded ${gekkanGouCommentOpen ? '' : 'hidden'}`}>
                                    業を持っていると目に見えないモノを直感的に見抜く力が出てくる。霊力がある。また、業の現象が現れると運勢が上がる。<br />
                                    日干支に業を持っていると影響が強くすぐに現象が現れる。月干支は年を取るにつれてじわじわ出てくる。<br />
                                    年干支に業を持っている場合、影響はあまり出ないが、周囲の陽転者の影響を受け発現することがある。
                                </p>
                            </dl>)
                        :""}
                        {result.kanshi_detail.gekkanshi_detail.ijou_detail[0].ijou_kanshi_id !=0 ?
                            (<dl className="mx-3 my-3 p-2 bg-gray-100 text-xs rounded">
                                <dt>●{result.kanshi_detail.gekkanshi_detail.ijou_detail[0].ijou_kanshi}</dt>
                                <dd className="ml-2 mt-1">{result.kanshi_detail.gekkanshi_detail.ijou_detail[0].ijou_detail}</dd>
                            </dl>)
                        :""}
                    </ResultContentBox>

                    {/* 年干支詳細 */}
                    <ResultContentBox
                        title="年干支"
                        content={result.kanshi_detail.nenkanshi_detail.kanshi_detail.kanshi}
                        subcontent={result.kanshi_detail.nenkanshi_detail.kanshi_detail.nickname}
                        detail={result.kanshi_detail.nenkanshi_detail.kanshi_detail.kanshi_detail}
                    >
                        {/* //コメント表示 */}
                        <button className="m-4 ml-0 mb-0 p-3 text-sm hover:font-semibold" onClick={(e) => setNenkanshiCommentOpen(!nenkanshiCommentOpen)}>
                            <span  className="pr-1">{nenkanshiCommentOpen ? "-": "+"}</span>
                            コメント
                            <span className={`${nenkanshiCommentOpen ? 'hidden' : ''}`}>...</span>
                        </button>

                        <p className={`mx-4 text-sm border-y-4 p-4 rounded ${nenkanshiCommentOpen ? '' : 'hidden'}`}>
                            {result.kanshi_detail.nenkanshi_detail.kanshi_detail.explanation}
                        </p>

                        {result.kanshi_detail.nenkanshi_detail.gou_detail[0].gou_id !=0 ?
                            (<dl className="mx-3 my-3 p-2 bg-gray-100 text-xs rounded">
                                <dt>●{result.kanshi_detail.nenkanshi_detail.gou_detail[0].gou}</dt>
                                <dd className="ml-2 mt-1">{result.kanshi_detail.nenkanshi_detail.gou_detail[0].gou_detail}</dd>
                                <button className="m-4 ml-0 mb-0 p-3 text-xs hover:font-semibold" onClick={(e) => setNenkanGouCommentOpen(!nenkanGouCommentOpen)}>
                                    <span  className="pr-1">{nenkanGouCommentOpen ? "-": "+"}</span>
                                        業について
                                    <span className={`${nenkanGouCommentOpen ? 'hidden' : ''}`}>...</span>
                                </button>
                                <p className={`mx-4 text-xs border-y-4 p-4 rounded ${nenkanGouCommentOpen ? '' : 'hidden'}`}>
                                    業を持っていると目に見えないモノを直感的に見抜く力が出てくる。霊力がある。また、業の現象が現れると運勢が上がる。<br />
                                    日干支に業を持っていると影響が強くすぐに現象が現れる。月干支は年を取るにつれてじわじわ出てくる。<br />
                                    年干支に業を持っている場合、影響はあまり出ないが、周囲の陽転者の影響を受け発現することがある。
                                </p>
                            </dl>)
                        :""}
                        {result.kanshi_detail.nenkanshi_detail.ijou_detail[0].ijou_kanshi_id !=0 ?
                            (<dl className="mx-3 my-3 p-2 bg-gray-100 text-xs rounded">
                                <dt>{result.kanshi_detail.nenkanshi_detail.ijou_detail[0].ijou_kanshi}</dt>
                                <dd className="ml-2 mt-1">{result.kanshi_detail.nenkanshi_detail.ijou_detail[0].ijou_detail}</dd>
                            </dl>)
                        :""}
                    </ResultContentBox>

                    {/* 宿命位相詳細 */}
                    <ResultContentBox
                        title="宿命位相"

                    >
                        {/* {console.log(resultIsouho['nichigetsu']) } */}
                        <div>

                        {!isEmpty(resultIsouho['nichigetsu']) ?
                            <><p className="mx-3 text-lg font-medium">日月</p>
                               {Object.keys(resultIsouho['nichigetsu']).map((index)=>{
                                return(
                                    <>
                                        <dl key={index} className="mx-3 my-3 p-2 ">
                                            <dt className="text-lg font-medium">{resultIsouho['nichigetsu'][index]['isou_name']}</dt>
                                            <dd className="ml-6 mt-1">{resultIsouho['nichigetsu'][index]['shukumei_detail']}</dd>
                                            <dd className="ml-6 mt-1">{resultIsouho['nichigetsu'][index]['gappi']}</dd>
                                        </dl>
                                    </>
                                )
                               })}
                            </>
                        :""}
                        </div>
                        <div>
                         {!isEmpty(resultIsouho['nengetsu']) ?
                            <><p className="mx-3 my-3 p-2 ">年月</p>
                               {Object.keys(resultIsouho['nengetsu']).map((index)=>{
                                return(
                                    <>
                                        <dl key={index} className="mx-6 my-3 p-2 ">
                                            <dt className="text-lg font-medium">{resultIsouho['nengetsu'][index]['isou_name']}</dt>
                                            <dd className="ml-6 mt-1">{resultIsouho['nengetsu'][index]['shukumei_detail']}</dd>
                                            <dd className="ml-6 mt-1">{resultIsouho['nengetsu'][index]['nengetsu']}</dd>
                                        </dl>
                                    </>
                                )
                               })}
                            </>
                        :""}
                        </div>
                        <div>
                         {!isEmpty(resultIsouho['nichinen']) ?
                            <><p>日年</p>
                               {Object.keys(resultIsouho['nichinen']).map((index)=>{
                                return(
                                    <>
                                        <dl key={index} className="mx-3 my-3 p-2 ">
                                            <dt className='text-lg font-medium'>{resultIsouho['nichinen'][index]['isou_name']}</dt>
                                            <dd className="ml-6 mt-1">{resultIsouho['nichinen'][index]['shukumei_detail']}</dd>
                                            <dd className="ml-6 mt-1">{resultIsouho['nichinen'][index]['nichinen']}</dd>
                                        </dl>
                                    </>
                                )
                               })}
                            </>
                        :""}
                        </div>
                    </ResultContentBox>

                    {/* 天中殺詳細 */}
                    <ResultContentBox
                        title='天中殺'
                        content={result.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu}
                        detail={result.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu_detail}
                    >
                        <p className='ml-4 text-sm'>直近の年天中殺は{startDateTimeStr}〜{endDateTimeStr}になります。</p>
                        <p className='ml-4 text-sm'>直近の月天中殺は{startDateTimeMonthStr}〜{endDateTimeMonthStr}になります。</p>
                    </ResultContentBox>
                    {/* エネルギー */}
                    <div className="p-3 pr-0 mb-12">
                        <h2 className="font-medium pl-2">エネルギー:{result.energy[10]}</h2>
                        <hr className=" border-yellow-300 mb-2"/>
                        <div className="sm:mx-4 sm:mt-0 mt-5 text-sm leading-6 overflow-x-auto">
                            <table className="border-collapse">
                                <thead>
                                    <tr>
                                    {energy_th.map((val,i) =>
                                             <th key={i} className="border px-3 py-1 ">{val}</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* {console.log(result.energy)} */}
                                        {result.energy.map((val,i) =>
                                             <td key={i} className="border px-3 py-1 ">{val}</td>
                                        )}

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* //コメント表示 */}
                        <button className="m-4 ml-0 mb-0 p-3 text-sm hover:font-semibold" onClick={(e) => setEnergyCommentOpen(!energyCommentOpen)}>
                            <span  className="pr-1">{energyCommentOpen ? "-": "+"}</span>
                            コメント
                            <span className={`${energyCommentOpen ? 'hidden' : ''}`}>...</span>
                        </button>

                        <p className={`mx-4 text-sm border-y-4 p-4 rounded ${energyCommentOpen ? '' : 'hidden'}`}>
                            エネルギー対して排気口（初年期、中年期、晩年気の総和）が小さいと病気、離婚、干されるなどの現象が起こりやすい。<br />
                            逆にエネルギーに対して排気口が大きいと短命になりやすいと言われている。<br />
                            妻のエネルギーが高い場合は夫は短命。逆は妻が病気がちになりやすい。
                        </p>
                    </div>
                    {/* 八門詳細 */}
                    <ResultContentBox  title='八門法' content={result.hachimon_type} detail={result.hachimon_type_detail}>
                        {/* //コメント表示 */}
                        <button className="m-4 ml-0 mb-0 p-3 text-sm hover:font-semibold" onClick={(e) => setHachimonCommentOpen(!hachimonCommentOpen)}>
                            <span  className="pr-1">{hachimonCommentOpen ? "-": "+"}</span>
                            コメント
                            <span className={`${hachimonCommentOpen ? 'hidden' : ''}`}>...</span>
                        </button>
                        <p className={`mx-4 text-sm border-y-4 p-4 rounded ${hachimonCommentOpen ? '' : 'hidden'}`}>
                            最大値と最小値の差は人生の振幅のとも言われ、差が50以上なら人生のムラが大きい。特に100を超えてると激しい人生となる。<br />
                            また、差が大きいほど欲深いとも言われている
                        </p>
                    </ResultContentBox>
                </div>

        </div>);
}
