<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\UsersController;
use App\Http\Middleware\TransformKeys;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/**
 * Web API
 *
 * These routes are for stateful pieces of our API. The main difference
 * between these and our "api" routes is that these have access to sessions.
 */
Route::prefix('api')->middleware(TransformKeys::class)->group(function () {
    // auth
    Route::prefix('auth')->group(function () {
        Route::any('logout', [AuthController::class, 'logout']);
        Route::post('login', [AuthController::class, 'login']);
    });

    // users
    Route::apiResource('users', UsersController::class);
});

/**
 * Development assets
 */
if (app()->environment('local')) {
    Route::get('/src/{path}', [ClientController::class, 'vite'])->where('path', '.*');
}

/**
 * Single page application
 */
Route::get('/{path}', [ClientController::class, 'index'])->where('path', '.*');
