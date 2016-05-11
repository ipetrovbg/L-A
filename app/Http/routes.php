<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::get('{all}', function () { 
    return View::make('welcome'); 
});

Route::get('/', 'firstController@index');

Route::post('/getEmail', 'userController@getEmail');
Route::post('/register', 'userController@register');
Route::post('/login', 'userController@login');
Route::post('/isAuth', 'userController@isAuth');
Route::post('/logout', 'userController@logout');
Route::post('/getUserLocations', 'locationController@getUserLocations');
Route::post('/insertLocation', 'locationController@insertLocation');
Route::post('/upload', 'FileUpload@upload');