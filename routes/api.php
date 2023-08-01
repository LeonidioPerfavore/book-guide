<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;

/*
|--------------------------------------------------------------------------
|                                 API Routes
|--------------------------------------------------------------------------
|
*/

/** Author routes **/
Route::get('/author', [AuthorController::class, 'index']);
Route::get('/author/{id}', [AuthorController::class, 'show']);
Route::post('/author', [AuthorController::class, 'store']);
Route::put('/author', [AuthorController::class, 'update']);
Route::delete('/author', [AuthorController::class, 'destroy']);

/** Book routes **/
Route::get('/book', [BookController::class, 'index']);
Route::get('/book/{id}', [BookController::class, 'show']);
Route::post('/book', [BookController::class, 'store']);
Route::post('/book/update', [BookController::class, 'update']);
Route::delete('/book', [BookController::class, 'destroy']);

