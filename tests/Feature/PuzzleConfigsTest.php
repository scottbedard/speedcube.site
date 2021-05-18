<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class PuzzleConfigsTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_puzzle_config()
    {
        $user = User::factory()->create();

        $request = $this
            ->actingAs($user)
            ->json('POST', '/api/puzzle-configs', [
                'config' => '{"foo":"bar"}',
                'puzzle' => '3x3',
            ]);

        $request->assertStatus(200);

        $this->assertEquals(1, $user->puzzleConfigs()->count());

        $data = $request->json();

        $this->assertEquals('{"foo":"bar"}', $data['puzzleConfigs'][0]['config']);
    }
}