<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKanshiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kanshi', function (Blueprint $table) {
            $table->integer('kanshi_id');
            $table->char('kanshi', 6);
            $table->integer('tenkan');
            $table->integer('chishi');
            $table->integer('tenchusatsu');
            $table->char('explanation');
            $table->char('detail');
            $table->integer('gou_id');
            $table->integer('ijou_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kanshi');
    }
}
