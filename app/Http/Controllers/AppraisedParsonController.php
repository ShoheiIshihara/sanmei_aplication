<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\AppraisedParson;

class AppraisedParsonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return 'create method!';
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        // $appraised_parsons_name = $request["params"]["name"];
        // $birth_year = $request["params"]['birth_year'];
        // $birth_month = $request["params"]['birth_month'];
        // $birth_day = $request["params"]['birth_day'];
        // $birth_hour = $request["params"]['birth_hour'];
        // $birth_minite = $request["params"]['birth_minite'];
        // $gender = $request["params"]['gender'];
        // $user_id = $request["params"]['user_id'];


        $appraised_parsons_name = $request["params"]["name"];
        // return $appraised_parsons_name;
        $birth_year = $request["params"]['birth_year'];
        $birth_month = $request["params"]['birth_month'];
        $birth_day = $request["params"]['birth_day'];
        $birth_hour = $request["params"]['birth_hour'];
        $birth_minite = $request["params"]['birth_minite'];
        $gender = $request["params"]['gender'];
        $user_id = $request["params"]['user_id'];


        // $appraised_parsons_name = 'Test Name';
        // $birth_year ='1987';
        // $birth_month = '6';
        // $birth_day = '20';
        // $birth_hour = "";
        // $birth_minite = "";
        // $gender = '1';
        // $user_id = '1';

        DB::table('appraised_parsons')->insert([
            'appraised_parsons_name' => $appraised_parsons_name,
            'birth_year' => $birth_year,
            'birth_month' => $birth_month,
            'birth_day' => $birth_day,
            // 'birth_hour' => 0,
            // 'birth_minite' => 0,
            'birth_hour' => $birth_hour,
            'birth_minite' => $birth_minite,
            'gender' => $gender,
            'user_id' => $user_id,
        ]);


        return 'touroku OK!';
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        // return "show Method!";
        //
        $user_id = $request['user_id'];
        $appraisedparsons = DB::table('appraised_parsons')->where('user_id', $user_id)->get();
        // $appraisedparsons = DB::table('appraised_parsons')->get();
        return $appraisedparsons;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        return 'edit method!';
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
        // return $request;
        $id = $request["params"]['id'];
        $name = $request["params"]['name'];
        $birth_year = $request["params"]['birth_year'];
        $birth_month = $request["params"]['birth_month'];
        $birth_day = $request["params"]['birth_day'];
        $birth_hour = $request["params"]['birth_hour'];
        $birth_minite = $request["params"]['birth_minite'];
        $gender = $request["params"]['gender'];


        DB::table('appraised_parsons')
            ->where('appraised_parsons_id', $id)
            ->update([
                'appraised_parsons_name'=>$name,
                'birth_year'=>$birth_year,
                'birth_month'=>$birth_month,
                'birth_day'=>$birth_day,
                'birth_hour'=>$birth_hour,
                'birth_minite'=>$birth_minite,
                'gender'=>$gender
            ]);

        return 'update method!';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $appraised_parsons_id = $request['appraised_parsons_id'];
        // $appraisedparsons = DB::table('appraised_parsons')->where('appraised_parsons_id', $appraised_parsons_id)->get();
        // $appraisedparsons = DB::table('appraised_parsons')->where('appraised_parsons_id', $id)->get();
        AppraisedParson::destroy($appraised_parsons_id);

        return "delete Done!";
    }
}
