<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIjouKanshiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ijou_kanshi', function (Blueprint $table) {
            $table->integer('ijou_kanshi_id');
            $table->integer('kanshi_id');
            $table->char('ijou_kanshi', 50);
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
        Schema::dropIfExists('ijou_kanshi');
    }
}
