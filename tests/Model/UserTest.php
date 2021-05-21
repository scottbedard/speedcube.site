<?php

namespace Tests\Model;

use App\Models\PuzzleConfig;
use App\Models\Solve;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_has_many_puzzle_configs()
    {
        $user = User::factory()->create();
    
        PuzzleConfig::factory()->create([
            'is_active' => true,
            'puzzle_id' => 3,
            'user_id' => $user->id,
        ]);

        PuzzleConfig::factory()->create([
            'is_active' => false,
            'puzzle_id' => 3,
            'user_id' => $user->id,
        ]);
        
        $configs = $user->puzzleConfigs()->get();
        
        $this->assertEquals(1, $configs->count());
        $this->assertEquals(true, $configs->first()->is_active);
    }

    public function test_user_has_many_solves()
    {
        $user = User::factory()->create();
    
        Solve::factory()->create([
            'user_id' => $user->id,
        ]);
        
        $this->assertEquals(1, $user->solves()->count());
    }
}
