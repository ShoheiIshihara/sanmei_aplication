<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGaihoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gaiho', function (Blueprint $table) {
            $table->integer('gaiho');
            $table->char('houkou', 4);
            $table->char('gozou_notice', 8);
            $table->char('gozou_oshirase', 50);
            $table->char('roppu', 8);
            $table->char('roppu_notice', 50);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gaiho');
    }
}
