<?php

namespace Speedcube\Speedcube\Tests\Unit\Api;

use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class PuzzleConfigsTest extends PluginTestCase
{
    public function test_create_success()
    {
        $user = Factory::authenticatedUser();

        $response = $this->postJson('/api/speedcube/speedcube/puzzleconfigs', [
            'puzzleId' => 1,
            'json' => ['foo' => 'bar'],
        ]);
        
        $response->assertStatus(200);

        $data = json_decode($response->getContent(), true);
        
        $this->assertEquals(1, $data['model']['puzzleId']);
        $this->assertEquals(1, $user->puzzleConfigs()->count());
        $this->assertEquals(['foo' => 'bar'], $data['model']['json']);
    }

    public function test_create_forbidden()
    {
        $response = $this->postJson('/api/speedcube/speedcube/puzzleconfigs', [
            'puzzleId' => 1,
            'json' => [],
        ]);

        $response->assertStatus(403);
    }
}
