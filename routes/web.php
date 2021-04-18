<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\PuzzleConfigsController;
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

    // puzzle configs
    Route::middleware('auth')->group(function () {
        Route::post('puzzle-configs', [PuzzleConfigsController::class, 'store']);
    });

    // users
    Route::middleware('guest')->group(function () {
        Route::post('users/forgot-password', [UsersController::class, 'forgotPassword']);
        Route::post('users/reset-password', [UsersController::class, 'resetPassword']);
        Route::post('users', [UsersController::class, 'store']);
    });

    Route::middleware('auth')->group(function () {
        Route::post('users/{id}', [UsersController::class, 'update']);
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
