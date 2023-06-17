import React from 'react';

import TaiunNenunIsou from './parts/isou/TaiunNenunIsou';
import ResultLayout from './parts/ResultLayout';
import TsukiunHiunIsou from './parts/isou/TsukiunHiunIsou';

export default function ResultIsoho() {

    return(
        <ResultLayout title='位相法'>
            <TaiunNenunIsou isouTiming="taiun"/>
            <TsukiunHiunIsou isouTiming="tsukiun"/>
        </ResultLayout>
    );
}
