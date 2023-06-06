import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import ResultContentBox from './parts/ResultContetBox';


export default function ResultDoubutsu() {
    // {console.log(result.profile.name )}
    const individual_psychology = useSelector(state => state.result.result.individual_psychology);
// console.log(individual_psychology)
    return(
            <div className="h-3/4 overflow-y-scroll border rounded-xl mx-2 sm:m-5 sm:mt-1 bg-white px-10 py-3" >
                <hr className="mt-4 border-sea-pink-400" />
                <h1 className="text-2xl w-full border-l-8 border-r-8 sm:border-r-0 text-center sm:text-left sm:pl-2 py-2 font-medium border-sea-pink-400 ">個性心理学　鑑定結果</h1>
                <hr className="mb-2 border-sea-pink-400" />

                {/* 本質 */}
                <ResultContentBox
                    title="本質"
                    content={individual_psychology.honshitsu}
                    detail={individual_psychology.honshitsu_detail}
                >
                </ResultContentBox>

                {/* 側面 */}
                <ResultContentBox
                    title="側面"
                >
                    <table className=" w-auto border text-center">
                        <thead>
                            <tr className="border">
                                <th className="border px-3 py-1 ">表面</th>
                                <th  className="border px-3 py-1 ">意思決定</th>
                                <th className="border px-3 py-1 ">希望</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-3 py-1 ">{individual_psychology.hyomen}</td>
                                <td className="border px-3 py-1 ">{individual_psychology.ishi}</td>
                                <td className={`border px-3 py-1 ${individual_psychology.kibou == "" ? 'bg-gray-100' : ""}`}>{individual_psychology.kibou}</td>
                            </tr>
                        </tbody>
                    </table>
                </ResultContentBox>
                {/* 行動パターン */}
                <ResultContentBox
                    title="行動パターン"
                    content={individual_psychology.behavior}
                    detail={individual_psychology.behavior_detail}
                >
                </ResultContentBox>

                {/* 心理ベクトル */}
                <ResultContentBox
                    title="心理ベクトル"
                    content={individual_psychology.mentality}
                    detail={individual_psychology.mentality_detail}
                >
                </ResultContentBox>

                {/* 思考パターン */}
                <ResultContentBox
                    title="思考パターン"
                    content={individual_psychology.thinking}
                    detail={individual_psychology.thinking_detail}
                >
                </ResultContentBox>

                {/* リズム */}
                <ResultContentBox
                    title="リズム"
                    content={individual_psychology.rhythm}
                    detail={individual_psychology.rhythm_detail}
                >
                </ResultContentBox>

                {/* レール */}
                <ResultContentBox
                    title="レール"
                    content={individual_psychology.rail}
                    detail={individual_psychology.rail_detail}
                >
                </ResultContentBox>

        </div>

    );
}
