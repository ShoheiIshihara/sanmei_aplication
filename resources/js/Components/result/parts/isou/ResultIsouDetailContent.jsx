import { useState } from 'react';
import { isEmpty } from 'lodash';

export default function ResultIsouDetailContent ({title,isouData,selectDirection,witchIsou}) {
    const [ isOpen, setIsOpen] = useState(false)

    return (
        <div className={`whitespace-pre-wrap text-justify pt-5 relative sm:p-3 sm:pr-0 ${isEmpty(isouData[selectDirection]) ? 'hidden': ''}`}>
            <h2 className="font-medium pl-2 hover:bg-sea-pink-50">
                <button className='w-full text-left text-base' type='button' onClick={(e)=>setIsOpen(!isOpen)}><span className='w-4 inline-block'>{!isOpen ? '+' : '-'}</span> {title}　詳細
                </button>
            </h2>
            <hr  className=" border-yellow-300 mb-2"/>
            <div className={`${isOpen ? '': 'hidden'}`}>
                {Object.keys(isouData[selectDirection]).map((index,key)=>{
                    return(
                        <>
                            <dl className='py-1 pl-2' key={index}>
                                <dt className='font-medium'>{isouData[selectDirection][index]['isou_name']}</dt>
                                <dd className='sm:mx-4  text-sm leading-6 '>{isouData[selectDirection][index]['kouten_detail']}</dd>
                                <dd className='sm:mx-4  text-sm leading-6'>{isouData[selectDirection][index]['kouten_west']}</dd>
                                <dd className='sm:mx-4  text-sm leading-6'>{isouData[selectDirection][index]['kouten_'+selectDirection]}</dd>
                            </dl>
                        </>
                        )
                })}
            </div>
        </div>

    )
}
