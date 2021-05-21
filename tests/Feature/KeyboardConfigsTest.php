<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class KeyboardConfigsTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_keyboard_config()
    {
        $user = User::factory()->create();

        $request = $this
            ->actingAs($user)
            ->json('POST', '/api/keyboard-configs', [
                'config' => '{"foo":"bar"}',
                'puzzle' => '3x3',
            ]);

        $request->assertStatus(200);

        $this->assertEquals(1, $user->keyboardConfigs()->count());

        $data = $request->json();

        $this->assertEquals('{"foo":"bar"}', $data['keyboardConfigs'][0]['config']);
        $this->assertEquals('3x3', $data['keyboardConfigs'][0]['puzzle']);
    }

    public function test_update_keyboard_config()
    {
        $user = User::factory()->create();

        $keyboardConfig = $user
            ->keyboardConfigs()
            ->create([
                'config' => '{"foo":"bar"}',
                'puzzle' => '3x3',
            ]);

        $this->assertEquals(1, $user->keyboardConfigs()->count());

        $request = $this
            ->actingAs($user)
            ->json('POST', '/api/keyboard-configs', [
                'config' => '{"hello":"world"}',
                'puzzle' => '3x3',
            ]);

        $this->assertEquals(1, $user->keyboardConfigs()->count());

        $data = $request->json();

        $this->assertEquals('{"hello":"world"}', $data['keyboardConfigs'][0]['config']);
    }
}