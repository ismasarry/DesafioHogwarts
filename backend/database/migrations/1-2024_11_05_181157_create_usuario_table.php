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
        Schema::create('usuario', function (Blueprint $table) {
            $table->id(); 
            $table->string('nombre');
            $table->string('gmail')->unique();
            $table->string('contrasena');
            $table->integer('idCasa');
            $table->integer('nivel')->default(1);
            $table->integer('exp')->default(0);
            $table->string('foto')->nullable();
            $table->boolean('activo')->default(true);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuario');
    }
};
