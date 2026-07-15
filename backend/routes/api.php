<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SkillController;
use Illuminate\Support\Facades\Route;

// ---- Public routes (viewer side) ----
Route::get('/profile', [ProfileController::class, 'show']);
Route::get('/skills', [SkillController::class, 'index']);
Route::get('/experiences', [ExperienceController::class, 'index']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);
Route::post('/contact', [MessageController::class, 'store']);

Route::post('/login', [AuthController::class, 'login']);

// ---- Admin routes (protected) ----
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::post('/profile', [ProfileController::class, 'update']);

    Route::post('/skills', [SkillController::class, 'store']);
    Route::put('/skills/{skill}', [SkillController::class, 'update']);
    Route::delete('/skills/{skill}', [SkillController::class, 'destroy']);

    Route::post('/experiences', [ExperienceController::class, 'store']);
    Route::put('/experiences/{experience}', [ExperienceController::class, 'update']);
    Route::delete('/experiences/{experience}', [ExperienceController::class, 'destroy']);

    Route::post('/projects', [ProjectController::class, 'store']);
    Route::post('/projects/{project}', [ProjectController::class, 'update']); // POST for multipart file upload support
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

    Route::get('/messages', [MessageController::class, 'index']);
    Route::patch('/messages/{message}/read', [MessageController::class, 'markRead']);
    Route::delete('/messages/{message}', [MessageController::class, 'destroy']);
});
