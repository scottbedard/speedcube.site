<?php

namespace Speedcube\Speedcube\Tests\Unit\Models;

use RainLab\User\Models\User;
use Speedcube\Speedcube\Models\Profile;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class UserTest extends PluginTestCase
{
    public function test_a_profile_is_created_for_new_users_and_cleaned_up_when_deleted()
    {
        $user = Factory::registerUser();

        $this->assertEquals(1, Profile::count());
        $this->assertEquals($user->id, $user->profile->user_id);

        $user->delete();
        
        $this->assertEquals(0, Profile::count());
    }
}
