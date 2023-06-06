<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCalIsohoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cal_isoho', function (Blueprint $table) {
            $table->integer('kanshi_id');
            $table->integer('1');
            $table->integer('2');
            $table->integer('3');
            $table->integer('4');
            $table->integer('5');
            $table->integer('6');
            $table->integer('7');
            $table->integer('8');
            $table->integer('9');
            $table->integer('10');
            $table->integer('11');
            $table->integer('12');
            $table->integer('13');
            $table->integer('14');
            $table->integer('15');
            $table->integer('16');
            $table->integer('17');
            $table->integer('18');
            $table->integer('19');
            $table->integer('20');
            $table->integer('21');
            $table->integer('22');
            $table->integer('23');
            $table->integer('24');
            $table->integer('25');
            $table->integer('26');
            $table->integer('27');
            $table->integer('28');
            $table->integer('29');
            $table->integer('30');
            $table->integer('31');
            $table->integer('32');
            $table->integer('33');
            $table->integer('34');
            $table->integer('35');
            $table->integer('36');
            $table->integer('37');
            $table->integer('38');
            $table->integer('39');
            $table->integer('40');
            $table->integer('41');
            $table->integer('42');
            $table->integer('43');
            $table->integer('44');
            $table->integer('45');
            $table->integer('46');
            $table->integer('47');
            $table->integer('48');
            $table->integer('49');
            $table->integer('50');
            $table->integer('51');
            $table->integer('52');
            $table->integer('53');
            $table->integer('54');
            $table->integer('55');
            $table->integer('56');
            $table->integer('57');
            $table->integer('58');
            $table->integer('59');
            $table->integer('60');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cal_isoho');
    }
}
