import React from 'react';

import ResultLayout from './parts/ResultLayout';
import FirstPasonResult from './parts/compatibility/FirstPasonResult';
import SecondPasonResult from './parts/compatibility/SecondPasonResult';
import KoudouIsouResult from './parts/compatibility/KoudouIsouResult';

export default function ResultCompatibility() {
    return(
        <ResultLayout title='相性'>
            <div className='mx-2'>
                {/* 一人目 */}
                <FirstPasonResult />
                {/* 二人目 */}
                <SecondPasonResult />
                {/* 行動領域　位相法 */}
                <KoudouIsouResult />
            </div>
        </ResultLayout>

    )

}
