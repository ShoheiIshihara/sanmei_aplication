import React from 'react';
import { useEffect } from 'react';
import { useSelector } from "react-redux";

export default function KoudouContent(){
    const result = useSelector(state => state.result.result.sanmei);

    function ryouiki(){
        //干支Noの取得
        let point1 = result.action_area.nikkanshi_id;
        let point2 = result.action_area.gekkanshi_id;
        let point3 = result.action_area.nenkanshi_id;

        //描画する要素を取得
        let element = document.getElementById( "target" ) ;
        let context = element.getContext( "2d" ) ;
        //既にある描画をクリア
        context.clearRect(0, 0, 250, 250);
        //描き始め
        context.beginPath () ;
        //円の描画
        context.arc( 110, 110, 105, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
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
        context.moveTo(105*Math.cos(deg2Rad(point1*6-90))+110, 105*Math.sin(deg2Rad(point1*6-90))+110); //日干支Ｎｏ
        context.lineTo(105*Math.cos(deg2Rad(point2*6-90))+110, 105*Math.sin(deg2Rad(point2*6-90))+110); //月干支Ｎｏ
        context.lineTo(105*Math.cos(deg2Rad(point3*6-90))+110, 105*Math.sin(deg2Rad(point3*6-90))+110); //年干支Ｎｏ
        context.fill(); //塗りつぶし
        context.closePath(); //パスを閉じる
        context.stroke(); //描く実行
    }

    useEffect(() => {ryouiki();}); //レンダリング後に実行するように指定

    return(
        <div className='mx-auto w-full   h-[360px]'>
             <div className="card  shadow-md  bg-white h-full w-full ">
                <div className="card-body  w-full  pb-0">
                    <h2 className="card-title mx-auto">行動領域</h2>
                    <canvas id="target" width="220" height="220" className="mx-auto"/>
                </div>
            <div className='flex justify-center w-full gap-2 mb-2'>
                {/* <button className='btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700' onClick={()=>window.koudou_modal.showModal()}>解説</button> */}
            </div>
            </div>
              {/* モーダル内容 */}
              <dialog id="koudou_modal" className="modal ">
                    <form method="dialog" className="modal-box w-11/12 max-w-5xl bg-white">
                        <button htmlFor="koudou_modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                        <div className='text-black'>
                            <p> {result.hachimon_type}</p>
                            <p>{result.hachimon_type_detail}</p>
                            <p className={` p-4 rounded`}>
                                最大値と最小値の差は人生の振幅のとも言われ、差が50以上なら人生のムラが大きい。特に100を超えてると激しい人生となる。<br />
                                また、差が大きいほど欲深いとも言われている
                            </p>
                        </div>
                    </form>
                </dialog>
        </div>
    )
}