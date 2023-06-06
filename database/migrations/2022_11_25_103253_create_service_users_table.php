<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiceUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('service_users', function (Blueprint $table) {
            $table->char('id', 10);
            $table->char('name', 50);
            $table->char('email', 50);
            $table->char('user_id', 50);
            $table->char('password', 50);
            $table->timestamp('registration_time')->useCurrentOnUpdate()->useCurrent();
            $table->boolean('account_enabled')->nullable();
            $table->timestamp('invalid_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('service_users');
    }
}
