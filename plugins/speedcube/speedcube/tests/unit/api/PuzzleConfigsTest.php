<?php

namespace Speedcube\Speedcube\Tests\Unit\Api;

use Speedcube\Speedcube\Tests\PluginTestCase;

class PuzzleConfigsTest extends PluginTestCase
{
    public function test_create_forbidden()
    {
        $response = $this->postJson('/api/speedcube/speedcube/puzzleconfigs', [
            'puzzle_id' => 1,
            'json' => [],
        ]);

        $response->assertStatus(403);
    }
}
