<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});


Route::group(['as' => 'api.'], function () {
    # Api Test 용 컨트롤러.
    Route::group(['prefix' => 'test', 'as' => 'test.'], function () {
        Route::post('default', [\App\Http\Controllers\Api\TestController::class, 'default'])->name('default');
    });

    # v1.
    Route::group(['namespace' => 'v1', 'prefix' => 'v1', 'as' => 'v1.'], function () {
        # 인증
        Route::group(['prefix' => 'auth'], function () {
            Route::post('login', [\App\Http\Controllers\Api\v1\AuthController::class, 'login'])->name('login'); # 로그인
            Route::post('logout', [\App\Http\Controllers\Api\v1\AuthController::class, 'logout'])->name('logout')->middleware('auth:api'); # 로그아웃
            Route::get('login-info', [\App\Http\Controllers\Api\v1\AuthController::class, 'loginInfo'])->name('loginInfo')->middleware('auth:api'); # 토큰 사용자 정보.
            Route::post('token-refresh', [\App\Http\Controllers\Api\v1\AuthController::class, 'tokenRefresh'])->name('token.refresh'); # 토큰 새로고침
        });
    });
});
