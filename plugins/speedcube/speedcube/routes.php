<?php

Route::middleware('web')->group(function () {
    //
    // api
    //
    Route::group([
        'middleware' => 'Speedcube\Speedcube\Http\Middleware\TransformKeys',
        'prefix' => 'api/speedcube/speedcube',
    ], function () {

        //
        // auth
        //
        Route::group([
            'middleware' => 'RainLab\User\Classes\AuthMiddleware',
        ], function () {
            Route::post('configs', 'Speedcube\Speedcube\Http\Controllers\ConfigsController@create');
        });
    });

    //
    // client
    //
    Route::get('{all}', 'Speedcube\Speedcube\Http\Controllers\SpaController@index')
        ->where('all', '^(?!api|backend).*$');
});
