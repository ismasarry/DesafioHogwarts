<?php
//isamel sarrion
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePocionesTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pociones', function (Blueprint $table) {
            $table->id(); 
          
            $table->string('nombre');
            $table->string('descripcion')->nullable();
            $table->string('estadisticas')->nullable(); 
            $table->unsignedBigInteger('idUsuario'); 
            $table->foreign('idUsuario')->references('id')->on('usuario')->onDelete('cascade');
            $table->string('foto')->nullable(); 
            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pociones');
    }
}
