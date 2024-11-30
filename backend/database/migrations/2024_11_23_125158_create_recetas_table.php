<?php
//isamel sarrion
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecetasTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recetas', function (Blueprint $table) {
            $table->id(); 
            $table->unsignedBigInteger('idPocion');
            $table->unsignedBigInteger('idIngrediente');
            $table->timestamps();
            $table->foreign('idPocion')->references('id')->on('pociones')->onDelete('cascade');
            $table->foreign('idIngrediente')->references('id')->on('ingredientes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recetas');
    }
}
