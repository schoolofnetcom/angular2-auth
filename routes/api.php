<?php

use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;

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

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::group(['middleware' => 'cors'], function () {
    Route::group(['middleware' => 'jwt.auth'], function () {
        Route::get('products', 'Api\ProductsController@index');
        Route::get('session', 'Api\PagSeguroController@getSessionId');
        Route::post('order', 'Api\OrdersController@store');
        Route::get('user', function () {
            $user = JWTAuth::parseToken()->toUser();

            return response()->json(compact('user'));
        });
    });
    Route::post('login', 'Api\AuthController@login');
    Route::post('refresh_token', function(){
        try {
            $token = JWTAuth::parseToken()->refresh();
            return response()->json(compact('token'));
        }catch (JWTException $exception){
            return response()->json(['error' => 'token_invalid'],400);
        }
    });
});

