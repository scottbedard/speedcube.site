<?php

namespace Speedcube\Speedcube\Tests\Unit\Api;

use Auth;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class ConfigApiTest extends PluginTestCase
{
    public function test_creating_a_config()
    {
        $user = Factory::registerUser();

        Auth::login($user);
        
        $response = $this->post('/api/speedcube/speedcube/config', [
            'puzzle' => 'test',
            'config' => [
                'hello' => 'world',
            ],
        ]);

        $response->assertStatus(200);

        $config = $user->configs()->first();

        $data = json_decode($response->getContent(), true);

        $this->assertEquals(1, $user->configs()->count());
        $this->assertEquals($config->id, $data['configs'][0]['id']);
    }

    public function test_creating_an_invalid_config()
    {
        $user = Factory::registerUser();

        Auth::login($user);

        // omitting a puzzle should cause the request to fail
        $response = $this->post('/api/speedcube/speedcube/config', [
            'config' => [],
        ]);

        $response->assertStatus(500);
    }

    public function test_updating_a_config()
    {
        $user = Factory::registerUser();

        Auth::login($user);

        $response = $this->post('/api/speedcube/speedcube/config', [
            'puzzle' => 'test',
            'config' => [
                'foo' => 'first',
            ],
        ]);
        
        $this->assertEquals('first', $user->configs()->first()->config['foo']);

        $response = $this->post('/api/speedcube/speedcube/config', [
            'puzzle' => 'test',
            'config' => [
                'foo' => 'second',
            ],
        ]);

        $this->assertEquals('second', $user->configs()->first()->config['foo']);
    }
}