<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSolvesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('solves', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable()->unsigned()->index();
            $table->integer('puzzle_config_id')->nullable()->unsigned()->index();
            $table->tinyInteger('puzzle_id')->default(0)->unsigned()->index();
            $table->text('scramble');
            $table->text('solution');
            $table->integer('time')->default(0)->unsigned()->index();
            $table->smallInteger('turns')->default(0)->unsigned()->index();
            $table->integer('turn_speed')->default(0)->unsigned();
            $table->integer('idle_time')->default(0)->unsigned();
            $table->enum('status', ['pending', 'complete', 'dnf'])->default('pending')->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('solves');
    }
}
