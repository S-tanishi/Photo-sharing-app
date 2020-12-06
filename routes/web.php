<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//APIのURL以外のリクエストに関してはindexテンプレートを返す
//画面遷移はフロントエンドのVueRouterが制御
Route::get('/{any?}', fn() => view('index'))->where('any', '.+');
//写真ダウンロード
Route::get('/photos/{photo}/download', 'PhotoController@download');