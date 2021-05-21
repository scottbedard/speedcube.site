<?php

namespace Tests\Model;

use App\Models\PuzzleConfig;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PuzzleConfigTest extends TestCase
{
    use RefreshDatabase;

    public function test_puzzle_config_belongs_to_user()
    {
        $user = User::factory()->create();
    
        $config = PuzzleConfig::factory()->create([
            'user_id' => $user->id,
            'is_active' => true,
        ]);

        $this->assertEquals($user->id, $config->user->id);
    }

    public function test_puzzle_config_creation_deactivates_old_configs()
    {
        $john = User::factory()->create();
        $sally = User::factory()->create();
    
        $cube1 = PuzzleConfig::factory()->create([
            'puzzle_id' => 3,
            'user_id' => $john->id,
        ]);

        $cube2 = PuzzleConfig::factory()->create([
            'puzzle_id' => 3,
            'user_id' => $sally->id,
        ]);

        $megaminx = $config1 = PuzzleConfig::factory()->create([
            'puzzle_id' => 4,
            'user_id' => $john->id,
        ]);

        $this->assertTrue(PuzzleConfig::find($cube1->id)->is_active);
        $this->assertTrue(PuzzleConfig::find($cube2->id)->is_active);
        $this->assertTrue(PuzzleConfig::find($megaminx->id)->is_active);

        $cube3 = PuzzleConfig::factory()->create([
            'puzzle_id' => 3,
            'user_id' => $john->id,
        ]);

        $this->assertFalse(PuzzleConfig::find($cube1->id)->is_active);
        $this->assertTrue(PuzzleConfig::find($cube2->id)->is_active);
        $this->assertTrue(PuzzleConfig::find($megaminx->id)->is_active);
        $this->assertTrue(PuzzleConfig::find($cube3->id)->is_active);
    }
}
