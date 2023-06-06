<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJunidaijuseiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('junidaijusei', function (Blueprint $table) {
            $table->integer('junidaijusei_id');
            $table->char('junidaijusei', 8);
            $table->integer('point');
            $table->char('detail');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('junidaijusei');
    }
}
