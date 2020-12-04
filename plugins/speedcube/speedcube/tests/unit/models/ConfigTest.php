<?php

namespace Speedcube\Speedcube\Tests\Unit\Http;

use Speedcube\Speedcube\Models\Config;
use Speedcube\Speedcube\Models\Solve;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class ConfigTest extends PluginTestCase
{
    public function test_create_deactives_old_configs_with_solves()
    {
        $config1 = Factory::create(new Config, [
            'puzzle_id' => 1,
            'user_id' => 1,
        ]);

        $this->assertTrue($config1->is_active);

        Factory::create(new Solve, ['config_id' => $config1->id]);

        $config2 = Factory::create(new Config, [
            'puzzle_id' => 1,
            'user_id' => 1,
        ]);

        $config1->reload();

        $this->assertFalse($config1->is_active);
        $this->assertTrue($config2->is_active);
    }

    public function test_create_deletes_old_configs_without_solves()
    {
        $config1 = Factory::create(new Config, [
            'puzzle_id' => 1,
            'user_id' => 1,
        ]);

        $config2 = Factory::create(new Config, [
            'puzzle_id' => 1,
            'user_id' => 1,
        ]);

        $this->assertEquals(1, Config::count());
        $this->assertEquals($config2->id, Config::first()->id);
    }
}
