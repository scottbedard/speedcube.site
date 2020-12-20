<?php

namespace Speedcube\Speedcube\Tests\Unit\Http;

use Speedcube\Speedcube\Models\KeyboardConfig;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class KeyboardConfigsTest extends PluginTestCase
{
    public function test_keyboard_config_create_success()
    {
        $user = Factory::authenticatedUser();

        $response = $this->postJson('/api/speedcube/speedcube/keyboardconfigs', [
            'data' => ['foo' => 'bar'],
            'puzzleId' => 1,
        ]);

        $response->assertStatus(200);

        $data = json_decode($response->getContent(), true);

        $this->assertEquals(1, $data['model']['puzzleId']);
        $this->assertEquals(1, $user->keyboardConfigs()->count());
        $this->assertEquals(['foo' => 'bar'], $data['model']['data']);
    }

    public function test_keyboard_configs_create_forbidden()
    {
        $response = $this->postJson('/api/speedcube/speedcube/keyboardconfigs', [
            'data' => [],
            'puzzleId' => 1,
        ]);

        $response->assertStatus(403);
    }
}
