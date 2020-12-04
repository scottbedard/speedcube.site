<?php

namespace Speedcube\Speedcube\Tests\Unit\Http;

use Speedcube\Speedcube\Models\Config;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class ConfigsTest extends PluginTestCase
{
    public function test_configs_create_success()
    {
        $user = Factory::authenticatedUser();

        $response = $this->postJson('/api/speedcube/speedcube/configs', [
            'data' => ['foo' => 'bar'],
            'puzzleId' => 1,
        ]);
        
        $response->assertStatus(200);

        $data = json_decode($response->getContent(), true);
        
        $this->assertEquals(1, $data['model']['puzzleId']);
        $this->assertEquals(1, $user->configs()->count());
        $this->assertEquals(['foo' => 'bar'], $data['model']['data']);
    }

    public function test_configs_create_forbidden()
    {
        $response = $this->postJson('/api/speedcube/speedcube/configs', [
            'data' => [],
            'puzzleId' => 1,
        ]);

        $response->assertStatus(403);
    }

    public function test_configs_index_success()
    {
        $user = Factory::authenticatedUser();

        $config = Factory::create(new Config, [
            'puzzle_id' => 1,
            'user_id' => $user->id,
        ]);

        $response = $this->get('/api/speedcube/speedcube/configs');

        $response->assertStatus(200);

        $data = json_decode($response->getContent(), true);

        $this->assertEquals($config->id, $data['configs'][0]['id']);
    }

    public function test_configs_index_forbidden()
    {
        $response = $this->get('/api/speedcube/speedcube/configs');

        $response->assertStatus(403);
    }
}
