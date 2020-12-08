<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PhotoController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', 'RegisterController@register')->name('register');

Route::post('/login', 'LoginController@login')->name('login');
//ログアウト
Route::post('/logout', 'LoginController@logout')->name('logout');
// ログインユーザー
Route::get('user', fn() => Auth::user())->name('user');
// 写真投稿
Route::post('/photos', 'PhotoController@create')->name('photo.create');
// 写真一覧
Route::get('/photos', 'PhotoController@index')->name('photo.index');
// 写真詳細
Route::get('/photos/{id}','PhotoController@show')->name('photo.show');
// コメント
Route::post('/photos/{photo}/comments', 'PhotoController@addComment')->name('photo.comment');
// いいね
Route::put('/photos/{id}/like', 'PhotoController@like')->name('Photo.like');
// いいね解除
Route::delete('/photos/{id}/like', 'PhotoController@unlike');
// トークンリフレッシュ(CSRF トークンがうまくリフレッシュされず、再ログインできないため)
Route::get('/reflesh-token', function (Illuminate\Http\Request $request) {
    $request->session()->regenerateToken();

    return response()->json();
});

