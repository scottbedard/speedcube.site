<?php


use Illuminate\Support\Facades\Auth;
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

$local = app()->environment('local');

// serve vite assets in development
if ($local) {
    Route::get('/src/{path}', function ($path) {
        return File::get(base_path('client/src') . '/' . $path);
    })->where('path', '.*');
}

// catch-all route for single page application
Route::get('/{path}', function () use ($local) {
    $manifest = json_decode(File::get(public_path('dist/manifest.json')), true);

    return view('index', [
        'context' => json_encode([
            'user' => Auth::user(),
        ]),
        'local' => $local,
        'manifest' => $manifest,
    ]);
})->where('path', '.*');
