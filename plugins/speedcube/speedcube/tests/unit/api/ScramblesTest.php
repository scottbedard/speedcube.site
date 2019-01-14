<?php

namespace Speedcube\Speedcube\Tests\Unit\Api;

use Auth;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Models\Scramble;
use Speedcube\Speedcube\Models\Solve;
use Speedcube\Speedcube\Tests\PluginTestCase;

class ScramblesApiTest extends PluginTestCase
{
    public function test_creating_a_scramble()
    {
        $response = $this->post('/api/speedcube/speedcube/scrambles', [
            'puzzle' => '3x3',
        ]);

        $response->assertStatus(200);

        $this->assertEquals(1, Scramble::count());
    }

    public function test_a_solve_is_created_for_users()
    {
        $user = Factory::registerUser();

        Auth::login($user);

        $response = $this->post('/api/speedcube/speedcube/scrambles', [
            'puzzle' => '3x3',
        ]);

        $response->assertStatus(200);

        $data = json_decode($response->getContent(), true);
        $scramble = Scramble::find($data['id']);

        $this->assertEquals(1, Scramble::count());
        $this->assertEquals(1, $scramble->solves()->count());
        $this->assertEquals($user->id, $scramble->solves()->first()->id);
    }
}
