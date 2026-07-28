<?php

use App\Http\Controllers\NodeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [NodeController::class, 'index'])->name('home');

Route::resource('nodes', NodeController::class)->only(['show', 'store', 'update', 'destroy']);
Route::post('nodes/{node}/move', [NodeController::class, 'move'])->name('nodes.move');
Route::get('search', [NodeController::class, 'search'])->name('search');
