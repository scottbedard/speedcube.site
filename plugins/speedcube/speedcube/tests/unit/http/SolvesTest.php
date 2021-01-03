<?php

namespace Speedcube\Speedcube\Tests\Unit\Http;

use Speedcube\Speedcube\Models\Solve;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class SolvesTest extends PluginTestCase
{
    public function test_create_solve_guest_success()
    {
        $response = $this->postJson('/api/speedcube/speedcube/solves', [
            'puzzleId' => 1,
        ]);

        $response->assertStatus(200);

        $data = json_decode($response->getContent(), true);

        $this->assertEquals(1, Solve::count());
        $this->assertEquals(0, $data['model']['configId']);
        $this->assertEquals(0, $data['model']['userId']);
        $this->assertEquals(1, $data['model']['puzzleId']);
    }
}