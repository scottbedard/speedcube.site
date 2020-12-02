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
        $user = Factory::create(new User);

        $foo1 = Factory::create(new Config, [
            'puzzle_id' => 1,
            'user_id' => $user->id,
        ]);

        $foo2 = Factory::create(new Config, [
            'puzzle_id' => 1,
            'user_id' => $user->id,
        ]);

        $bar1 = Factory::create(new Config, [
            'puzzle_id' => 2,
            'user_id' => $user->id,
        ]);

        $this->assertEquals(2, $user->configs->count());
        $this->assertTrue($user->configs->contains('id', $foo2->id));
        $this->assertTrue($user->configs->contains('id', $bar1->id));
    }
}
