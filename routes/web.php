<?php

use App\Http\Controllers\NodeController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;

// Public Pages
Route::get('/', function () {
    return \Inertia\Inertia::render('Welcome');
})->name('home');

Route::get('/terms', function () {
    return \Inertia\Inertia::render('Terms');
})->name('terms');

Route::get('/privacy', function () {
    return \Inertia\Inertia::render('Privacy');
})->name('privacy');

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('login', [AuthController::class, 'login']);
    Route::get('register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('register', [AuthController::class, 'register']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    // Dashboard - Moved from / to /{username}
    Route::get('/{user:username}', [ProjectController::class, 'index'])->name('dashboard');
    Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');

    Route::prefix('{user:username}/{project:slug}')->group(function () {
        Route::get('/', [ProjectController::class, 'show'])->name('projects.show');
        Route::delete('/', [ProjectController::class, 'destroy'])->name('projects.destroy');
        
        Route::post('nodes', [NodeController::class, 'store'])->name('nodes.store');
        Route::get('nodes/{node}', [NodeController::class, 'show'])->name('nodes.show');
        Route::put('nodes/{node}', [NodeController::class, 'update'])->name('nodes.update');
        Route::delete('nodes/{node}', [NodeController::class, 'destroy'])->name('nodes.destroy');
        Route::post('nodes/{node}/move', [NodeController::class, 'move'])->name('nodes.move');
        Route::get('search', [NodeController::class, 'search'])->name('search');
    });
});
