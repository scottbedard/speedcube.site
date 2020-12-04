<?php

namespace Speedcube\Speedcube\Updates;

use Schema;
use October\Rain\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;

class CreateConfigsTable extends Migration
{
    public function up()
    {
        Schema::create('speedcube_speedcube_configs', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->tinyInteger('puzzle_id')->unsigned()->index();
            $table->integer('user_id')->unsigned()->index();
            $table->boolean('is_active')->index();
            $table->text('data');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('speedcube_speedcube_configs');
    }
}
