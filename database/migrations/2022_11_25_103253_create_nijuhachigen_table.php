<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNijuhachigenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nijuhachigen', function (Blueprint $table) {
            $table->integer('kanshi_id');
            $table->integer('shogen');
            $table->integer('chugen');
            $table->integer('hongen');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nijuhachigen');
    }
}
