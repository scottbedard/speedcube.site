<?php

Route::get('{all}', 'Speedcube\Speedcube\Http\Controllers\SpaController@index')
    ->where('all', '^(?!api|backend).*$');
