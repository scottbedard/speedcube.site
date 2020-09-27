<?php

namespace Database\Tester\Updates;

use October\Rain\Database\Updates\Migration;
use Schema;

class CreateCountriesTable extends Migration
{
    public function up()
    {
        Schema::create('database_tester_countries', function ($table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('database_tester_countries');
    }
}
