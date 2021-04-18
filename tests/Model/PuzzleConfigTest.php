<?php

namespace Tests\Model;

use App\Models\PuzzleConfig;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PuzzleConfigTest extends TestCase
{
    use RefreshDatabase;

    public function test_belongs_to_user()
    {
        $user = User::factory()->create();
    
        $config = PuzzleConfig::factory()->create([
            'user_id' => $user->id,
            'is_active' => true,
        ]);

        $this->assertEquals($user->id, $config->user->id);
    }
}
