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

    # 시스템.
    Route::group(['prefix' => 'system', 'as' => 'system.'], function () {
        Route::get('check-status', [\App\Http\Controllers\Api\SystemController::class, 'checkSystemStatus'])->name('check.status'); // 서버 체크
        Route::get('check-notice', [\App\Http\Controllers\Api\SystemController::class, 'checkSystemNotice'])->name('check.notice'); // 서버 공지사항 체크
        Route::get('site-data', [\App\Http\Controllers\Api\SystemController::class, 'getBaseData'])->name('base.data');
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

        # media
        Route::group(['prefix' => 'media'], function () {
            Route::post('{category}/create-image', [\App\Http\Controllers\Api\v1\MediaController::class, 'createImage'])->name('create.image'); # 이미지 등록
        });

        # post
        Route::group(['prefix' => 'post'], function () {
            Route::post('{category}/create', [\App\Http\Controllers\Api\v1\BlogPostController::class, 'create'])->name('create.post')->middleware('auth:api'); # 글 등록
            Route::put('{uuid}/update', [\App\Http\Controllers\Api\v1\BlogPostController::class, 'update'])->name('update.post')->middleware('auth:api'); # 글 업데이트
            Route::get('{uuid}/edit', [\App\Http\Controllers\Api\v1\BlogPostController::class, 'edit'])->name('edit.post')->middleware('auth:api'); # 글 에디트
        });
    });
});
