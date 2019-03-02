
<?php


Route::prefix('api/speedcube/speedcube')
    ->middleware('web', 'Speedcube\Speedcube\Http\Middleware\CamelCase')
    ->group(function () {
        //
        // non-authenticated routes
        // any user may access these
        //

        // scrambles
        Route::post('scrambles', 'Speedcube\Speedcube\Http\Controllers\ScramblesController@create');

        // solves
        Route::get('solves/highlighted', 'Speedcube\Speedcube\Http\Controllers\SolvesController@highlighted');
        Route::post('solves/replay/{id}', 'Speedcube\Speedcube\Http\Controllers\SolvesController@replay');
        Route::get('solves/{id}', 'Speedcube\Speedcube\Http\Controllers\SolvesController@find');
        Route::get('solves', 'Speedcube\Speedcube\Http\Controllers\SolvesController@index');
        Route::post('solves', 'Speedcube\Speedcube\Http\Controllers\SolvesController@complete');

        // users
        Route::get('users', 'Speedcube\Speedcube\Http\Controllers\UsersController@index');
        Route::get('users/{username}/overview', 'Speedcube\Speedcube\Http\Controllers\UsersController@find');
        Route::get('users/{username}/solves', 'Speedcube\Speedcube\Http\Controllers\UsersController@solves');

        //
        // authenticated routes
        // to access these endpoints, the user must be signed in
        //
        Route::group(['middleware' => 'RainLab\User\Classes\AuthMiddleware'], function () {
            // config
            Route::get('config', 'Speedcube\Speedcube\Http\Controllers\ConfigController@index');
            Route::post('config', 'Speedcube\Speedcube\Http\Controllers\ConfigController@save');
            Route::post('keyboardconfig', 'Speedcube\Speedcube\Http\Controllers\KeyboardConfigController@save');
        });
    });
