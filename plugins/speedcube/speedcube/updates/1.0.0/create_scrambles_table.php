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
            $table->integer('solve_id')->nullable()->unsigned()->index();
            $table->tinyInteger('cube_size')->unsigned()->index();
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
