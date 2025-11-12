<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view("welcome");
});
Route::get('/user', function () {
    return view("user");
});

Route::get('/{any}', function () {
    return view("user");
})->where('any', '.*');