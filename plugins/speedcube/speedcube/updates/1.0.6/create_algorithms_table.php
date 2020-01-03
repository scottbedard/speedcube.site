<?php namespace Speedcube\Speedcube\Updates;

use Schema;
use October\Rain\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;

class CreateAlgorithmsTable extends Migration
{
    public function up()
    {
        Schema::create('speedcube_speedcube_algorithms', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('added_by')->nullable()->unsigned()->index();
            $table->string('algorithm');
            $table->text('scrambled_state');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('speedcube_speedcube_algorithms');
    }
}
