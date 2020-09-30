<?php

Route::middleware('web')->group(function () {
    Route::get('{all}', 'Speedcube\Speedcube\Http\Controllers\SpaController@index')
        ->where('all', '^(?!api|backend).*$');
});
