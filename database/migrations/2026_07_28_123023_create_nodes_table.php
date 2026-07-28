<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nodes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->nullable()->constrained('nodes')->nullOnDelete();
            $table->string('name');
            $table->string('type')->default('page');
            $table->string('icon')->nullable();
            $table->longText('content')->nullable();
            $table->json('meta')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_trashed')->default(false);
            $table->timestamps();

            $table->index(['parent_id', 'sort_order']);
            $table->index('type');
            $table->fullText(['name', 'content']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nodes');
    }
};
