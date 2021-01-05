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
            $table->integer('config_id')->unsigned()->index();
            $table->tinyInteger('puzzle_id')->unsigned()->index();
            $table->integer('user_id')->unsigned()->index();
            $table->text('scramble');
            $table->text('scrambled_state');
            $table->text('solution');
            $table->enum('status', [
                'complete',
                'dnf',
                'error',
                'pending',
            ])->default('pending')->index();
            $table->timestamps();
            $table->dateTime('closed_at')->nullable()->index();
        });
    }

    public function down()
    {
        Schema::dropIfExists('speedcube_speedcube_solves');
    }
}
