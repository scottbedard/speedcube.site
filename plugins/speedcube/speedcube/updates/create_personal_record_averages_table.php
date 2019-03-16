<?php namespace Speedcube\Speedcube\Updates;

use Schema;
use October\Rain\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;

class CreatePersonalRecordAveragesTable extends Migration
{
    public function up()
    {
        Schema::create('speedcube_speedcube_personal_record_averages', function(Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index();
            $table->integer('previous_id')->nullable()->unsigned()->index();
            $table->string('puzzle', 10)->index();
            $table->integer('average_time')->unsigned();
            $table->timestamps();
        });

        Schema::create('speedcube_speedcube_personal_record_average_solve', function(Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->integer('personal_record_average_id')->unsigned();
            $table->integer('solve_id')->unsigned();
            $table->primary(['personal_record_average_id', 'solve_id'], 'average_solve_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('speedcube_speedcube_personal_record_averages');
        Schema::dropIfExists('speedcube_speedcube_personal_record_average_solve');
    }
}
