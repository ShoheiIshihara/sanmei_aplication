import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { useSelector,useDispatch } from "react-redux";
import { useEffect,useState } from 'react';

import ResultTableTd from '@/Components/result/parts/ResultTableTd';




export const ExportPdfComponent = () =>{
    const result = useSelector(state => state.result.result);

    const [ isShow, setIsShow ] = useState(false);

    const pdfDownloadHandler = async() =>{
        await setIsShow(true);
        let downloadEle ='';
        const name = result.profile.name;
       const target1 = document.getElementById('karute');
       if(target1 === null ) return;

       //個性診断カルテ出力
       html2canvas(target1, { scale:1.5, allowTaint:true, useCORS:true, }).then((canvas)=>{
           let downloadEle = document.createElement("a");
           downloadEle.href = canvas.toDataURL("image/jpeg", 1.0);
           downloadEle.download = `${name}様_自己分析シート①.jpg`;
           downloadEle.click();
       });
       setIsShow(false);
    }
    const exportCardComponent = async() =>{
        await setIsShow(true);

        const name = result.profile.name;
        const target2 = document.getElementById('honshitsu');
        if(target2 === null ) return;
       //    詳細カルテ出力
        html2canvas(target2, {  scale:1.5, allowTaint:true, useCORS:true, }).then((canvas)=>{
            let downloadEle = document.createElement("a");
            downloadEle.href = canvas.toDataURL("image/jpeg", 1.0);
            downloadEle.download = `${name}様_自己分析シート②.jpg`;
            downloadEle.click();
        });
        setIsShow(false);
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-3 sm:flex sm:m-4">
                <button
                    className="border rounded px-3 py-4 bg-ebb-600 text-white rounded-[30px] my-6 mx-20 hover:bg-ebb-400"
                    type="button"
                    onClick={pdfDownloadHandler}
                >
                    自己分析シート① ダウンロード!
                </button>
                <button
                    className="border rounded px-3 py-4 bg-ebb-600 text-white rounded-[30px] my-6 mx-20 hover:bg-ebb-400"
                    type="button"
                    onClick={exportCardComponent}
                >
                    自己分析シート② ダウンロード!
                </button>
            </div>
            <div className={`${isShow ? '': 'hidden'}`}>
                <ComponentPDF />
            </div>
        </>
    )
}

    const ComponentPDF = () =>{
        const result = useSelector(state => state.result.result);
        const insenStyleTd="w-6 text-left h-9 px-2";
        const yousenStyleTd="px-6 py-3 text-center";
        const zoukanFlgTd ="text-right w-6 p-0";
        // const borderColor = "border-ebb-400";
        const borderColor = "border-gray-100";
        const labelStyle = "text-white bg-ebb-500 font-semibold text-center text-xl";
        const sanmeiLabelStyle = "text-white bg-rose-800/[.8] font-semibold text-center text-xl";

        const energy_th = ['甲','乙','丙','丁','戊','己','庚','辛','壬', '癸','合計'];
        //  行動領域
        function ryouiki(){
            //干支Noの取得
            let point1 = result.sanmei.action_area.nikkanshi_id;
            let point2 = result.sanmei.action_area.gekkanshi_id;
            let point3 = result.sanmei.action_area.nenkanshi_id;

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
        const startDateTimeUnix = new Date(result.sanmei.tenchusatsu_term.start_date_unix * 1000);
        const startDateTimeStr = startDateTimeUnix.toLocaleDateString();

        const endDateTimeUnix = new Date(result.sanmei.tenchusatsu_term.end_date_unix * 1000);
        const endDateTimeStr = endDateTimeUnix.toLocaleDateString();

        const startDateTimeMonthUnix = new Date(result.sanmei.tenchusatsu_term_month.start_date_unix * 1000);
        const startDateTimeMonthStr =  startDateTimeMonthUnix.toLocaleDateString();
        const endDateTimeMonthUnix = new Date(result.sanmei.tenchusatsu_term_month.end_date_unix * 1000);
        const endDateTimeMonthStr = endDateTimeMonthUnix.toLocaleDateString();

        useEffect(() => {ryouiki();}); //レンダリング後に実行するように指定


    return   (
        <>
            <div id="karute" className={`w-[1033px]  bg-ebb-50 `}>
                <div className="">
                    {/* title */}
                    <section className="text-center text-4xl font-bold tracking-wide h-[100px] pt-10">自己分析シート①</section>

                    {/* プロフィール */}
                    <section className='flex items-end h-[62px] relative '>
                        <h1 className="text-3xl font-bold absolute top-0 left-10">{result.profile.name}<span className="ml-6">様</span></h1>
                        <div className="ml-2 flex absolute right-10 top-2 font-semibold text-2xl">
                            <p className="ml-2 ">
                                <span >
                                    {result.profile.birth_year}
                                </span>年
                                <span>
                                    {result.profile.birth_month}
                                </span>月
                                <span>
                                    {result.profile.birth_day}
                                </span>日
                            </p>
                            <p className="ml-2">
                                <span >
                                    {result.profile.birth_hour}
                                </span>時
                                <span>
                                    {result.profile.birth_minite}
                                </span>分
                            </p>
                            <p className="ml-2">{result.profile.gender ==='0'  ? '男性' : '女性'}</p>
                        </div>
                    </section>

                    {/* karuteの内容 */}
                    <div className={`${borderColor} content border-4 mx-4 text-black bg-white`}>
                        {/* 動物占い */}
                        <section className="grid grid-cols-12">
                            {/* 見出し */}
                            <div className={`${borderColor} ${labelStyle} border-r-4 col-span-1 relative text-xl`}>
                                <p className="absolute top-[260px] left-8">動</p>
                                <p className="absolute top-[320px] left-8">物</p>
                                <p className="absolute top-[380px] left-8">占</p>
                                <p className="absolute top-[440px] left-8">い</p>
                            </div>

                            <div className="doubutsuResult relative col-span-11">
                                {/* 本質 */}
                                <div className="honshitsu">
                                    <div className="items-center">
                                        <div className={`${borderColor} ${labelStyle} border-b-4 w-full text-center px-2 h-[50px]  font-medium`}>本 質</div>
                                        <p className="text-center">基本的な性格。プライベートで出てくるキャラ</p>
                                    </div>
                                    <div className="flex my-4 mx-10">
                                        <img
                                            className="h-[100px]"
                                            src={`/images/doubutsu60/${result.sanmei.action_area.nikkanshi_id}.png`}
                                            alt={result.individual_psychology.honshitsu_chara_name}
                                        />
                                        <img
                                            className="w-[40px] h-[40px] "
                                            src={`/images/group/${result.individual_psychology.honshitu_doubutsu_group}.png`}
                                            alt={result.individual_psychology.honshitu_doubutsu_group}
                                        />
                                    </div>
                                    <div className="absolute left-[290px] top-[110px]">
                                        <div className="rabsolute ">
                                            <span className="text-4xl mr-3 rounded-full p-2">{result.sanmei.action_area.nikkanshi_id}.</span>
                                            <span className="text-4xl w-[700px]">
                                                {result.individual_psychology.honshitsu}
                                            </span>
                                        </div>
                                        <div className="text-2xl m-4">

                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1">
                                    <div className="resultAny grid grid-cols-3 ">
                                        <div >
                                            <p className={`${borderColor} ${labelStyle} border-y-4   h-[48px] `}>表面</p>
                                            <div className="">
                                                <p className="text-center text-sm">他人に見せるキャラ</p>
                                                <div className="flex justify-center mx-auto  my-2">
                                                    <img
                                                        className="w-[100px] h-[100px] "
                                                        src={`/images/doubutsu/${result.individual_psychology.hyomen_chara_name}.png`}
                                                        alt={result.individual_psychology.hyomen_chara_name}
                                                    />
                                                    <img className="w-[30px] h-[30px] " src={`/images/group/${result.individual_psychology.hyomen_group}.png`} alt={result.individual_psychology.hyomen_group} />
                                                </div>

                                            </div>
                                        </div>

                                        <div className={`${borderColor} border-x-4`}>
                                            <p className={`${borderColor}  ${labelStyle} border-y-4 h-[48px]`}>意思決定</p>
                                            <div>
                                                <p className="text-center text-sm">なにか決断するときにあわわれるキャラ</p>
                                                <div className="flex justify-center mx-auto my-2">
                                                    <img
                                                         className="w-[100px] h-[100px] "
                                                         src={`/images/doubutsu/${result.individual_psychology.ishi_chara_name}.png`}
                                                         alt={result.individual_psychology.ishi_chara_name}
                                                    />
                                                    <img className="w-[30px] h-[30px] " src={`/images/group/${result.individual_psychology.ishi_group}.png`} alt={result.individual_psychology.ishi_group} />
                                                </div>

                                            </div>
                                        </div>

                                        <div className="kibou">
                                            <p className={`${borderColor}  ${labelStyle} border-y-4 h-[48px]`}>希望</p>
                                            <div>
                                                <p className="text-center text-sm">憧れ、理想のキャラ</p>
                                                <div className="flex justify-center mx-auto  my-2">
                                                    <img
                                                        className="w-[100px] h-[100px] "
                                                        src={`/images/doubutsu/${result.individual_psychology.kibou_chara_name}.png`}
                                                        alt={result.individual_psychology.kibou_chara_name}
                                                    />
                                                    <img className="w-[30px] h-[30px] " src={`/images/group/${result.individual_psychology.kibou_group}.png`} alt={result.individual_psychology.kibou_group} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="rail">
                                        <p className={`${borderColor} ${labelStyle} border-y-4 h-[48px]`}>レール</p>
                                        <div className="grid grid-cols-4 gap-4">
                                            <p className="flex justify-center items-center font-medium text-2xl pb-[20px]">{result.individual_psychology.rail}</p>
                                            <p className="col-span-3 pt-0 pb-4 pr-4 text-justify whitespace-pre-line text-lg text-black leading-relaxed ">{result.individual_psychology.rail_detail}</p>
                                        </div>
                                    </div>

                                    <div className="rizumu">
                                        <p className={`${borderColor} ${labelStyle}  border-y-4 h-[48px]`}>リズム</p>
                                        <div className="grid grid-cols-4 gap-4">
                                            <p className="flex justify-center items-center font-medium  text-2xl pb-[20px]">{result.individual_psychology.rhythm}</p>
                                            <p className="col-span-3  pt-0 pb-4 pr-4 text-justify whitespace-pre-line text-lg text-black leading-relaxed">{result.individual_psychology.rhythm_detail}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* 算命学 */}
                        <section className={`${borderColor} border-t-4 grid grid-cols-12 text-black`}>
                            <div className={`${borderColor}  ${sanmeiLabelStyle} border-r-4 col-span-1 relative text-xl`}>
                                <p className="absolute top-[160px] left-8">算</p>
                                <p className="absolute top-[220px] left-8">命</p>
                                <p className="absolute top-[280px] left-8">学</p>
                            </div>
                            <div className="col-span-11">
                                <div className={`${borderColor} grid grid-cols-3`}>
                                    <div className={`${borderColor}  border-r-4 grid grid-cols-1`}>
                                            <div className={`${borderColor}  ${sanmeiLabelStyle} border-b-4  h-[48px] `}>陰占</div>
                                            <div className=" mx-auto ">
                                                <table >

                                                    <tbody>
                                                        {/* 左端に天中殺　右端に年干支天中殺　蔵干フラグで'>'の位置を調整 */}
                                                    <tr className="">
                                                        <ResultTableTd />
                                                        <ResultTableTd />
                                                        <ResultTableTd value={result.sanmei.insen.nikkan } tablestyle={`${insenStyleTd} `}/>
                                                        <ResultTableTd />
                                                        <ResultTableTd value={result.sanmei.insen.gekkan } tablestyle={`${insenStyleTd} `}/>
                                                        <ResultTableTd />
                                                        <ResultTableTd value={result.sanmei.insen.nenkan } tablestyle={`${insenStyleTd} `} />
                                                        <ResultTableTd />
                                                        <ResultTableTd />

                                                    </tr>
                                                    <tr className="">
                                                        <ResultTableTd value={result.sanmei.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(0,1) } tablestyle="w-0"/>
                                                        <ResultTableTd />
                                                        <ResultTableTd value={result.sanmei.insen.nisshi } tablestyle={`${insenStyleTd} `} />
                                                        <ResultTableTd />
                                                        <ResultTableTd value={result.sanmei.insen.gesshi } tablestyle={`${insenStyleTd} `}/>
                                                        <ResultTableTd />
                                                        <ResultTableTd value={result.sanmei.insen.nenshi } tablestyle={`${insenStyleTd} `}/>
                                                        <ResultTableTd tablestyle="w-0"/>
                                                        <ResultTableTd value={result.sanmei.kanshi_detail.nenkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(0,1) }tablestyle="w-0"/>
                                                    </tr>
                                                    <tr className="">
                                                        <ResultTableTd value={result.sanmei.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(1,1) }/>
                                                        <ResultTableTd value={result.sanmei.insen.nikkanshizoukanflg == 0?  ">": ""} tablestyle={zoukanFlgTd}/>
                                                        <ResultTableTd value={result.sanmei.insen.nikkanshizoukan1 }tablestyle={`${insenStyleTd} `} />
                                                        <ResultTableTd value={result.sanmei.insen.gekkanshizoukanflg == 0?  ">": ""} tablestyle={zoukanFlgTd}/>
                                                        <ResultTableTd value={result.sanmei.insen.gekkanshizoukan1 }tablestyle={`${insenStyleTd} `} />
                                                        <ResultTableTd value={result.sanmei.insen.nenkanshizoukanflg == 0?  ">": ""} tablestyle={zoukanFlgTd}/>
                                                        <ResultTableTd value={result.sanmei.insen.nenkanshizoukan1 } tablestyle={`${insenStyleTd} `}/>
                                                        <ResultTableTd />
                                                        <ResultTableTd value={result.sanmei.kanshi_detail.nenkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(1,1) }/>
                                                    </tr>
                                                    <tr className="">
                                                        <ResultTableTd />
                                                        <ResultTableTd value={result.sanmei.insen.nikkanshizoukanflg == 1?  ">": ""} tablestyle={zoukanFlgTd}/>
                                                        <ResultTableTd value={result.sanmei.insen.nikkanshizoukan2 } tablestyle={`${insenStyleTd}  `}/>
                                                        <ResultTableTd value={result.sanmei.insen.gekkanshizoukanflg == 1?  ">": ""} tablestyle={zoukanFlgTd}/>
                                                        <ResultTableTd value={result.sanmei.insen.gekkanshizoukan2 } tablestyle={`${insenStyleTd}  `} />
                                                        <ResultTableTd value={result.sanmei.insen.nenkanshizoukanflg == 1?  ">": ""} tablestyle={zoukanFlgTd}/>
                                                        <ResultTableTd value={result.sanmei.insen.nenkanshizoukan2 } tablestyle={`${insenStyleTd} `}/>
                                                        <ResultTableTd />
                                                        <ResultTableTd />
                                                    </tr>
                                                    <tr>
                                                        <ResultTableTd />
                                                        <ResultTableTd value={result.sanmei.insen.nikkanshizoukanflg == 2?  ">": ""} tablestyle={zoukanFlgTd}/>
                                                        <ResultTableTd value={result.sanmei.insen.nikkanshizoukan3 } tablestyle={`${insenStyleTd}  `} />
                                                        <ResultTableTd value={result.sanmei.insen.gekkanshizoukanflg == 2?  ">": ""} tablestyle={zoukanFlgTd}/>
                                                        <ResultTableTd value={result.sanmei.insen.gekkanshizoukan3 } tablestyle={`${insenStyleTd}  `} />
                                                        <ResultTableTd value={result.sanmei.insen.nenkanshizoukanflg == 2?  ">": ""} tablestyle={zoukanFlgTd}/>
                                                        <ResultTableTd value={result.sanmei.insen.nenkanshizoukan3 } tablestyle={`${insenStyleTd} `} />
                                                        <ResultTableTd />
                                                        <ResultTableTd />
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                    </div>
                                    <div className=" border-r-4 grid grid-cols-1">
                                        <div className={`${borderColor}  ${sanmeiLabelStyle} border-b-4  h-[48px] `}>陽占</div>
                                        <div className="mx-auto">
                                            {/* yousen */}
                                            <table>
                                                <tbody>
                                                    <tr className="border-b">
                                                        <ResultTableTd value={result.sanmei.yousen.bansei } tablestyle={`${yousenStyleTd} border-r`}/>
                                                        <ResultTableTd value={result.sanmei.yousen.north } tablestyle={`${yousenStyleTd} border-r`}/>
                                                        <ResultTableTd value={result.sanmei.yousen.first } tablestyle={`${yousenStyleTd}`}/>

                                                    </tr>
                                                    <tr className="border-b">
                                                        <ResultTableTd value={result.sanmei.yousen.west } tablestyle={`${yousenStyleTd} border-r`}/>
                                                        <ResultTableTd value={result.sanmei.yousen.center } tablestyle={`${yousenStyleTd} border-r`}/>
                                                        <ResultTableTd value={result.sanmei.yousen.east } tablestyle={`${yousenStyleTd}`}/>

                                                    </tr>
                                                    <tr>
                                                        <ResultTableTd value={result.sanmei.yousen.last } tablestyle={`${yousenStyleTd} border-r`}/>
                                                        <ResultTableTd value={result.sanmei.yousen.south } tablestyle={`${yousenStyleTd} border-r`}/>
                                                        <ResultTableTd value={result.sanmei.yousen.middle } tablestyle={`${yousenStyleTd}`}/>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mx-auto">
                                            <div className={`${borderColor}  ${sanmeiLabelStyle} border-b-4  h-[48px] `}>行動領域</div>

                                            <canvas id="target" width="200" height="200" className="mx-auto"/>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${borderColor} border-t-4 grid grid-cols-3`}>
                                    <div className={`${borderColor} energy border-r-4`}>
                                        <div className={`${borderColor}  ${sanmeiLabelStyle} border-b-4  h-[48px] `}>魂のエンジンの大きさ</div>
                                            <div className="text-4xl text-center py-6">
                                                {result.sanmei.energy[10]}
                                            </div>

                                        <div className="pb-8">
                                            <p className="text-center text-sm">女性の平均：150〜199</p>
                                            <p className="text-center text-sm">男性の平均：200〜249</p>
                                        </div>
                                    </div>
                                    <div className="tenchusatsu col-span-2 text-lg">
                                        <div className={`${borderColor}  ${sanmeiLabelStyle}  border-b-4 h-[48px] `}>天中殺</div>
                                        <div className="grid grid-cols-1 ">
                                            <div className="grid grid-cols-4 h-[77px]">
                                                <p className={`${borderColor} border-b  border-r flex justify-center pt-4`}>年天中殺</p>
                                                <p className={`${borderColor} col-span-3 border-b flex justify-center pt-4`}>
                                                    直近の年天中殺期間は
                                                    <span className="font-bold text-sea-pink-900">{startDateTimeStr}〜{endDateTimeStr}</span>
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-4 h-[77px] text-lg">
                                                <p className={`${borderColor} border-r flex justify-center pt-4`}>月天中殺</p>
                                                <p className="col-span-3  flex justify-center pt-4">
                                                    直近の月天中殺期間は
                                                    <span className="font-bold text-sea-pink-900">
                                                        {startDateTimeMonthStr}〜{endDateTimeMonthStr}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <p className="h-10"></p>
            </div>
            <div id="honshitsu" className="w-[1033px] bg-ebb-50 text-black">
                <div className="m-20">
                        {/* title */}
                        <section className="text-center text-4xl font-bold tracking-wide h-[120px]  pt-10">自己分析シート②</section>

                        {/* プロフィール */}
                        <section className='flex items-end h-[62px] relative '>
                            <h1 className="text-3xl font-bold absolute top-0 left-0">{result.profile.name}<span className="ml-6">様</span></h1>
                            <div className="ml-2 flex absolute right-0 top-2 font-semibold text-2xl ">
                                <p className="ml-2 ">
                                    <span >
                                        {result.profile.birth_year}
                                    </span>年
                                    <span>
                                        {result.profile.birth_month}
                                    </span>月
                                    <span>
                                        {result.profile.birth_day}
                                    </span>日
                                </p>
                                <p className="ml-2">
                                    <span >
                                        {result.profile.birth_hour}
                                    </span>時
                                    <span>
                                        {result.profile.birth_minite}
                                    </span>分
                                </p>
                                <p className="ml-2">{result.profile.gender ==='0'  ? '男性' : '女性'}</p>
                            </div>
                        </section>
                        <section className="">
                                <div className="relative">
                                    <div className="flex my-4 mx-10">
                                        <img
                                            className=" h-[100px] "
                                            src={`/images/doubutsu60/${result.sanmei.action_area.nikkanshi_id}.png`}
                                            alt={result.individual_psychology.honshitsu_chara_name}
                                        />
                                        <img
                                            className="w-[30px] h-[30px] "
                                            src={`/images/group/${result.individual_psychology.honshitu_doubutsu_group}.png`}
                                            alt={result.individual_psychology.honshitu_doubutsu_group}
                                        />
                                    </div>
                                    {/* <span className="relative left-[244px] -top-[88px]  text-white text-2xl bg-red-200 rounded-full p-2 mx-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> */}
                                    <div className="absolute left-[260px] top-[10px]">
                                        <span className=" text-4xl mr-3">{result.sanmei.action_area.nikkanshi_id}.</span>
                                        <span className="text-4xl w-[700px]">
                                            {result.individual_psychology.honshitsu}
                                        </span>
                                    </div>
                                    {/* パターン表示 */}
                                    <div className="absolute top-0 -right-[60px] border-4 border-ebb-300 p-2 pb-[20px] rounded-lg bg-white">
                                        <p>行動パターン：{result.individual_psychology.behavior}</p>
                                        <p>思考パターン：{result.individual_psychology.thinking}</p>
                                        <p>真理ベクトル：{result.individual_psychology.mentality}</p>
                                        <p>パーソナルスタンス：{result.individual_psychology.parsonalstance}</p>
                                    </div>
                                    {/* 本質キーワード */}
                                    <div className="text-lg py-4">
                                        <p>＜キーワード＞</p>
                                        <ul className="columns-2 pb-10">
                                            {result.individual_psychology.honshitsu_keyword.map((index, key)=>{
                                                return(
                                                    <li key={key}>◇ {index}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    {/* 本質詳細 */}
                                    <div className="text-xl text-justify whitespace-pre-line leading-8 border-4 rounded-[20px] px-[40px] pt-[30px] bg-white pb-[50px]"><span>&nbsp;&nbsp;&nbsp;</span>
                                        {result.individual_psychology.honshitsu_detail}
                                    </div>
                                </div>
                        </section>
                </div>
                <div className="h-2">

                </div>
            </div>
        </>
    )

}
