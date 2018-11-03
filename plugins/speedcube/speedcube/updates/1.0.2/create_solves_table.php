<?php namespace Speedcube\Speedcube\Updates;

use Schema;
use October\Rain\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;

class CreateSolvesTable extends Migration
{
    public function up()
    {
        Schema::create('speedcube_speedcube_solves', function(Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('user_id')->nullable()->unsigned()->index();
            $table->text('config');
            $table->tinyInteger('size')->unsigned()->index();
            $table->text('scramble');
            $table->integer('time')->default(0)->unsigned()->index();
            $table->text('solution');
            $table->string('comment')->default('');
            $table->boolean('is_solved')->default(false)->index();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('speedcube_speedcube_solves');
    }
}
