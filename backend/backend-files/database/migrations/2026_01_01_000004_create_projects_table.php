<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category'); // Web Programming, Mobile Programming, Machine Learning, Data Analysis & Visualization, Interaction Design
            $table->string('summary')->nullable();
            $table->text('description')->nullable();
            $table->json('tools')->nullable();       // array of strings
            $table->json('key_results')->nullable(); // array of strings
            $table->string('thumbnail_path')->nullable();
            $table->json('gallery')->nullable();      // array of image paths
            $table->string('project_url')->nullable();
            $table->boolean('featured')->default(false);
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
