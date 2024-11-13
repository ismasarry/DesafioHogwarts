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
        Schema::create('asignaturaProfesor', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idAsignatura');
            $table->unsignedBigInteger('idProfesor');
            $table->foreign('idAsignatura')->references('id')->on('asignatura')->onDelete('cascade');
            $table->foreign('idProfesor')->references('id')->on('usuario')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asignaturaProfesor');
    }
};
