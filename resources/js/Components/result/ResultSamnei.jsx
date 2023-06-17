import React from 'react';

import InsenContent from './parts/sanmei/InsenContent';
import YosenContent from './parts/sanmei/YosenContent';
import KoudouContent from './parts/sanmei/KoudouContent';
import IsouContent from './parts/sanmei/IsouContent';
import KizuhoContent from './parts/sanmei/KizuhoContent';
import EnergyContent from './parts/sanmei/EnergyContent';
import HachimonContent from './parts/sanmei/HachimonContent';
import TenchusatsuContent from './parts/sanmei/TenchusatsuContent';
import ResultLayout from './parts/ResultLayout';

export default function ResultSumnei() {

    return(
        <ResultLayout title="算命学">
            <div className="grid gap-2 mx-2 p-2 mb-12 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 text-ebb-700">
                <InsenContent />
                <YosenContent />
                <KoudouContent />
                <IsouContent />
                <KizuhoContent />
                <HachimonContent />
                <EnergyContent />
                <TenchusatsuContent />                    
            </div>
        </ResultLayout>
    )
}
