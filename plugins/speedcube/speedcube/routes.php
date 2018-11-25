
<?php

use Speedcube\Speedcube\Http\Middleware\CamelCase;

Route::prefix('api/speedcube/speedcube')
    ->middleware('web', 'Speedcube\Speedcube\Http\Middleware\CamelCase')
    ->group(function() {
        //
        // non-authenticated routes
        // any user may access these
        //
        Route::post('solves', 'Speedcube\Speedcube\Http\Controllers\SolvesController@create');
        
        //
        // authenticated routes
        // to access these endpoints, the user must be signed in
        //
        Route::group(['middleware' => 'RainLab\User\Classes\AuthMiddleware'], function() {
            // config
            Route::get('config', 'Speedcube\Speedcube\Http\Controllers\ConfigController@index');
            Route::post('config', 'Speedcube\Speedcube\Http\Controllers\ConfigController@save');
        });
    });