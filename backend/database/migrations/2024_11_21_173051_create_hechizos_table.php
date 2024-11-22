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
        Schema::create('hechizos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('estadisticas');
            $table->integer('idUsuario');
            //$table->unsignedBigInteger('idUsuario');
            $table->integer('nivel');
            $table->boolean('veri');
            //$table->foreign('idUsuario')->references('id')->on('usuario')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hechizos');
    }
};
