<?php

namespace Speedcube\Speedcube\Tests\Unit\Api;

use Auth;
use Speedcube\Speedcube\Models\KeyboardConfig;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class KeyboardConfigApiTest extends PluginTestCase
{
    public function setUp()
    {
        parent::setUp();

        // all of these routes require authentication, so we're
        // creating a user and authenticating before each test
        $this->user = Factory::registerUser();

        Auth::login($this->user);
    }

    public function test_creating_a_keyboard_config()
    {
        $response = $this->post('/api/speedcube/speedcube/keyboardconfig', [
            'puzzle' => 'test',
            'config' => [
                'hello' => 'world',
            ],
        ]);

        $response->assertStatus(200);

        $data = json_decode($response->getContent(), true);

        $model = KeyboardConfig::find($data['keyboardConfig']['id']);
        
        $this->assertEquals(1, KeyboardConfig::count());
        
        $this->assertEquals('world', $model->config['hello']);
    }
}
