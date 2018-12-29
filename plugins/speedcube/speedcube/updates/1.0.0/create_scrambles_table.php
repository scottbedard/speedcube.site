<?php namespace Speedcube\Speedcube\Updates;

use Schema;
use October\Rain\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;

class CreateScramblesTable extends Migration
{
    public function up()
    {
        Schema::create('speedcube_speedcube_scrambles', function(Blueprint $table) {
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
