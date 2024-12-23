<?php



use Illuminate\Support\Facades\Route;

Route::get('/401', function () {
    return response()->json(["message" => "401"],401);
})->name('login');
