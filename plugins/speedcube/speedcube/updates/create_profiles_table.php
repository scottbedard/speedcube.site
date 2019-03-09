<?php

namespace Speedcube\Speedcube\Updates;

use October\Rain\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;
use RainLab\User\Models\User;
use Schema;
use Speedcube\Speedcube\Models\Profile;

class CreateProfilesTable extends Migration
{
    public function up()
    {
        // 1.0.2
        Schema::create('speedcube_speedcube_profiles', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index();
            $table->boolean('twitter_broadcasting')->default(true);
            $table->string('twitter_handle', 50)->default('');
            $table->timestamps();
        });

        // create a profile for any existing user
        User::all()->each(function ($user) {
            Profile::create(['user_id' => $user->id]);
        });
    }

    public function down()
    {
        Schema::dropIfExists('speedcube_speedcube_profiles');
    }
}
