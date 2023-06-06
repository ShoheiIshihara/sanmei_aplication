import React from 'react';
import ResultTableTd from '@/Components/ResultTableTd';
import { useEffect,useState } from 'react';


export default function ResultSumnei({result}) {

    const insenStyleTd="w-10 text-center h-9";
    const yousenStyleTd="px-3 py-1 text-center";
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
    console.log(result.kanshi_detail);

    return(
            <div className="h-4/5 overflow-y-scroll border rounded-xl m-5 mt-0 bg-white px-10 py-3" >
                <hr className="mt-4 border-sea-pink-400" />
                <h1 className="text-2xl w-full border-l-8 pl-2 py-2 font-medium border-sea-pink-400 ">算命学　鑑定結果</h1>
                    <hr className="mb-2 border-sea-pink-400" />
                {/* insen yousen table */}
                <div className="grid gap-10 mt-10 mb-12 sm:grid-cols-2 lg:grid-cols-3 text-ebb-700">
                    <table >
                        <caption className="mb-3">陰占</caption>
                        <tbody>
                        <tr className="border-b ">
                            <ResultTableTd value={result.insen.nikkan } tablestyle={`${insenStyleTd} border-r`}/>
                            <ResultTableTd value={result.insen.gekkan } tablestyle={`${insenStyleTd} border-r`}/>
                            <ResultTableTd value={result.insen.nenkan } tablestyle={`${insenStyleTd} `} />

                        </tr>
                        <tr className="border-b child:w-10 text-center">
                            <ResultTableTd value={result.insen.nisshi } tablestyle={`${insenStyleTd} border-r`} />
                            <ResultTableTd value={result.insen.gesshi } tablestyle={`${insenStyleTd} border-r`}/>
                            <ResultTableTd value={result.insen.nenshi } tablestyle={`${insenStyleTd} `}/>

                        </tr>
                        <tr className="border-b ">
                            <ResultTableTd value={result.insen.nikkanshizoukan1 }tablestyle={`${insenStyleTd} border-r`} />
                            <ResultTableTd value={result.insen.nikkanshizoukan1 }tablestyle={`${insenStyleTd} border-r`} />
                            <ResultTableTd value={result.insen.nikkanshizoukan1 } tablestyle={`${insenStyleTd} `}/>

                        </tr>
                        <tr className="border-b">
                            <ResultTableTd value={result.insen.nikkanshizoukan2 } tablestyle={`${insenStyleTd} border-r`}/>
                            <ResultTableTd value={result.insen.gekkanshizoukan2 } tablestyle={`${insenStyleTd} border-r`} />
                            <ResultTableTd value={result.insen.nenkanshizoukan2 } tablestyle={`${insenStyleTd} `}/>

                        </tr>
                        <tr>
                            <ResultTableTd value={result.insen.nikkanshizoukan3 } tablestyle={`${insenStyleTd} border-r`} />
                            <ResultTableTd value={result.insen.gekkanshizoukan3 } tablestyle={`${insenStyleTd} border-r`} />
                            <ResultTableTd value={result.insen.nenkanshizoukan3 } tablestyle={`${insenStyleTd} `} />
                        </tr>
                        </tbody>
                    </table>
                    {/* yousen */}
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
                    <div>
                        <p className="text-center">行動領域</p>
                        <canvas id="target" width="200" height="200" className="mx-auto"/>
                    </div>
                    <div className="text-center relative">
                        <div className="absolute top-1/4 left-1/4">
                            {/* 天中殺： */}
                            <div className="">天中殺：{result.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu}</div>
                            {/* エネルギー */}
                            <div className="">エネルギー：{result.energy[10]}</div>
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
                                <spa className="block text-sm">金</spa>
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
                                <spa className="block text-sm">西</spa>
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
                    <h1 className="text-2xl w-full border-l-8 pl-2 font-medium border-sea-pink-400 ">解説</h1>
                    <hr className="mb-2 border-sea-pink-400" />
                    {/* 日干支詳細 */}
                    <div className="nikkanshi p-3 pr-0">
                        <h2 className="font-medium pl-2">日干支:{result.kanshi_detail.nikkanshi_detail.kanshi_detail.kanshi}<span className="ml-4">{result.kanshi_detail.nikkanshi_detail.kanshi_detail.nickname}</span></h2>
                        <hr  className=" border-yellow-300 mb-2"/>
                        <p className="ml-4 text-sm leading-6">{result.kanshi_detail.nikkanshi_detail.kanshi_detail.detail}</p>

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
                                        <dd className="ml-2 mt-1">{result.kanshi_detail.nikkanshi_detail.gou_detail[0].detail}</dd>
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
                                        <dd className="ml-2 mt-1">{result.kanshi_detail.nikkanshi_detail.ijou_detail[0].detail}</dd>
                                    </dl>)
                                :""}
                    </div>

                    {/* 月干支詳細 */}
                    <div className="gekkanshi p-3 pr-0">
                        <h2 className="font-medium pl-2">月干支:{result.kanshi_detail.gekkanshi_detail.kanshi_detail.kanshi}<span className="ml-4">{result.kanshi_detail.gekkanshi_detail.kanshi_detail.nickname}</span></h2>
                        <hr  className=" border-yellow-300 mb-2"/>
                        <p className="mx-4 text-sm leading-6">{result.kanshi_detail.gekkanshi_detail.kanshi_detail.detail}</p>

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
                                        <dd className="ml-2 mt-1">{result.kanshi_detail.gekkanshi_detail.gou_detail[0].detail}</dd>
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
                                        <dd className="ml-2 mt-1">{result.kanshi_detail.gekkanshi_detail.ijou_detail[0].detail}</dd>
                                    </dl>)
                                :""}
                    </div>

                    {/* 年干支詳細 */}
                    <div className="nenkanshi p-3 pr-0">
                        <h2 className="font-medium pl-2">年干支:{result.kanshi_detail.nenkanshi_detail.kanshi_detail.kanshi}<span className="ml-4">{result.kanshi_detail.nenkanshi_detail.kanshi_detail.nickname}</span></h2>
                        <hr className=" border-yellow-300 mb-2"/>
                        <p className="mx-4 text-sm leading-6">{result.kanshi_detail.nenkanshi_detail.kanshi_detail.detail}</p>

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
                                        <dd className="ml-2 mt-1">{result.kanshi_detail.nenkanshi_detail.gou_detail[0].detail}</dd>
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
                                        <dd className="ml-2 mt-1">{result.kanshi_detail.nenkanshi_detail.ijou_detail[0].detail}</dd>
                                    </dl>)
                                :""}
                    </div>

                    {/* 天中殺詳細 */}
                    <div className="tenchusatsu p-3 pr-0 mb-12">
                        <h2 className="font-medium pl-2">天中殺:{result.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu}</h2>
                        <hr className=" border-yellow-300 mb-2"/>
                        <p className="mx-4 text-sm leading-6">{result.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu_detail}</p>
                    </div>
                    <div className="p-3 pr-0 mb-12">
                        <h2 className="font-medium pl-2">エネルギー:{result.energy[10]}</h2>
                        <hr className=" border-yellow-300 mb-2"/>
                        <div className="mx-4 text-sm leading-6">
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
                                        {console.log(result.energy)}
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
                    <div className="p-3 pr-0 mb-12">
                        <h2 className="font-medium pl-2">八門法:{result.hachimon_type}</h2>
                        <hr className=" border-yellow-300 mb-2"/>
                        <p className="mx-4 text-sm leading-6">{result.hachimon_type_detail}</p>

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
                    </div>
                </div>

        </div>);
}
