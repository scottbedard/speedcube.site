<?php

use Speedcube\Speedcube\Http\Controllers\ConfigsController;
use Speedcube\Speedcube\Http\Controllers\KeyboardConfigsController;
use Speedcube\Speedcube\Http\Controllers\SolvesController;
use Speedcube\Speedcube\Http\Controllers\SpaController;

Route::middleware('web')->group(function () {
    //
    // api
    //
    Route::group([
        'middleware' => 'Speedcube\Speedcube\Http\Middleware\TransformKeys',
        'prefix' => 'api/speedcube/speedcube',
    ], function () {
        // solves
        Route::post('solves', [SolvesController::class, 'create']);

        //
        // auth required
        //
        Route::group([
            'middleware' => 'RainLab\User\Classes\AuthMiddleware',
        ], function () {
            // configs
            Route::get('configs', [ConfigsController::class, 'index']);
            Route::post('configs', [ConfigsController::class, 'create']);

            // keyboard configs
            Route::post('keyboardconfigs', [KeyboardConfigsController::class, 'save']);
        });
    });

    //
    // client
    //
    Route::get('{all}', [SpaController::class, 'index'])
        ->where('all', '^(?!api|backend|_debugbar).*$');
});
