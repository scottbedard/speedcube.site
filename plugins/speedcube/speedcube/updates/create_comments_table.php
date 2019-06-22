<?php namespace Speedcube\Speedcube\Updates;

use Schema;
use October\Rain\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;

class CreateCommentsTable extends Migration
{
    public function up()
    {
        Schema::create('speedcube_speedcube_comments', function(Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->morphs('commentable');
            $table->integer('user_id')->unsigned();
            $table->text('body');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('speedcube_speedcube_comments');
    }
}
