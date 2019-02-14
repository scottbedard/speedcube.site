<?php

namespace Speedcube\Speedcube\Tests\Unit\Api;

use Auth;
use Speedcube\Speedcube\Models\Config;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class ConfigApiTest extends PluginTestCase
{
    public function test_fetching_user_configs()
    {
        // create and authenticate a user
        $user = Factory::registerUser();
        Auth::login($user);

        // create a couple configs for the user
        $config = Factory::create(new Config, [
            'config' => '[]',
            'puzzle' => 'foo',
            'user_id' => $user->id,
        ]);

        // fetch the user's configs
        $response = $this->get('/api/speedcube/speedcube/config');

        $response->assertStatus(200);

        // the response data should contain an array of config models
        $data = json_decode($response->getContent(), true);

        $this->assertEquals(1, count($data['configs']));
    }

    public function test_creating_a_config()
    {
        // create and authenticate a user
        $user = Factory::registerUser();
        Auth::login($user);
        
        // create a new puzzle config
        $response = $this->post('/api/speedcube/speedcube/config', [
            'puzzle' => 'test',
            'config' => '{"hello":"world"}',
        ]);

        $response->assertStatus(200);

        // the user should now have one config, and all configs
        // should have been returned in the response
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
            'config' => '[]',
        ]);

        $response->assertStatus(500);
    }

    public function test_updating_a_config()
    {
        // create and authenticate a user
        $user = Factory::registerUser();
        Auth::login($user);

        // create a config for us to update
        $config = Factory::create(new Config, [
            'config' => '{"thing":1}',
            'puzzle' => 'foo',
            'user_id' => $user->id,
        ]);

        // update the config
        $response = $this->post('/api/speedcube/speedcube/config', [
            'config' => '{"thing":2}',
            'puzzle' => 'foo',
        ]);

        $response->assertStatus(200);

        // we should now see the updated "thing" value
        $this->assertEquals(2, json_decode($user->configs()->first()->config, true)['thing']);
    }
}