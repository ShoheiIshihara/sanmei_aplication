import React from 'react';

export default function ResultTableTd({ value,classstyle, tablestyle }) {
  const normalStyle = `text-gray-800 rounded-xl  text-sm lg:text-base ${classstyle}` // デフォルトのclass
  const kasei = `${normalStyle} bg-red-50`
  const suisei = `${normalStyle} bg-sky-50`
  const mokusehi = `${normalStyle} bg-green-50`
  const dosei = `${normalStyle} bg-yellow-50`
  const kinsei =`${normalStyle} text-slate-700 bg-gray-100`
  const style = 
      (value === '甲'||value ==='乙'||value ==='寅'||value ==='卯'||value ==='貫索星'||value ==='石門星') ? mokusehi 
      :value == '丙'||value ==='丁'||value ==='巳'||value ==='午'||value ==='鳳閣星'||value ==='調舒星' ? kasei 
      :value == '戊'||value ==='己'||value ==='丑'||value ==='辰'||value ==='未'||value ==='戌'||value ==='禄存星'||value ==='司禄星' ? dosei 
      :value == '庚'||value ==='辛'||value ==='申'||value ==='酉'||value ==='車騎星'||value ==='牽牛星'? kinsei 
      :value == '壬'||value ==='癸'||value ==='亥'||value ==='子'||value ==='龍高星'||value ==='玉堂星' ? suisei 
      : normalStyle // どちらのスタイルを当てるかを判別
      // value === '丁' || value ===  '鳳閣星' ? kasei:normalStyle;
    return (
    <td className={tablestyle}>
        <span className={style}>{ value }</span>
    </td>
     
    );
}
