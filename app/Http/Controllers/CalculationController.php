<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Jukkan;

use function Ramsey\Uuid\v1;

class CalculationController extends Controller
{
    //
    public function test(Request $request)
    {
        $name = "shohei";
        $birth_year = '1987';
        $birth_month = '5';
        $birth_day = '28';
        $birth_hour = '15';
        $birth_minite = '28';

        $gender = '0';
        $nikkanshiNo= '14';
        $gekkanshiNo='42';
        $nenkanshiNo = '4';
        // echo '<pre>';
        // $test = $this->taiun($nikkanshiNo, $gekkanshiNo, $nenkanshiNo, $birth_year, $birth_month, $birth_day, $gender);
        // $test = $this->nenun($nikkanshiNo, $gekkanshiNo, $nenkanshiNo, $birth_year);
        // $nowYear =  date('Y');
        // $nowYear =  '2022';
        // $test = $this->tsukiun($nikkanshiNo, $gekkanshiNo, $nenkanshiNo, $nowYear);
        // $nowYear =  date('Y');
        // $nowMonth =  date('m');
        // $test = $this->hiun($nikkanshiNo, $gekkanshiNo, $nenkanshiNo, $nowYear, $nowMonth);
        // $test = $this->cal_next_tenchusatsu_nenun('子丑');
        // $test = $this->cal_next_tenchusatsu_nenun('戌亥');
        $test = $this->cal_next_tenchusatsu_month('子丑');
        // $test = $this->getKibouDoubutsu('4','15');
        // $test = $this->getResult($name, $birth_year, $birth_month, $birth_day, $birth_hour, $birth_minite, $gender);


        return $test;
    }
    public function Calclation(Request $request)
    {
        // テスト用
        // $name='shohei';
        // $birth_year = '1993';
        // $birth_month = '10';
        // $birth_day = '1';
        // $gender = '0';
        // $test = $this->test($request);
        // return $test;

        $name = $request['name'];
        $birth_year = $request['birth_year'];
        $birth_month = $request['birth_month'];
        $birth_day = $request['birth_day'];
        $birth_hour = $request['birth_hour'];
        $birth_minite = $request['birth_minite'];
        $gender = $request['gender'];

        $result = $this->getResult($name, $birth_year, $birth_month, $birth_day, $birth_hour, $birth_minite, $gender);


        return $result;

          //検証エリア
        // echo '<pre>';
        // var_dump($result);

        // echo '</pre>';

    }

    //陰占い算出
    public function getResult($name, $birth_year, $birth_month, $birth_day, $birth_hour, $birth_minite, $gender){
        $profile = [
            'name' => $name,
            'birth_year' => $birth_year,
            'birth_month' => $birth_month,
            'birth_day' => $birth_day,
            'birth_hour' => $birth_hour,
            'birth_minite' => $birth_minite,
            'gender'  => $gender
        ];

        //十干
        $jukkan = jukkan::get();
        $jukkan = $jukkan->toArray();
        //生年月日
        $birthday = $birth_year."/".$birth_month."/".$birth_day;




        //旧暦判断 年判断
        $setsuiribi_year_base =DB::table('setsuiribi')->where('seireki',$birth_year )->value('2');
        $setsuiribi_year_base_conv = $birth_year."/2/".$setsuiribi_year_base; //節入り日をyyyy/mm/ddに変換

        //年干支の算出
        //旧暦の変換の要否
        if (strtotime($birthday) < strtotime($setsuiribi_year_base_conv)){   //節入り日より前なら誕生年-1にする
            $birth_year_calculation = strval($birth_year - 1) ;
          }else{
            $birth_year_calculation = $birth_year;
          }

          //年干支出力
        $nenkan_id =($birth_year_calculation - 4 ) % 10 +1;
        $nenshi_id =($birth_year_calculation - 4 ) % 12 +1;
        $nenkan =DB::table('jukkan')->where('jukkan_id',$nenkan_id )->value('tenkan');
        $nenshi =DB::table('junishi')->where('junishi_id',$nenshi_id )->value('chishi');
        $nenkanshi = $nenkan.$nenshi;


        //月干支の算出
        //節入り日確認

        // 生まれ月の節入り日を取得
        $setsuiribi_month_base =DB::table('setsuiribi')->where('seireki',$birth_year )->value($birth_month);
        $setsuiribi_month_base_conv = $birth_year."/".$birth_month."/".$setsuiribi_month_base; //節入り日をyyyy/mm/ddに変換

        if (strtotime($birthday) < strtotime($setsuiribi_month_base_conv)){   //節入り日より前なら誕生月-1にする 0になったら12にして誕生年（月干支計算用）も-1にする
            if($birth_month - 1 ==0){
                $birth_month_calculation = 12;
                $birth_year_month_calculation = $birth_year -1;
            }else{
                $birth_month_calculation = $birth_month - 1;
                $birth_year_month_calculation = $birth_year;
            }
        }else{
            $birth_month_calculation = $birth_month;
            $birth_year_month_calculation = $birth_year;
        }

        // 月干支の出力
        $gekkan_id =((($birth_year_month_calculation * 12) + $birth_month_calculation + 2 ) % 10 )+1 ;
        $gesshi_id = (( $birth_month_calculation + 0 ) % 12)+1 ;
        $gekkan =DB::table('jukkan')->where('jukkan_id', $gekkan_id)->value('tenkan');
        $gesshi =DB::table('junishi')->where('junishi_id',$gesshi_id)->value('chishi');
        $gekkanshi = $gekkan.$gesshi;

        //日干支の計算
        //1900/2/20(甲子)からの経過日数を計算
        $kijun = "1900/2/20";
        $sabun = (strtotime($birthday) - strtotime($kijun)) / 86400 ;
        $nikkan_id =($sabun % 10)+1;
        $nisshi_id =($sabun % 12)+1;
        $nikkan =DB::table('jukkan')->where('jukkan_id',$nikkan_id )->value('tenkan');
        $nisshi =DB::table('junishi')->where('junishi_id',$nisshi_id )->value('chishi');
        $nikkanshi = $nikkan.$nisshi;


        //年干支番
        $nenkanshiNo = $this->getKanshiNo($nenkanshi);

        //月干支番号
        $gekkanshiNo = $this->getKanshiNo($gekkanshi);

        //日干支番号
        $nikkanshiNo = $this->getKanshiNo($nikkanshi);


        ////ぞうかんの算出
        //節入り日からの日にち算出
        if((strtotime($birthday) - strtotime($setsuiribi_month_base_conv)) < 0){  //生まれた日-節入り日。マイナスになる場合は25にする
            $setsuiribiCount = 25 ;
          }else{
            $setsuiribiCount = ((strtotime($birthday) - strtotime($setsuiribi_month_base_conv))/86400);
          }
        //年支の蔵干
        $nenkanshizoukan = $this->zoukan($nenshi,$setsuiribiCount);
        //月支の蔵干
        $gekkanshizoukan = $this->zoukan($gesshi,$setsuiribiCount);
        //日支の蔵干
        $nikkanshizoukan = $this->zoukan($nisshi,$setsuiribiCount);

        $insen = array(
            'nikkan' => $nikkan,
            'gekkan' => $gekkan,
            'nenkan' => $nenkan,
            'nisshi' => $nisshi,
            'gesshi' => $gesshi,
            'nenshi' => $nenshi,
            'nikkanshizoukan1' => $nikkanshizoukan[0],
            'gekkanshizoukan1' => $gekkanshizoukan[0],
            'nenkanshizoukan1' => $nenkanshizoukan[0],
            'nikkanshizoukan2' => $nikkanshizoukan[1],
            'gekkanshizoukan2' => $gekkanshizoukan[1],
            'nenkanshizoukan2' => $nenkanshizoukan[1],
            'nikkanshizoukan3' => $nikkanshizoukan[2],
            'gekkanshizoukan3' => $gekkanshizoukan[2],
            'nenkanshizoukan3' => $nenkanshizoukan[2],
            'nikkanshizoukanflg' => $nikkanshizoukan[3],
            'gekkanshizoukanflg' => $gekkanshizoukan[3],
            'nenkanshizoukanflg' => $nenkanshizoukan[3]
        );

        //60干支、業、異常干支、天中殺　詳細取得


        $nikkanshi_detail = $this->kanshi_detail($nikkanshi);
        $gekkanshi_detail = $this->kanshi_detail($gekkanshi);
        $nenkanshi_detail = $this->kanshi_detail($nenkanshi);

        $kanshi_detail = [
            'nikkanshi_detail' => $nikkanshi_detail,
            'gekkanshi_detail' => $gekkanshi_detail,
            'nenkanshi_detail' => $nenkanshi_detail
        ];
        ////////// 陰占算出ここまで//////////

        ///ここから陽占の算出/////////
        ///十大主星算出

        //北　日干と年干 十大
        $north = $this->juudai_keisan($nenkan_id,$nikkan_id);
        //中央　日干と月蔵干　十大
        $gekkanshizoukan_id = $this->changeTenkanId($gekkanshizoukan[$gekkanshizoukan[3]]);
        $center = $this->juudai_keisan($gekkanshizoukan_id, $nikkan_id);
        //東　日干と年蔵干　十大
        $nenkanshizoukan_id = $this->changeTenkanId($nenkanshizoukan[$nenkanshizoukan[3]]);
        $east = $this->juudai_keisan($nenkanshizoukan_id,$nikkan_id);
        //西　日干と日蔵干　十大
        $nikkanshizoukan_id = $this->changeTenkanId($nikkanshizoukan[$nikkanshizoukan[3]]);
        $west = $this->juudai_keisan($nikkanshizoukan_id,$nikkan_id);

        //南　日干と月干　十大
        $south = $this->juudai_keisan($gekkan_id,$nikkan_id);
        //初年　日干と年支　十二
        $first = $this->juunidai_keisan($nikkan_id,$nenshi_id);
        //中年　日干と月支　十二
        $middle = $this->juunidai_keisan($nikkan_id,$gesshi_id);
        //晩年　日干と日支　十二
        $last = $this->juunidai_keisan($nikkan_id,$nisshi_id);

        $yousen = array(
            'bansei' => '',
            'north' => $north,
            'first' => $first,
            'west' => $west,
            'center' => $center,
            'east' => $east,
            'last' => $last,
            'south' => $south,
            'middle' => $middle
        );

        // energy算出
        $suuri_list= [];
        $total = 0;
        foreach($jukkan as $val){
            $search_target = $val['tenkan'];
            $count = 0;
            $kan_id = $this->changeTenkanId($search_target);
            foreach($insen as $insen_val){
                if($search_target==$insen_val){
                    $count++;
                }
            };
            // return $kan_id;
                $suuri_juusei_id =$this->juunidai_keisan($kan_id,$nisshi_id);
                $nisshi_suuri_point = DB::table('junidaijusei')->where('junidaijusei',$suuri_juusei_id )->value('point');
                $suuri_juusei_id =$this->juunidai_keisan($kan_id,$gesshi_id);
                $gesshi_suuri_point = DB::table('junidaijusei')->where('junidaijusei',$suuri_juusei_id )->value('point');
                $suuri_juusei_id =$this->juunidai_keisan($kan_id,$nenshi_id);
                $nenshi_suuri_point = DB::table('junidaijusei')->where('junidaijusei',$suuri_juusei_id )->value('point');
                $subtotal = ($nisshi_suuri_point + $gesshi_suuri_point + $nenshi_suuri_point) * $count;  //十干毎にそれぞれのポイントを足して、カウント数だけ掛ける。
                array_push($suuri_list,$subtotal); //リストに追加

                $total = $total + $subtotal;
        };
        array_push($suuri_list,$total);//エネルギー出力結果

        // 気図法と八門法
        // 気図法
        $wood = $suuri_list[0] + $suuri_list[1];
        $fire = $suuri_list[2] + $suuri_list[3];
        $soil = $suuri_list[4] + $suuri_list[5];
        $gold = $suuri_list[6] + $suuri_list[7];
        $water = $suuri_list[8] + $suuri_list[9];
        $kizuhou = array('wood'=>$wood,'fire'=>$fire,'soil'=>$soil,'gold'=>$gold, 'water'=>$water);

        $hachimonhou = $this->hachimonCal($nikkan,$kizuhou);

        //八門の型の算出
        $maxes   = array_keys($hachimonhou, max($hachimonhou)); // 値が最大の要素を抜き出す
        $key_max = $maxes[0]; // 最初に出現した最大値のキー名を返す
        $hachimon_type = DB::table('hachimon_type')->where('position',$key_max)->value('type');
        $hachimon_type_detail = DB::table('hachimon_type')->where('position',$key_max)->value('type_detail');

        $action_area = array(
            'nikkanshi_id' => $nikkanshiNo,
            'gekkanshi_id' => $gekkanshiNo,
            'nenkanshi_id' => $nenkanshiNo
        );

        // print_r($nikkanshi_detail['tenchusatsu_detail'][0]);
        $nikkan_tenchusatsu = $nikkanshi_detail['tenchusatsu_detail'][0]->tenchusatsu;
        $tenchusatsu_term = $this->cal_next_tenchusatsu_nenun($nikkan_tenchusatsu);
        $tenchusatsu_term_month = $this->cal_next_tenchusatsu_month($nikkan_tenchusatsu);

        // 配列化
        $sanmei = array(
            'insen'=> $insen,
            'kanshi_detail' => $kanshi_detail,
            'yousen' => $yousen,
            'energy' => $suuri_list,
            'kizuhou' =>$kizuhou,
            'hachimonhou' => $hachimonhou,
            'hachimon_type' => $hachimon_type,
            'hachimon_type_detail' => $hachimon_type_detail,
            'action_area' => $action_area,
            'tenchusatsu_term' => $tenchusatsu_term,
            'tenchusatsu_term_month' => $tenchusatsu_term_month
        );

        //ここから個性心理学
        $honshitsu = DB::table('individual_psychology')->where('individual_psychology_id', $nikkanshiNo )->value('animal');

        //本質詳細
        $honshitsu_detail = DB::table('individual_psychology')->where('individual_psychology_id', $nikkanshiNo )->value($this->gender_kind($gender));

        //表面
        $hyomen = $this->individual_psychology_overview($middle);
        $hyomen_group = $this->getIndividual_psychology_group($middle);
        $hyomen_chara_name = $this->getIndividual_psychology_chara_name($middle);
        //意思決定
        $ishi = $this->individual_psychology_overview($first);
        $ishi_group = $this->getIndividual_psychology_group($first);
        $ishi_chara_name = $this->getIndividual_psychology_chara_name($first);


        $kibou = $this->getKibouDoubutsu($nikkan_id, $birth_hour);
        $kibou_group = $this->getKibouDoubutsuGroup($nikkan_id, $birth_hour);
        $kibou_chara_name = $this->getKibouDoubutsuCharaName($nikkan_id, $birth_hour);

        //本質のどうぶつ
        $honshitu_doubutsu = $this->individual_psychology_overview($last);
        $honshitsu_chara_name = $this->getIndividual_psychology_chara_name($last);
        $honshitsu_pasonalstance = $this->getIndividual_psychology_chara_name($last);

        //本質のどうぶつのグループ
        $honshitu_doubutsu_group = $this->getIndividual_psychology_group($last);
        //本質のどうぶつのキーワード
        $_honshitsu_keyword = $this->getIndividual_psychology_keyword($last);
        $honshitsu_keyword = explode(',',$_honshitsu_keyword);

        //心理ベクトル
        $mentality_id = DB::table('individual_psychology_overview')->where('detail', $honshitu_doubutsu )->value("mentality_id");
        $mentality = DB::table('mentality')->where('mentality_id', $mentality_id )->value("mentality");
        $mentality_detail = DB::table('mentality')->where('mentality_id', $mentality_id )->value("detail");
        //リズム
        $rhythm = DB::table('rhythm')->where('rhythm_id', $nikkan_id )->value("rhythm");
        $rhythm_detail = DB::table('rhythm')->where('rhythm_id', $nikkan_id )->value("detail");
        //思考パターン
        $thinking_id = DB::table('individual_psychology_overview')->where('detail', $honshitu_doubutsu )->value("thinking_id");
        $thinking = DB::table('thinking')->where('thinking_id', $thinking_id )->value("thinking");
        $thinking_detail = DB::table('thinking')->where('thinking_id', $thinking_id )->value("detail");
        //行動パターン
        $behavior_id = DB::table('individual_psychology_overview')->where('detail', $honshitu_doubutsu )->value("behavior_id");
        $behavior = DB::table('behavior')->where('behavior_id', $behavior_id )->value("behavior");
        $behavior_detail = DB::table('behavior')->where('behavior_id', $behavior_id )->value("detail");
        //レール
        $rail_id = DB::table('judaishusei')->where('judaishusei', $center )->value("judaishusei_id");
        $rail = DB::table('rail')->where('rail_id', $rail_id )->value("rail");
        $rail_keyword = DB::table('rail')->where('rail_id', $rail_id )->value("keyword");
        $rail_detail = DB::table('rail')->where('rail_id', $rail_id )->value("detail");
        //パーソナルスタンス
        $parsonalstance_id = DB::table('individual_psychology_overview')->where('detail', $honshitu_doubutsu )->value("parsonalstance_id");
        $parsonalstance = DB::table('parsonalstance')->where('id', $parsonalstance_id )->value("parsonalstance");

        //配列化
        $individual_psychology= array(
            'honshitsu' => $honshitsu,
            'honshitsu_detail'=> $honshitsu_detail,
            'honshitu_doubutsu' => $honshitu_doubutsu,
            'hyomen' => $hyomen,
            'ishi' => $ishi,
            'kibou'=>$kibou,
            'mentality' => $mentality,
            'mentality_detail' => $mentality_detail,
            'rhythm' => $rhythm,
            'rhythm_detail' => $rhythm_detail,
            'thinking' => $thinking,
            'thinking_detail' => $thinking_detail,
            'behavior' => $behavior,
            'behavior_detail' => $behavior_detail,
            'rail' => $rail,
            'rail_keyword' => $rail_keyword,
            'rail_detail' => $rail_detail,
            'honshitu_doubutsu_group' => $honshitu_doubutsu_group,
            'hyomen_group'=>$hyomen_group,
            'ishi_group'=>$ishi_group,
            'kibou_group'=>$kibou_group,
            'kibou_chara_name'=>$kibou_chara_name,
            'honshitsu_chara_name'=>$honshitsu_chara_name,
            'ishi_chara_name'=>$ishi_chara_name,
            'hyomen_chara_name'=>$hyomen_chara_name,
            'honshitsu_keyword'=>$honshitsu_keyword,
            'parsonalstance'=>$parsonalstance
        );

        //位相法
        $nowYear =  date('Y');
        $nowMonth =  date('m');
        // 宿命位相
        $life_time = $this->shukumei_isou($nikkanshiNo,$gekkanshiNo,$nenkanshiNo);
        $taiun = $this->taiun($nikkanshiNo, $gekkanshiNo, $nenkanshiNo, $birth_year, $birth_month, $birth_day, $gender);
        $nenun = $this->nenun($nikkanshiNo, $gekkanshiNo, $nenkanshiNo, $birth_year);

        $tsukiun = $this->tsukiun($nikkanshiNo, $gekkanshiNo, $nenkanshiNo, $nowYear);

        $hiun = $this->hiun($nikkanshiNo, $gekkanshiNo, $nenkanshiNo, $nowYear, $nowMonth);

        // 位相法配列化
        $isoho = array(
            'life_time'=> $life_time,
            'taiun' => $taiun,
            'nenun' => $nenun,
            'tsukiun' => $tsukiun,
            'hiun' => $hiun

        );

        $result = array(
            'profile'=>$profile,
            'sanmei' =>$sanmei,
            'individual_psychology' => $individual_psychology,
            'isoho' => $isoho,
        );
        return $result;


    }
    //天干ID取得
    public function changeTenkanId($tenkan){
        return DB::table('jukkan')->where('tenkan', $tenkan)->value('jukkan_id');
    }
    //地支ID取得
    public function changeChishi($chishi){
        return DB::table('junishi')->where('chishi', $chishi)->value('junishi_id');
    }
    /////////蔵干の計算　二十八元////////////////
    public function zoukan($zoukan,$sa){
        if($zoukan == "子"){
        return ["","","癸",2];

        }elseif($zoukan == "丑"){
        if($sa <= 9){
            return ["癸","辛","己",0];
        }elseif( $sa > 9 && $sa <= 12){
            return ["癸","辛","己",1];
        }else{
            return ["癸","辛","己",2];
        }

        }elseif($zoukan == "寅"){
        if ($sa <= 7){
            return ["戊","丙","甲",0];
        }elseif( $sa > 7 && $sa <= 14){
            return ["戊","丙","甲",1];
        }else{
            return ["戊","丙","甲",2];
        }
        }elseif($zoukan == "卯"){
            return ["","","乙",2];

        }elseif($zoukan == "辰"){
        if ($sa <= 9){
            return ["乙","癸","戊",0];
        }elseif( $sa > 9 && $sa <= 12){
            return ["乙","癸","戊",1];
        }else{
            return ["乙","癸","戊",2];
        }
        }elseif($zoukan == "巳"){
        if ($sa <= 5){
            return ["戊","庚","丙",0];
        }elseif( $sa > 5 && $sa <= 14){
            return ["戊","庚","丙",1];
        }else{
            return ["戊","庚","丙",2];
        }
        }elseif($zoukan == "午"){
        if ($sa <= 19){
            return ["","己","丁",1];
        }else{
            return ["","己","丁",2];
        }
        }elseif($zoukan == "未"){
        if ($sa <= 9){
            return ["丁","乙","己",0];
        }elseif( $sa > 9 && $sa <= 12){
            return ["丁","乙","己",1];
        }else{
            return ["丁","乙","己",2];
        }
        }elseif($zoukan == "申"){
        if ($sa <= 10){
            return ["戊","壬","庚",0];
        }elseif( $sa > 10 && $sa <= 13){
            return ["戊","壬","庚",1];
        }else{
            return ["戊","壬","庚",2];
        }
        }elseif($zoukan == "酉"){
            return ["","","辛",2];

        }elseif($zoukan == "戌"){
        if ($sa <= 9){
            return ["辛","丁","戊",0];
        }elseif( $sa > 9 && $sa <= 12){
            return ["辛","丁","戊",1];
        }else{
            return ["辛","丁","戊",2];
        }
        }elseif($zoukan == "亥"){
        if ($sa <= 12){
            return ["","甲","壬",1];
        }else{
            return ["","甲","壬",2];
        }
        }
    }
    //干支詳細取得
    public function kanshi_detail($kanshi){
        $kanshi_detail = DB::table('kanshi')->where('kanshi', $kanshi)->first();
        $tenchusatsu_id = $kanshi_detail->tenchusatsu;//'value'
        $tenchusatsu_detail = DB::table('tenchusatsu')->where('tenchusatsu_id', $tenchusatsu_id)->get();
        $tenchusatsu_detail = $tenchusatsu_detail->toArray();

        $gou_id = $kanshi_detail->gou_id;//'value'
        $gou_detail = DB::table('gou')->where('gou_id', $gou_id)->get();
        $gou_detail = $gou_detail->toArray();

        $ijou_kanshi_id = $kanshi_detail->ijou_id;//'value'
        $ijou_detail = DB::table('ijou_kanshi')->where('ijou_kanshi_id', $ijou_kanshi_id)->get();
        $ijou_detail = $ijou_detail->toArray();

        $kanshi_result = [
            'kanshi_detail'=>$kanshi_detail,
            'tenchusatsu_detail'=>$tenchusatsu_detail,
            'gou_detail'=>$gou_detail,
            'ijou_detail'=>$ijou_detail
        ];

        return $kanshi_result;
    }

    //八門法算出
    public function hachimonCal($nikkan, $kizuhou) {
        switch($nikkan){
            case $nikkan == '甲'|| $nikkan =='乙':
                $hachimon = array('center'=>$kizuhou['wood'],'south'=>$kizuhou['fire'],'east'=>$kizuhou['soil'],'west'=>$kizuhou['gold'],'north'=>$kizuhou['water']);
                return $hachimon;
                break;
            case $nikkan == '丙'|| $nikkan == '丁':
                $hachimon = array('center'=>$kizuhou['fire'],'south'=>$kizuhou['soil'],'east'=>$kizuhou['gold'],'west'=>$kizuhou['water'],'north'=>$kizuhou['wood']);
                return $hachimon;
                break;
            case $nikkan == '戊'|| $nikkan == '己':
                $hachimon = array('center'=>$kizuhou['soil'],'south'=>$kizuhou['gold'],'east'=>$kizuhou['water'],'west'=>$kizuhou['wood'],'north'=>$kizuhou['fire']);
                return $hachimon;
                break;
            case $nikkan == '庚'|| $nikkan == '辛':
                $hachimon = array('center'=>$kizuhou['gold'],'south'=>$kizuhou['water'],'east'=>$kizuhou['wood'],'west'=>$kizuhou['fire'],'north'=>$kizuhou['soil']);
                return $hachimon;
                break;
            case $nikkan == '壬'|| $nikkan == '癸':
                $hachimon = array('center'=>$kizuhou['water'],'south'=>$kizuhou['wood'],'east'=>$kizuhou['fire'],'west'=>$kizuhou['soil'],'north'=>$kizuhou['gold']);
                return $hachimon;
                break;
        };
    }

    //干支から干支Noに変換
    public function getKanshiNo($kanshi){
        return DB::table('kanshi')->where('kanshi',$kanshi )->value('kanshi_id');
    }
    //天中殺の始まり
    public function getStartDate($year,$startMonth) {
        $startSetsuiribi = DB::table('setsuiribi')->where('seireki',$year )->value($startMonth);
        $startDateStr = $year."/".$startMonth."/".$startSetsuiribi;
        $startDate =strtotime($startDateStr);
        return $startDate;
    }
    //天中殺の終わり
    public function getEndDate($year, $endMonth){
        $endSetsuiribi = DB::table('setsuiribi')->where('seireki',$year)->value($endMonth);
        $endDateStr = $year."/".$endMonth."/".($endSetsuiribi - 1 );
        $endDate =strtotime($endDateStr);
        return $endDate;
    }
    //宿命位相法
    public function shukumei_isou($nikkanshiNo, $gekkanshiNo, $nenkanshiNo)
    // public function shukumei_isou(Request $request)
    {
        //
        // $nikkanshiNo = '1';
        // $gekkanshiNo = '2';
        // $nenkanshiNo = '7';

        $nichigetsu = $this->CalIsou($nikkanshiNo,$gekkanshiNo, 'shukumei', 'nichigetsu');
        $nengetsu = $this->CalIsou($nenkanshiNo,$gekkanshiNo, 'shukumei', 'nengetsu');
        $nichinen = $this->CalIsou($nikkanshiNo,$nenkanshiNo, 'shukumei', 'nichinen');
        $sukumei_isou_arr = array(
            "nichigetsu" => $nichigetsu,
            "nengetsu" => $nengetsu,
            "nichinen" => $nichinen
        );
        // echo '<pre>';
        // print_r($sukumei_isou_arr);
        // echo '</pre>';

        return $sukumei_isou_arr;
    }
    //大運位相
    public function taiun($nikkanshiNo, $gekkanshiNo, $nenkanshiNo, $birth_year, $birth_month, $birth_day, $gender){
        //// 廻り算出　１なら順回り。－1なら逆回り

        $circle = $this->calc_circle($nenkanshiNo, $gender);

        //生年月日
        $birthday = $birth_year."/".$birth_month."/".$birth_day;

        // // 生まれ月の節入り日を取得
        $setsuiribi_month_base =DB::table('setsuiribi')->where('seireki',$birth_year )->value($birth_month);
        $setsuiribi_month_base_conv = $birth_year."/".$birth_month."/".$setsuiribi_month_base; //節入り日をyyyy/mm/ddに変換
        //歳運算出
        if($circle == 1 ){
            //順回り
            if((strtotime($setsuiribi_month_base_conv) - strtotime($birthday)) < 0){ // 誕生日が節入り日より後の場合は次の節入り日との差で算出
                if($birth_month + 1 == 13 ){   //月が13になる場合は年を繰り上げて1月にする
                    $birth_month = 1;
                    $birth_year = $birth_year + 1;
                    $setsuiribi_month_base_next =DB::table('setsuiribi')->where('seireki',$birth_year )->value($birth_month);
                    $setsuiribi_month_base_conv_next = $birth_year."/".$birth_month."/".$setsuiribi_month_base_next; //節入り日をyyyy/mm/ddに変換
                    //節入り日と誕生日の差分を３で割ると歳運が算出される。
                    $sabun = ( strtotime($setsuiribi_month_base_conv_next) - strtotime($birthday))/ 86400;
                    if(round($sabun / 3)==0){
                        $saiun = 10; //ゼロの場合は10にする
                    }else{
                        $saiun = round($sabun / 3);
                    }
                }else{//年が繰り上がらない場合
                    $birth_month = $birth_month + 1;
                    $setsuiribi_month_base_next =DB::table('setsuiribi')->where('seireki',$birth_year )->value($birth_month);
                    $setsuiribi_month_base_conv_next = $birth_year."/".$birth_month."/".$setsuiribi_month_base_next; //節入り日をyyyy/mm/ddに変換
                    $sabun = ( strtotime($setsuiribi_month_base_conv_next) - strtotime($birthday))/ 86400;
                    if(round($sabun / 3)==0){
                        $saiun = 10;
                    }else{
                        $saiun = round($sabun / 3);
                    }
                }
            }elseif((strtotime($setsuiribi_month_base_conv) == strtotime($birth_day))){ //節入り日が誕生日の場合は差を30とする（３で割って10歳運とするため）
                $sabun = 30;
            }else{
                $sabun = ( strtotime($setsuiribi_month_base_conv) - strtotime($birthday))/ 86400;
                if(round($sabun / 3)==0){
                    $saiun = 10;
                }else{
                    $saiun = round($sabun / 3);
                }
            }
        }else{
            //逆廻り
            if((strtotime($birthday) - strtotime($setsuiribi_month_base_conv)) < 0 ){
                if($birth_month - 1 == 0){ //前月が前年になる場合　前年にして12月とする
                    $birth_month = 12;
                    $birth_year = $birth_year - 1;
                    $setsuiribi_month_base_before =DB::table('setsuiribi')->where('seireki',$birth_year )->value($birth_month);
                    $setsuiribi_month_base_conv_before = $birth_year."/".$birth_month."/".$setsuiribi_month_base_before; //節入り日をyyyy/mm/ddに変換
                    $sabun = (strtotime($birthday) - strtotime($setsuiribi_month_base_conv_before))/86400;
                    if(round($sabun/3)==0){
                        $saiun = 1;
                    }else{
                        $saiun = round($sabun / 3);
                    }
                }else{
                    $birth_month = $birth_month - 1;
                    $setsuiribi_month_base_before =DB::table('setsuiribi')->where('seireki',$birth_year )->value($birth_month);
                    $setsuiribi_month_base_conv_before = $birth_year."/".$birth_month."/".$setsuiribi_month_base_before; //節入り日をyyyy/mm/ddに変換
                    $sabun = (strtotime($birthday) - strtotime($setsuiribi_month_base_conv_before))/86400;
                    if(round($sabun/3)==0){
                        $saiun = 1;
                    }else{
                        $saiun = round($sabun / 3);
                    }
                }
            }else{
                $sabun = (strtotime($birthday) - strtotime($setsuiribi_month_base_conv))/86400;
                if(round($sabun/3)==0){
                    $saiun = 1;
                }else{
                    $saiun = round($sabun / 3);
                }
            }
        }
        //大運流れ算出
        $sanshutu_kanshi_id = $gekkanshiNo; //月干支の次の干支からスタート
        $taiun_list =[]; //リストの初期化
        $taiun_seireki = $saiun + $birth_year; //西暦の初期値

         //日干のIDの算出
        if($nikkanshiNo % 10 == 0 ){ //ゼロなら10にする
            $nikkan_id = '10';
        }else{
            $nikkan_id = $nikkanshiNo % 10;
        }

        //天中殺
        $tenchusatsu_chishi = $this->cal_tenchusatsu_chishi($nikkanshiNo);
        // print_r($tenchusatsu_chishi);
        //10年毎　120年分の大運の算出
        for($num=0; $num < 12; $num++){
            //行を初期化
            $taiun_row =[];
            //大運西暦
            $taiun_seireki = $saiun + $birth_year + 10 * $num;
            $taiun_row['AD'] = $taiun_seireki; //rowに追加
            //大運年齢
            $age = $saiun + ( 10 * $num );
            $taiun_row['age'] = $age; //rowに追加
            //大運干支
            $sanshutu_kanshi_id = $sanshutu_kanshi_id + $circle;
            if($sanshutu_kanshi_id == 61){ //60より大きければ1へ
                $sanshutu_kanshi_id = 1;
            }elseif($sanshutu_kanshi_id == 0){ //1より小さければ60へ
                $sanshutu_kanshi_id = 60;
            }
            $kanshi = DB::table('kanshi')->where('kanshi_id',$sanshutu_kanshi_id )->value('kanshi');
            $taiun_row['kanshi'] = $kanshi; //rowに追加

            //干支の地支IDの算出
            if($sanshutu_kanshi_id % 12 == 0 ){ //ゼロなら12にする
                $tainun_chishi_id = '12';
            }else{
                $tainun_chishi_id = $sanshutu_kanshi_id % 12;
            }

            //天中殺フラグ
            if($tainun_chishi_id == $tenchusatsu_chishi['chishi1'] || $tainun_chishi_id == $tenchusatsu_chishi['chishi2'] ){
                $tenchusatsu_flg = true;
            }else{
                $tenchusatsu_flg = false;
            }
            $taiun_row['tenchusatsu_flg'] = $tenchusatsu_flg;

            //大運主星
            // 大運干支idの算出
            if($sanshutu_kanshi_id % 10 == 0 ){
                $tenkan_id = '10';
            }else{
                $tenkan_id = $sanshutu_kanshi_id % 10;
            }
            $taiun_shusei = $this->juudai_keisan($tenkan_id, $nikkan_id);
            $taiun_row['shusei'] = $taiun_shusei;

            //大運従星
            // 大運地支のid算出
            if($sanshutu_kanshi_id % 12 == 0 ){
                $chishi_id = '12';
            }else{
                $chishi_id = $sanshutu_kanshi_id % 12;
            }
            $taiun_jusei = $this->juunidai_keisan($nikkan_id,$chishi_id);
            $taiun_row['jusei'] = $taiun_jusei;

            ////大運位相法
            //西
            $taiun_west = $this->CalIsou($nikkanshiNo,$sanshutu_kanshi_id, 'kouten','west');
            $taiun_row['west'] = $taiun_west; //rowに追加
            //中央
            $taiun_center = $this->CalIsou($gekkanshiNo,$sanshutu_kanshi_id, 'kouten','center');
            $taiun_row['center'] = $taiun_center; //rowに追加
            //東
            $taiun_west = $this->CalIsou($nenkanshiNo,$sanshutu_kanshi_id, 'kouten', 'east');
            $taiun_row['east'] = $taiun_west; //rowに追加

            $taiun_list[] = $taiun_row; //taiun_listにrowを追加
        }
        // print_r($taiun_list);
        return $taiun_list;

        //
    }
    //年運
    public function nenun($nikkanshiNo, $gekkanshiNo, $nenkanshiNo, $birth_year)
    {
        $nenun_list = [];
        //日干のIDの算出
        if($nikkanshiNo % 10 == 0 ){ //ゼロなら10にする
            $nikkan_id = '10';
        }else{
            $nikkan_id = $nikkanshiNo % 10;
        }

        //天中殺
        $tenchusatsu_chishi = $this->cal_tenchusatsu_chishi($nikkanshiNo);

        for($num=0; $num<120; $num++){
            $nenun_row = [];
            //西暦
            $sub_year = $birth_year + $num;
            $nenun_row['AD'] = $sub_year;
            //年齢
            $age = $num;
            $nenun_row['age'] = $age;
            //その年の干支
            $nenun_tenkan_id =($sub_year - 4 ) % 10 +1;
            $nenun_chishi_id =($sub_year - 4 ) % 12 +1;
            $nenkan =DB::table('jukkan')->where('jukkan_id',$nenun_tenkan_id )->value('tenkan');
            $nenshi =DB::table('junishi')->where('junishi_id',$nenun_chishi_id )->value('chishi');
            $nenkanshi = $nenkan.$nenshi;
            $sanshutu_kanshi_id = DB::table('kanshi')->where('kanshi',$nenkanshi )->value('kanshi_id');
            // $nenun_row['kanshi_id'] = $sanshutu_kanshi_id;
            $nenun_row['kanshi'] = $nenkanshi;

            //天中殺フラグ
            if($nenun_chishi_id == $tenchusatsu_chishi['chishi1'] || $nenun_chishi_id == $tenchusatsu_chishi['chishi2'] ){
                $tenchusatsu_flg = true;
            }else{
                $tenchusatsu_flg = false;
            }

            $nenun_row['tenchusatsu_flg'] = $tenchusatsu_flg;

            //年運主星
            $nenun_shusei = $this->juudai_keisan($nenun_tenkan_id, $nikkan_id);
            $nenun_row['shusei'] = $nenun_shusei;
            //年運従星
            $nenun_jusei = $this->juunidai_keisan($nikkan_id,$nenun_chishi_id);
            $nenun_row['jusei'] = $nenun_jusei;

            //年運位相法
            //西
            $nenun_west = $this->CalIsou($nikkanshiNo,$sanshutu_kanshi_id, 'kouten','west');
            $nenun_row['west'] = $nenun_west; //rowに追加
            //中央
            $nenun_center = $this->CalIsou($gekkanshiNo,$sanshutu_kanshi_id, 'kouten','center');
            $nenun_row['center'] = $nenun_center; //rowに追加
            //東
            $nenun_west = $this->CalIsou($nenkanshiNo,$sanshutu_kanshi_id, 'kouten', 'east');
            $nenun_row['east'] = $nenun_west; //rowに追加


            $nenun_list[] = $nenun_row;
        }
        // print_r($nenun_list);
        return $nenun_list;
    }
    //月運
    public function tsukiun($nikkanshiNo, $gekkanshiNo, $nenkanshiNo, $sub_year){
        $tsukiun_list = [];
        // print_r($sub_year);

        //日干のIDの算出
        if($nikkanshiNo % 10 == 0 ){ //ゼロなら10にする
            $nikkan_id = '10';
        }else{
            $nikkan_id = $nikkanshiNo % 10;
        }
        //天中殺
        $tenchusatsu_chishi = $this->cal_tenchusatsu_chishi($nikkanshiNo);

        for($month=1; $month<=12; $month++){
            $tsukiun_row = [];
            $tsukiun_row['date'] = $sub_year.'/'.$month;

            ///対象の年月の干支算出

            $tsukiun_tenkan_id = $this->calc_tenkan_id($sub_year, $month);
            // $tsukiun_row['tenkan'] = $tsukiun_tenkan_id;

            $tsukiun_chishi_id = $this->calc_chishi_id($month);
            // $tsukiun_row['chishi'] = $tsukiun_chishi_id;

            $tenkan =DB::table('jukkan')->where('jukkan_id',$tsukiun_tenkan_id )->value('tenkan');
            $chishi =DB::table('junishi')->where('junishi_id',$tsukiun_chishi_id )->value('chishi');
            $kanshi = $tenkan.$chishi;
            $sanshutu_kanshi_id = DB::table('kanshi')->where('kanshi',$kanshi )->value('kanshi_id');
            $tsukiun_row['kanshi'] = $kanshi;

            //天中殺フラグ
            if($tsukiun_chishi_id == $tenchusatsu_chishi['chishi1'] || $tsukiun_chishi_id == $tenchusatsu_chishi['chishi2'] ){
                $tenchusatsu_flg = true;
            }else{
                $tenchusatsu_flg = false;
            }
            $tsukiun_row['tenchusatsu_flg'] = $tenchusatsu_flg;

            //月運主星
            $tsukiun_shusei = $this->juudai_keisan($tsukiun_tenkan_id, $nikkan_id);
            $tsukiun_row['shusei'] = $tsukiun_shusei;
            //月運従星
            $tsukiun_jusei = $this->juunidai_keisan($nikkan_id,$tsukiun_chishi_id);
            $tsukiun_row['jusei'] = $tsukiun_jusei;

            //月運位相法
            //西
            $tsukiun_west = $this->CalIsou($nikkanshiNo,$sanshutu_kanshi_id, 'kouten','west');
            $tsukiun_row['west'] = $tsukiun_west; //rowに追加
            //中央
            $tsukiun_center = $this->CalIsou($gekkanshiNo,$sanshutu_kanshi_id, 'kouten','center');
            $tsukiun_row['center'] = $tsukiun_center; //rowに追加
            //東
            $tsukiun_west = $this->CalIsou($nenkanshiNo,$sanshutu_kanshi_id, 'kouten', 'east');
            $tsukiun_row['east'] = $tsukiun_west; //rowに追加

            $tsukiun_list[] = $tsukiun_row;
        }

        // print_r($tsukiun_list);
        return $tsukiun_list;
    }

    //日運算出
    public function hiun($nikkanshiNo, $gekkanshiNo, $nenkanshiNo, $sub_year, $sub_month){
        $hiun_kijun = "1900/2/20";
        $hiun_list = [];
        $start_date_conv = date('t', mktime(0,0,0,1,$sub_month,$sub_year));
        $number_of_days_in_month = date('t', strtotime($start_date_conv));
        // echo $number_of_days_in_month;

        //日干のIDの算出
        if($nikkanshiNo % 10 == 0 ){ //ゼロなら10にする
            $nikkan_id = '10';
        }else{
            $nikkan_id = $nikkanshiNo % 10;
        }
        //天中殺
        $tenchusatsu_chishi = $this->cal_tenchusatsu_chishi($nikkanshiNo);

        for($day=1; $day<=$number_of_days_in_month; $day++){
            $hiun_row = [];
            $date  = $sub_year."/".$sub_month."/".$day;
            $hiun_row['date'] = $date;

            $date_conv = date('Y/m/d', strtotime($date));
            // print_r($date_conv);
            $hiun_sabun = (strtotime($date_conv) - strtotime($hiun_kijun)) / 86400 + 1;
            $hiun_tenkan_id = $hiun_sabun % 10;
            if($hiun_tenkan_id == 0){
                $hiun_tenkan_id = 10;
            }
            $hiun_chishi_id = $hiun_sabun % 12;
            if($hiun_chishi_id == 0){
                $hiun_chishi_id = 12;
            }
            $tenkan =DB::table('jukkan')->where('jukkan_id',$hiun_tenkan_id )->value('tenkan');
            $chishi =DB::table('junishi')->where('junishi_id',$hiun_chishi_id )->value('chishi');
            $kanshi = $tenkan.$chishi;
            $sanshutu_kanshi_id = DB::table('kanshi')->where('kanshi',$kanshi )->value('kanshi_id');
            $hiun_row['kanshi'] = $kanshi;

            //天中殺フラグ
            if($hiun_chishi_id == $tenchusatsu_chishi['chishi1'] || $hiun_chishi_id == $tenchusatsu_chishi['chishi2'] ){
                $tenchusatsu_flg = true;
            }else{
                $tenchusatsu_flg = false;
            }
            $hiun_row['tenchusatsu_flg'] = $tenchusatsu_flg;


            //月運主星
            $hiun_shusei = $this->juudai_keisan($hiun_tenkan_id, $nikkan_id);
            $hiun_row['shusei'] = $hiun_shusei;
            //月運従星
            $hiun_jusei = $this->juunidai_keisan($nikkan_id,$hiun_chishi_id);
            $hiun_row['jusei'] = $hiun_jusei;

            //月運位相法
            //西
            $hiun_west = $this->CalIsou($nikkanshiNo,$sanshutu_kanshi_id, 'kouten','west');
            $hiun_row['west'] = $hiun_west; //rowに追加
            //中央
            $hiun_center = $this->CalIsou($gekkanshiNo,$sanshutu_kanshi_id, 'kouten','center');
            $hiun_row['center'] = $hiun_center; //rowに追加
            //東
            $hiun_west = $this->CalIsou($nenkanshiNo,$sanshutu_kanshi_id, 'kouten', 'east');
            $hiun_row['east'] = $hiun_west; //rowに追加

            $hiun_list[] = $hiun_row;
        }
        // print_r($hiun_list);
        return $hiun_list;

    }
    //月運算出
    public function isouMonth(Request $request)
    {

        $nikkanshiNo = $request['nikkanshiNo'];
        $gekkanshiNo = $request['gekkanshiNo'];
        $nenkanshiNo = $request['nenkanshiNo'];
        $sub_year = $request['year'];
        $tsukiun = $this->tsukiun($nikkanshiNo, $gekkanshiNo, $nenkanshiNo, $sub_year);
        return  $tsukiun;
    }
    //日運算出
    public function isouDay(Request $request)
    {
        $nikkanshiNo = $request['nikkanshiNo'];
        $gekkanshiNo = $request['gekkanshiNo'];
        $nenkanshiNo = $request['nenkanshiNo'];
        $sub_year = $request['year'];
        $sub_month = $request['month'];
        $hiun = $this->hiun($nikkanshiNo, $gekkanshiNo, $nenkanshiNo, $sub_year, $sub_month);

        return  $hiun;
    }
    //// 廻り算出　１なら順回り。－1なら逆回り
    public function calc_circle($nenkanshiNo,$gender){
        //日干の陰陽判断　ゼロなら陰、１なら陽
        if($nenkanshiNo%2 == 0){
            $inyou_handan = -1;
        }else{
            $inyou_handan = 1;
        };

        // 性別変換
        if($gender==0){
            $gender_cov = 1;
        }else{
            $gender_cov = -1;
        }

        //廻り算出
        if($gender_cov*$inyou_handan > 0){
            $circle = 1;
        }else{
            $circle = -1;
        }
        return $circle;
    }
    // 天干のID算出
    public function calc_tenkan_id($sub_year,$month){
        $id = (($sub_year * 12) + $month + 3 ) % 10;
        if($id == 0){
            return 10;
        }else{
            return $id;
        }
    }
    //地支のID算出
    public function calc_chishi_id($month){
        $id = ( $month + 1 ) % 12;
        if($id == 0){
            return 12;
        }else{
            return $id;
        }
    }
    //位相法計算（干支ID　×　干支ID　で　セレクトが宿命か後転運か、オプションが位置
    public function CalIsou($kanshi1, $kanshi2, $select, $option) //id
    {
        $array = [];
        $isouCal = DB::table('cal_isoho')->where('kanshi_id', $kanshi1 )->value($kanshi2);
        $_isouCal = explode(',',$isouCal);
        array_pop($_isouCal);//配列の最後の要素を削除する（空白です）
        //位相法の配列数だけ算出する
        foreach($_isouCal as $val){
            $isou_detail = DB::table('isoho')->where('id', $val )->first();
            $_isou_detail = (array)$isou_detail;//オブジェクトを配列化
            //条件に合致しない配列の要素を削除する。
            switch($select){
                case 'kouten':
                    unset($_isou_detail['shukumei_detail']);
                    unset($_isou_detail['shukumei_nengetsu']);
                    unset($_isou_detail['shukumei_gappi']);
                    unset($_isou_detail['shukumei_nennichi']);
                    unset($_isou_detail['compatibility_detail']);

                    switch($option){
                        case 'west':
                            unset($_isou_detail['kouten_center']);
                            unset($_isou_detail['kouten_east']);
                            break;
                        case 'center':
                            unset($_isou_detail['kouten_west']);
                            unset($_isou_detail['kouten_east']);
                            break;
                        case 'east':
                            unset($_isou_detail['kouten_west']);
                            unset($_isou_detail['kouten_center']);
                            break;
                    }
                    break;

                case 'shukumei':
                    unset($_isou_detail['kouten_detail']);
                    unset($_isou_detail['kouten_west']);
                    unset($_isou_detail['kouten_center']);
                    unset($_isou_detail['kouten_east']);
                    unset($_isou_detail['compatibility_detail']);
                    break;

                    switch($option){
                        case 'nichigetsu':

                            unset($_isou_detail['shukumei_nengetsu']);
                            unset($_isou_detail['shukumei_nennichi']);
                            break;
                        case 'nengetsu':
                            unset($_isou_detail['shukumei_gappi']);
                            unset($_isou_detail['shukumei_nennichi']);
                            break;
                        case 'nichinen':
                            unset($_isou_detail['shukumei_gappi']);
                            unset($_isou_detail['shukumei_nengetsu']);
                            break;
                    }
                case 'compatibility';
                    unset($_isou_detail['shukumei_detail']);
                    unset($_isou_detail['shukumei_nengetsu']);
                    unset($_isou_detail['shukumei_gappi']);
                    unset($_isou_detail['shukumei_nennichi']);
                    unset($_isou_detail['kouten_detail']);
                    unset($_isou_detail['kouten_west']);
                    unset($_isou_detail['kouten_center']);
                    unset($_isou_detail['kouten_east']);
                    break;
            }
            $array[] = $_isou_detail;
        }
        return $array;
    }
    //十大主星の算出
    public function juudai_keisan($kan1_id,$kan2_id){
        $juudai_id =DB::table('cal_judai')->where('jukkan_id', $kan1_id)->value($kan2_id);
        $juudaishusei =DB::table('judaishusei')->where('judaishusei_id',$juudai_id )->value('judaishusei');
        return $juudaishusei;
    }
    public function juunidai_keisan($tenkan_id,$chishi_id){
        $junidai_id =DB::table('cal_junidai')->where('junishi_id', $chishi_id)->value($tenkan_id);
        $junidaijusei =DB::table('junidaijusei')->where('junidaijusei_id',$junidai_id )->value('junidaijusei');
        return  $junidaijusei;
    }
    //干支番号から天中殺の地支を出力
    public function cal_tenchusatsu_chishi($kanshiNo){
        switch($kanshiNo){
            case $kanshiNo <= 10:
                return array('chishi1'=>11, 'chishi2'=>12);
                break;
            case $kanshiNo > 10 && $kanshiNo <= 20:
                return array('chishi1'=>9,'chishi2'=>10);
                break;
            case $kanshiNo > 20 && $kanshiNo <= 30:
                return array('chishi1'=>7,'chishi2'=>8);
                break;
            case $kanshiNo > 30 && $kanshiNo <= 40:
                return array('chishi1'=>5,'chishi2'=>6);
                break;
            case $kanshiNo > 40 && $kanshiNo <= 50:
                return array('chishi1'=>3,'chishi2'=>4);
                break;
            case $kanshiNo > 50 && $kanshiNo <= 60:
                return array('chishi1'=>1,'chishi2'=>2);
                break;
        }
    }
    //年運の天中殺時期を計算
    public function cal_next_tenchusatsu_nenun($tenchusatsu){
        $thisYear = date('Y') ;
        $today = time();
        // $today = 1675215937;
        // echo $today;
        switch ($tenchusatsu){
            case $tenchusatsu == '子丑':
                $startYearChishiId = 1;
                break;
            case $tenchusatsu == '寅卯':
                $startYearChishiId = 3;
                break;
            case $tenchusatsu == '辰巳':
                $startYearChishiId = 5;
                break;
            case $tenchusatsu == '午未':
                $startYearChishiId = 7;
                break;
            case $tenchusatsu == '申酉':
                $startYearChishiId = 9;
                break;
            case $tenchusatsu == '戌亥':
                $startYearChishiId = 11;
                break;
        }
        // echo $thisYear;
        // echo $startYearChishiId;

        $checkStartYear = $thisYear - 2 ;//二年前の西暦からチェックする
        // echo $checkStartYear;


        for($num=0; $num<12; $num++){
            $targetYear = $checkStartYear + $num;
            $targetYearId = ( $targetYear - 3 ) % 12;
            // echo 'targetYear;'.$targetYear;

            if($targetYearId == 0){
                $targetYearId = 12;
            }
            // echo 'targetYearID;'.$targetYearId;

            // var_dump($targetYearId);

            if($targetYearId == $startYearChishiId){
                $startSetsuiribi = DB::table('setsuiribi')->where('seireki',$targetYear )->value('2');
                $startDateStr = $targetYear."/"."2"."/".$startSetsuiribi;
                $startDate = strtotime($startDateStr);

                $endTargetYear =$targetYear + 1 ;
                $endSetsuiribi = DB::table('setsuiribi')->where('seireki',($endTargetYear + 1) )->value('2');
                $endDateStr = ($endTargetYear+1)."/"."2"."/".($endSetsuiribi - 1 );
                $endDate = strtotime($endDateStr);

                if($today > $endDate ){
                    // echo 'start today end';
                    $nextTargetYear = $targetYear + 12;
                    $startSetsuiribi = DB::table('setsuiribi')->where('seireki',$nextTargetYear )->value('2');
                    $startDateStr = $targetYear."/"."2"."/".$startSetsuiribi;
                    $startDate = strtotime($startDateStr);

                    $endTargetYear =$nextTargetYear + 1 ;
                    $endSetsuiribi = DB::table('setsuiribi')->where('seireki',($endTargetYear + 1) )->value('2');
                    $endDateStr = ($endTargetYear+1)."/"."2"."/".($endSetsuiribi - 1 );
                    $endDate = strtotime($endDateStr);
                }
                // echo 'startDateStr:'.$startDateStr;
                // echo 'endDateStr:'.$endDateStr;


            }
        }

        $result = array(
            'start_date_unix'=>$startDate,
            'end_date_unix' =>$endDate
        );
        return $result;
        // return;
    }
    //月運の天中殺時期を計算
    public function cal_next_tenchusatsu_month($tenchusatsu){
         $thisYear = date('Y');
         $startYear = $thisYear;
         $endYear = $thisYear;
         $thisMonth = date('m');

        switch ($tenchusatsu){
            case $tenchusatsu == '子丑':
                $tenchusatsuMonths = array('12','1');
                if($thisMonth == 1) {
                    $startYear = $startYear -1;
                } else{
                    $endYear = $endYear + 1;
                }
                break;
            case $tenchusatsu == '寅卯':
                $tenchusatsuMonths = array('2','3');
                break;
            case $tenchusatsu == '辰巳':
                $tenchusatsuMonths = array('4','5');
                break;
            case $tenchusatsu == '午未':
                $tenchusatsuMonths = array('6','7');
                break;
            case $tenchusatsu == '申酉':
                $tenchusatsuMonths = array('8','9');
                break;
            case $tenchusatsu == '戌亥':
                $tenchusatsuMonths = array('10','11');
                break;
        }

        $startDate = $this->getStartDate($startYear,$tenchusatsuMonths[0]);
        $endDate = $this->getEndDate($endYear, $tenchusatsuMonths[1] + 1);

        $result = array(
            'start_date_unix'=>$startDate,
            'end_date_unix' =>$endDate
        );
        return $result;

    }
////動物占い
    //十二大従星から動物占いの動物（１２種類）を取得
    public function individual_psychology_overview($junidaijusei){
        $junidaijusei_id =  DB::table('junidaijusei')->where('junidaijusei', $junidaijusei )->value("junidaijusei_id");
        $individual_psychology_overview_detail =  DB::table('individual_psychology_overview')->where('id', $junidaijusei_id )->value("detail");
        return $individual_psychology_overview_detail;
    }
    //十二大従星から動物占いの動物（１２種類）のグループを取得
    public function getIndividual_psychology_group($junidaijusei){
        $junidaijusei_id =  DB::table('junidaijusei')->where('junidaijusei', $junidaijusei )->value("junidaijusei_id");
        $individual_psychology_overview_detail =  DB::table('individual_psychology_overview')->where('id', $junidaijusei_id )->value("group_name");
        return $individual_psychology_overview_detail;
    }
    //十二大従星から動物占いの動物（１２種類）の英語名を取得
    public function getIndividual_psychology_chara_name($junidaijusei){
        $junidaijusei_id =  DB::table('junidaijusei')->where('junidaijusei', $junidaijusei )->value("junidaijusei_id");
        $individual_psychology_overview_detail =  DB::table('individual_psychology_overview')->where('id', $junidaijusei_id )->value("chara_name");
        return $individual_psychology_overview_detail;
    }
    //十二大従星から動物占いの動物（１２種類）のWEYWORDを取得
    public function getIndividual_psychology_keyword($junidaijusei){
        $junidaijusei_id =  DB::table('junidaijusei')->where('junidaijusei', $junidaijusei )->value("junidaijusei_id");
        $individual_psychology_overview_keyword =  DB::table('individual_psychology_overview')->where('id', $junidaijusei_id )->value("keyword");
        return $individual_psychology_overview_keyword;
    }
    //希望を取得
    public function getKibouDoubutsu($nikkanId, $birthHour){

        // echo $nikkanId;
        // echo $birthHour;

        switch($birthHour){
            case $birthHour == 23 || $birthHour == 0 :
                $chishiId = 1;
                break;
            case $birthHour == 1 || $birthHour == 2 :
                $chishiId = 2;
                break;
            case $birthHour == 3 || $birthHour == 4 :
                $chishiId = 3;
                break;
            case $birthHour == 5 || $birthHour == 6 :
                $chishiId = 4;
                break;
            case $birthHour == 7 || $birthHour == 8 :
                $chishiId = 5;
                break;
            case $birthHour == 9 || $birthHour == 10 :
                $chishiId = 6;
                break;
            case $birthHour == 11 || $birthHour == 12 :
                $chishiId = 7;
                break;
            case $birthHour == 13 || $birthHour == 14 :
                $chishiId = 8;
                break;
            case $birthHour == 15 || $birthHour == 16 :
                $chishiId = 9;
                break;
            case $birthHour == 17 || $birthHour == 18 :
                $chishiId = 10;
                break;
            case $birthHour == 19 || $birthHour == 20 :
                $chishiId = 11;
                break;
            case $birthHour == 21 || $birthHour == 22 :
                $chishiId = 12;
                break;
        }
        $kibouJunidai = $this->juunidai_keisan($nikkanId, $chishiId);
        $kibou = $this->individual_psychology_overview($kibouJunidai);
        // echo $kibou;
        return $kibou;
    }
    //希望のグループを取得
    public function getKibouDoubutsuGroup($nikkanId, $birthHour){

        // echo $nikkanId;
        // echo $birthHour;

        switch($birthHour){
            case $birthHour == 23 || $birthHour == 0 :
                $chishiId = 1;
                break;
            case $birthHour == 1 || $birthHour == 2 :
                $chishiId = 2;
                break;
            case $birthHour == 3 || $birthHour == 4 :
                $chishiId = 3;
                break;
            case $birthHour == 5 || $birthHour == 6 :
                $chishiId = 4;
                break;
            case $birthHour == 7 || $birthHour == 8 :
                $chishiId = 5;
                break;
            case $birthHour == 9 || $birthHour == 10 :
                $chishiId = 6;
                break;
            case $birthHour == 11 || $birthHour == 12 :
                $chishiId = 7;
                break;
            case $birthHour == 13 || $birthHour == 14 :
                $chishiId = 8;
                break;
            case $birthHour == 15 || $birthHour == 16 :
                $chishiId = 9;
                break;
            case $birthHour == 17 || $birthHour == 18 :
                $chishiId = 10;
                break;
            case $birthHour == 19 || $birthHour == 20 :
                $chishiId = 11;
                break;
            case $birthHour == 21 || $birthHour == 22 :
                $chishiId = 12;
                break;
        }
        $kibouJunidai = $this->juunidai_keisan($nikkanId, $chishiId);
        $kibou_group = $this->getIndividual_psychology_group($kibouJunidai);
        // echo $kibou;
        return $kibou_group;
    }
        //希望のcharaname英語を取得
    public function getKibouDoubutsuCharaName($nikkanId, $birthHour){

        // echo $nikkanId;
        // echo $birthHour;

        switch($birthHour){
            case $birthHour == 23 || $birthHour == 0 :
                $chishiId = 1;
                break;
            case $birthHour == 1 || $birthHour == 2 :
                $chishiId = 2;
                break;
            case $birthHour == 3 || $birthHour == 4 :
                $chishiId = 3;
                break;
            case $birthHour == 5 || $birthHour == 6 :
                $chishiId = 4;
                break;
            case $birthHour == 7 || $birthHour == 8 :
                $chishiId = 5;
                break;
            case $birthHour == 9 || $birthHour == 10 :
                $chishiId = 6;
                break;
            case $birthHour == 11 || $birthHour == 12 :
                $chishiId = 7;
                break;
            case $birthHour == 13 || $birthHour == 14 :
                $chishiId = 8;
                break;
            case $birthHour == 15 || $birthHour == 16 :
                $chishiId = 9;
                break;
            case $birthHour == 17 || $birthHour == 18 :
                $chishiId = 10;
                break;
            case $birthHour == 19 || $birthHour == 20 :
                $chishiId = 11;
                break;
            case $birthHour == 21 || $birthHour == 22 :
                $chishiId = 12;
                break;
        }
        $kibouJunidai = $this->juunidai_keisan($nikkanId, $chishiId);
        $kibou_chara_name = $this->getIndividual_psychology_chara_name($kibouJunidai);
        // echo $kibou;
        return $kibou_chara_name;
    }
    //動物占い性別確認
    public function gender_kind($gender){
        if($gender==0){ return 'male';}else{return 'female';}
    }
    public function compatibility(Request $request)
    {

        // print_r('test');
        // return $request;

        $first_parson = $request['first_parson'];
        $second_parson = $request['second_parson'];

        $_first_parson_result = $this->getResult($first_parson['appraised_parsons_name'], $first_parson['birth_year'], $first_parson['birth_month'], $first_parson['birth_day'], $first_parson['birth_hour'], $first_parson['birth_minite'], $first_parson['gender'] );
        $_second_parson_result = $this->getResult($second_parson['appraised_parsons_name'], $second_parson['birth_year'], $second_parson['birth_month'], $second_parson['birth_day'], $second_parson['birth_hour'], $second_parson['birth_minite'], $second_parson['gender'] );

        $first_parson_result = array(
            'profile' => $_first_parson_result['profile'],
            'sanmei' => $_first_parson_result['sanmei']
        );
        $second_parson_result = array(
            'profile' => $_second_parson_result['profile'],
            'sanmei' => $_second_parson_result['sanmei']
        );

        $parson =  array(
            'first_parson' => $first_parson_result,
            'second_parson' => $second_parson_result
        );
        // print_r($first_parson_result['action_area']);
        //日干支×日干支
        $nikkanshi_nikkanshi = $this->CalIsou($first_parson_result['sanmei']['action_area']['nikkanshi_id'], $second_parson_result['sanmei']['action_area']['nikkanshi_id'], 'compatibility', '');
        //月干支×日干支
        $gekkkanshi_nikkanshi = $this->CalIsou($first_parson_result['sanmei']['action_area']['gekkanshi_id'], $second_parson_result['sanmei']['action_area']['nikkanshi_id'], 'compatibility', '');
        //年干支×日干支
        $nenkkanshi_nikkanshi = $this->CalIsou($first_parson_result['sanmei']['action_area']['nenkanshi_id'], $second_parson_result['sanmei']['action_area']['nikkanshi_id'], 'compatibility', '');

        //日干支×月干支
        $nikkanshi_gekkanshi = $this->CalIsou($first_parson_result['sanmei']['action_area']['nikkanshi_id'], $second_parson_result['sanmei']['action_area']['gekkanshi_id'], 'compatibility', '');
        //月干支×月干支
        $gekkanshi_gekkanshi = $this->CalIsou($first_parson_result['sanmei']['action_area']['gekkanshi_id'], $second_parson_result['sanmei']['action_area']['gekkanshi_id'], 'compatibility', '');
        //年干支×月干支
        $nenkanshi_gekkanshi = $this->CalIsou($first_parson_result['sanmei']['action_area']['nenkanshi_id'], $second_parson_result['sanmei']['action_area']['gekkanshi_id'], 'compatibility', '');

        //日干支×年干支
        $nikkanshi_nenkanshi = $this->CalIsou($first_parson_result['sanmei']['action_area']['nikkanshi_id'], $second_parson_result['sanmei']['action_area']['nenkanshi_id'], 'compatibility', '');
        //月干支×年干支
        $gekkanshi_nenkanshi = $this->CalIsou($first_parson_result['sanmei']['action_area']['gekkanshi_id'], $second_parson_result['sanmei']['action_area']['nenkanshi_id'], 'compatibility', '');
        //年干支×年干支
        $nenkanshi_nenkanshi = $this->CalIsou($first_parson_result['sanmei']['action_area']['nenkanshi_id'], $second_parson_result['sanmei']['action_area']['nenkanshi_id'], 'compatibility', '');

        $compatibility_isou = array (
            'nikkanshi_nikkanshi' => $nikkanshi_nikkanshi,
            'gekkanshi_nikkanshi' => $gekkkanshi_nikkanshi,
            'nenkanshi_nikkanshi' => $nenkkanshi_nikkanshi,
            'nikkanshi_gekkanshi' => $nikkanshi_gekkanshi,
            'gekkanshi_gekkanshi' => $gekkanshi_gekkanshi,
            'nenkanshi_gekkanshi' => $nenkanshi_gekkanshi,
            'nikkanshi_nenkanshi' => $nikkanshi_nenkanshi,
            'gekkanshi_nenkanshi' => $gekkanshi_nenkanshi,
            'nenkanshi_nenkanshi' => $nenkanshi_nenkanshi,
        );

        $compatibility_result = array(
            'first_parson' => $first_parson_result,
            'second_parson' => $second_parson_result,
            'compatibility_isou' => $compatibility_isou
        );
        return $compatibility_result;
        // return $first_parson_result['sanmei']['action_area']['nikkanshi_id'];
        // return $request;
        // return 'test';
        // return $request;

    }
}

