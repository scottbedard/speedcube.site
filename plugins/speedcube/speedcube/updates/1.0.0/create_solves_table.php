<?php

namespace Speedcube\Speedcube\Updates;

use October\Rain\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;
use Schema;

class CreateSolvesTable extends Migration
{
    public function up()
    {
        Schema::create('speedcube_speedcube_solves', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('user_id')->nullable()->unsigned()->index();
            $table->integer('scramble_id')->nullable()->unsigned()->index();
            $table->integer('time')->default(0)->unsigned()->index();
            $table->integer('moves')->default(0)->unsigned()->index();
            $table->integer('average_speed')->default(0)->unsigned();
            $table->text('config');
            $table->text('solution');
            $table->enum('status', ['complete', 'dnf', 'error', 'invalid', 'pending'])->default('pending')->index();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('speedcube_speedcube_solves');
    }
}
