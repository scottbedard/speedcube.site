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
            'config' => '{"foo":"bar"}',
        ]);

        $response->assertStatus(200);

        $data = json_decode($response->getContent(), true);

        $model = KeyboardConfig::find($data['keyboardConfig']['id']);
        
        $this->assertEquals(1, KeyboardConfig::count());
        
        $this->assertEquals('{"foo":"bar"}', $model->config);
    }

    public function test_updating_a_keyboard_config()
    {
        $keyboardConfig = Factory::create(new KeyboardConfig, [
            'config' => '{"foo":"bar"}',
            'puzzle' => '3x3',
            'user_id' => $this->user->id,
        ]);

        $response = $this->post('/api/speedcube/speedcube/keyboardconfig', [
            'config' => '{"foo":"changed"}',
            'puzzle' => '3x3',
        ]);

        $response->assertStatus(200);

        $data = json_decode($response->getContent(), true);

        $model = KeyboardConfig::find($data['keyboardConfig']['id']);
        
        $this->assertEquals(1, KeyboardConfig::count());
        
        $this->assertEquals('{"foo":"changed"}', $model->config);
    }
}
