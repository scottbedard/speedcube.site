<?php

namespace Tests\Model;

use App\Models\PuzzleConfig;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_has_many_puzzle_configs()
    {
        $user = User::factory()->create();
    
        PuzzleConfig::factory()->create([
            'user_id' => $user->id,
            'is_active' => true,
        ]);

        PuzzleConfig::factory()->create([
            'user_id' => $user->id,
            'is_active' => false,
        ]);
        
        $configs = $user->puzzleConfigs()->get();
        
        $this->assertEquals(1, $configs->count());
        $this->assertEquals(true, $configs->first()->is_active);
    }
}
