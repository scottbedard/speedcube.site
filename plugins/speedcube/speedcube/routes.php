<?php

use Speedcube\Speedcube\Http\Controllers\ConfigsController;
use Speedcube\Speedcube\Http\Controllers\SpaController;

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
            Route::get('configs', [ConfigsController::class, 'index']);
            Route::post('configs', [ConfigsController::class, 'create']);
        });
    });

    //
    // client
    //
    Route::get('{all}', [SpaController::class, 'index'])
        ->where('all', '^(?!api|backend).*$');
});
