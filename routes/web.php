<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// serve vite assets in development
if (app()->environment('local')) {
    Route::get('/src/{path}', function ($path) {
        return File::get(base_path('client/src') . '/' . $path);
    })->where('path', '.*');
}

Route::get('/', function () {
    return view('index');
});
