<?php

namespace Speedcube\Speedcube\Tests\Unit\Http;

use RainLab\User\Models\User;
use Speedcube\Speedcube\Models\Config;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class UserTest extends PluginTestCase
{
    public function test_configs_relationship()
    {
        $user1 = Factory::create(new User);
        $user2 = Factory::create(new User);

        $foo1 = Factory::create(new Config, [
            'puzzle_id' => 1,
            'user_id' => $user1->id,
        ]);

        $foo2 = Factory::create(new Config, [
            'puzzle_id' => 1,
            'user_id' => $user1->id,
        ]);

        $foo3 = Factory::create(new Config, [
            'puzzle_id' => 1,
            'user_id' => $user2->id,
        ]);

        $bar1 = Factory::create(new Config, [
            'puzzle_id' => 2,
            'user_id' => $user1->id,
        ]);

        $this->assertEquals(2, $user1->configs->count());
        $this->assertTrue($user1->configs->contains('id', $foo2->id));
        $this->assertTrue($user1->configs->contains('id', $bar1->id));

        $this->assertEquals(1, $user2->configs->count());
        $this->assertTrue($user2->configs->contains('id', $foo3->id));
    }
}
