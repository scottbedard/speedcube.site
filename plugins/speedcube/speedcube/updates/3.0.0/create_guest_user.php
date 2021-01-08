<?php

namespace Speedcube\Speedcube\Updates;

use Config;
use Illuminate\Support\Str;
use October\Rain\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;
use RainLab\User\Models\User;
use Schema;

class CreateGuestUser extends Migration
{
    public function up()
    {
        \Config::set('rainlab.user::minPasswordLength', 8);

        $user = User::firstOrNew([
            'username' => 'guest',
        ]);

        $password = Str::random(40);

        $user->email = 'guest@speedcube.site';
        $user->id = 0;
        $user->name = 'Guest';
        $user->password = $password;
        $user->password_confirmation = $password;

        $user->forceSave();
    }

    public function down()
    {
    }
}
