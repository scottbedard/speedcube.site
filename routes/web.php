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
        Route::post('login', [AuthController::class, 'login']);
        Route::any('logout', [AuthController::class, 'logout']);
    });

    // users
    Route::middleware('auth')->group(function () {
        Route::post('users/{id}', [UsersController::class, 'update']);
    });

    Route::middleware('guest')->group(function () {
        Route::post('users', [UsersController::class, 'store']);
        Route::post('users/forgot-password', [UsersController::class, 'forgotPassword']);
        Route::post('users/reset-password', [UsersController::class, 'resetPassword']);
    });
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

Route::get('/reset-password/{token}', [ClientController::class, 'index'])
    ->middleware('guest')
    ->name('password.reset');
