<?php
//Raul Gutierrez
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
        Schema::create('turno_duelo', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idDuelo');
            $table->integer('turno');
            $table->unsignedBigInteger('idHechizoUsadoUsuario');
            $table->unsignedBigInteger('idHechizoUsadoBot');
            $table->boolean('ganador');
            $table->foreign('idDuelo')->references('id')->on('duelo')->onDelete('cascade');
            $table->foreign('idHechizoUsadoUsuario')->references('id')->on('hechizos')->onDelete('cascade');
            $table->foreign('idHechizoUsadoBot')->references('id')->on('hechizos')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('turno_duelo');
    }
};
