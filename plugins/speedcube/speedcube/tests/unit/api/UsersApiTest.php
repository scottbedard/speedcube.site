<?php

namespace Speedcube\Speedcube\Tests\Unit\Api;

use Auth;
use RainLab\User\Models\User;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class UsersApiTest extends PluginTestCase
{
    // helper command to scaffold users
    public static function createUsers($count)
    {
        for ($x = 0; $x < $count; $x++) {
            Factory::registerUser();
        }
    }

    public function test_getting_users()
    {
        self::createUsers(10);

        $response = $this->get('/api/speedcube/speedcube/users?orderBy=id,desc&skip=2&take=5');

        $response->assertStatus(200);

        $data = json_decode($response->getContent(), true);

        // test that pagination worked
        $this->assertEquals(10, $data['pagination']['totalUsers']);
        $this->assertEquals(2, $data['pagination']['totalPages']);
        $this->assertEquals(5, $data['pagination']['pageSize']);
        $this->assertEquals(5, count($data['users']));

        // test that skipping and sorting worked
        $this->assertEquals(8, $data['users'][0]['id']);
        $this->assertEquals(4, $data['users'][4]['id']);
    }
}
