import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { isEmpty } from 'lodash';


export default function KoudouContent(){
    const result = useSelector(state => state.result.result.sanmei);

    function ryouiki(){
        //干支Noの取得
        let point1 = result.action_area.nikkanshi_id;
        let point2 = result.action_area.gekkanshi_id;
        let point3 = result.action_area.nenkanshi_id;
        // console.log(point1,point2,point3)
        // point1=4
        // point2=14
        // point3=42

        //描画する要素を取得
        let element = document.getElementById( "target" ) ;
        // console.log(element);
        let context = element.getContext( "2d" ) ;
        //既にある描画をクリア
        context.clearRect(0, 0, 300, 300);
        //描き始め
        context.beginPath () ;
        //円の描画
        context.arc( 125, 125, 120, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
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
        context.moveTo(120*Math.cos(deg2Rad(point1*6-90))+125, 120*Math.sin(deg2Rad(point1*6-90))+125); //日干支Ｎｏ
        context.lineTo(120*Math.cos(deg2Rad(point2*6-90))+125, 120*Math.sin(deg2Rad(point2*6-90))+125); //月干支Ｎｏ
        context.lineTo(120*Math.cos(deg2Rad(point3*6-90))+125, 120*Math.sin(deg2Rad(point3*6-90))+125); //年干支Ｎｏ
        context.fill(); //塗りつぶし
        context.closePath(); //パスを閉じる
        context.stroke(); //描く実行
    }

    useEffect(() => {ryouiki();}); //レンダリング後に実行するように指定

    return(
        <div className='mx-auto w-11/12  h-[340px]'>
             <div className="card  shadow-md  bg-white h-full w-full ">
                <div className="card-body  w-full  ">
                    <h2 className="card-title mx-auto">行動領域</h2>
                    <canvas id="target" width="250" height="250" className="mx-auto"/>
                </div>
            </div>
        </div>
    )
}