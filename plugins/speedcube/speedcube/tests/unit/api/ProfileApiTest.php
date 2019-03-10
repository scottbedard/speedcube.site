<?php

namespace Speedcube\Speedcube\Tests\Unit\Api;

use Auth;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class ProfileApiTest extends PluginTestCase
{
    public function test_updating_a_users_twitter_profile()
    {
        // create and authenticate a user
        $user = Factory::registerUser();

        Auth::login($user);
        
        // update the user's twitter profile
        $response = $this->post('/api/speedcube/speedcube/profile/twitter', [
            'broadcasting' => false,
            'handle' => 'speedcubesite',
        ]);

        $response->assertStatus(200);

        $this->assertEquals(false, $user->profile->twitter_broadcasting);
        $this->assertEquals('speedcubesite', $user->profile->twitter_handle);
    }
}