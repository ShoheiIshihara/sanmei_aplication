<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CalculationController;
use App\Http\Controllers\AppraisedParsonController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//コントローラテスト
Route::get('/test', [CalculationController::class, 'test']);
Route::get('/calclation', [CalculationController::class, 'Calclation']);
Route::get('/calclation/isouMonth', [CalculationController::class, 'isouMonth']);
Route::get('/calclation/isouDay', [CalculationController::class, 'isouDay']);
Route::get('/calclation/compatibility', [CalculationController::class, 'compatibility']);
Route::resource('/appraisedparsonregister', AppraisedParsonController::class);

