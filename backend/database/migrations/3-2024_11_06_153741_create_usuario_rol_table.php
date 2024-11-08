<?php
//ismael sarrion
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
        Schema::create('usuario_rol', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idRol');
            $table->unsignedBigInteger('idUsuario');
            $table->foreign('idRol')->references('id')->on('roles')->onDelete('cascade');
            $table->foreign('idUsuario')->references('id')->on('usuario')->onDelete('cascade');
            $table->timestamps();
            $table->rememberToken();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuario_rol');
    }
};
