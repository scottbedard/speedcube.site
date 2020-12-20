<?php

namespace Speedcube\Speedcube\Tests\Unit\Http;

use Speedcube\Speedcube\Models\KeyboardConfig;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class KeyboardConfigsTest extends PluginTestCase
{
    public function test_keyboard_config_save_success()
    {
        $user = Factory::authenticatedUser();

        // first request should create 
        $create = $this->postJson('/api/speedcube/speedcube/keyboardconfigs', [
            'data' => ['a' => 'b'],
            'puzzleId' => 1,
        ]);

        $create->assertStatus(200);
        $createModel = $user->keyboardConfigs()->wherePuzzleId(1)->first();
        $this->assertEquals(1, $user->keyboardConfigs()->count());
        $this->assertEquals(['a' => 'b'], $createModel->data);

        // subsequent requests should update
        $update = $this->postJson('/api/speedcube/speedcube/keyboardconfigs', [
            'data' => ['c' => 'd'],
            'puzzleId' => 1,
        ]);

        $update->assertStatus(200);
        $updateModel = $user->keyboardConfigs()->wherePuzzleId(1)->first();
        $this->assertEquals(1, $user->keyboardConfigs()->count());
        $this->assertEquals(['c' => 'd'], $updateModel->data);
    }

    public function test_keyboard_configs_save_forbidden()
    {
        $response = $this->postJson('/api/speedcube/speedcube/keyboardconfigs', [
            'data' => [],
            'puzzleId' => 1,
        ]);

        $response->assertStatus(403);
    }
}
