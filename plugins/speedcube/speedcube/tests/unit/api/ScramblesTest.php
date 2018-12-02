<?php

namespace Speedcube\Speedcube\Tests\Unit\Api;

use Speedcube\Speedcube\Models\Scramble;
use Speedcube\Speedcube\Tests\PluginTestCase;

class ScramblesApiTest extends PluginTestCase
{
    public function test_creating_a_scramble()
    {
        $response = $this->post('/api/speedcube/speedcube/scrambles', [
            'puzzle' => 'cube3',
        ]);

        $response->assertStatus(200);

        $content = json_decode($response->getContent(), true);
        
        $this->assertEquals(1, Scramble::count());
    }
}
