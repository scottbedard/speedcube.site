<?php namespace Speedcube\Speedcube\Updates;

use Schema;
use October\Rain\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;

class CreatePersonalRecordsTable extends Migration
{
    public function up()
    {
        Schema::create('speedcube_speedcube_personal_records', function(Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('solve_id')->unsigned()->index();
            $table->integer('user_id')->unsigned()->index();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('speedcube_speedcube_personal_records');
    }
}
