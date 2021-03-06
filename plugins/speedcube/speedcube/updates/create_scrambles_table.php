<?php

namespace Speedcube\Speedcube\Updates;

use October\Rain\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;
use Schema;

class CreateScramblesTable extends Migration
{
    public function up()
    {
        // 1.0.0
        Schema::create('speedcube_speedcube_scrambles', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('puzzle', 10)->index();
            $table->text('scramble');
            $table->text('scrambled_state');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('speedcube_speedcube_scrambles');
    }
}
