<?php

Route::middleware('web')->group(function () {
    //
    // api
    //
    Route::prefix('api/speedcube/speedcube')->group(function () {

        //
        // auth
        //
        Route::group(['middleware' => 'RainLab\User\Classes\AuthMiddleware'], function () {
            Route::post('puzzleconfigs', 'Speedcube\Speedcube\Http\Controllers\PuzzleConfigsController@create');
        });
    });

    //
    // client
    //
    Route::get('{all}', 'Speedcube\Speedcube\Http\Controllers\SpaController@index')
        ->where('all', '^(?!api|backend).*$');
});
