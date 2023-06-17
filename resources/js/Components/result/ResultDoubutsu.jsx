import React from 'react';
import { useSelector } from "react-redux";
import ResultContentBox from './parts/ResultContetBox';
import HonshitsuContent from './parts/doubutsu/HonshitsuContent';
import HyomenContent from './parts/doubutsu/HyomenContent';
import IshiContent from './parts/doubutsu/IshiContent';
import KibouContent from './parts/doubutsu/KibouContent';
import ResultLayout from './parts/ResultLayout';

export default function ResultDoubutsu() {
    const individual_psychology = useSelector(state => state.result.result.individual_psychology);
    return(
        <ResultLayout title='個性心理学'>
            <div className="grid gap-2 mx-2 mb-12 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 text-ebb-700">
                {/* 本質 */}
                <div className={`md:block hidden`}></div>
                    <HonshitsuContent />
                <div className={`md:block hidden`}></div>
                {/* 側面 */}
                <HyomenContent />
                <IshiContent />
                <KibouContent />
            </div>

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
        </ResultLayout>
    );
}
