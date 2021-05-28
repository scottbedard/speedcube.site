<?php

namespace Tests\Model;

use App\Models\PuzzleConfig;
use App\Models\Solve;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SolveTest extends TestCase
{
    use RefreshDatabase;

    public function test_solve_belongs_to_user()
    {
        $user = User::factory()->create();
    
        $solve = Solve::factory()->create([
            'user_id' => $user->id,
        ]);

        $this->assertEquals($user->id, $solve->user->id);
    }

    public function test_solve_belongs_to_puzzle_config()
    {
        $puzzleConfig = PuzzleConfig::factory()->create();

        $solve = Solve::factory()->create([
            'puzzle_config_id' => $puzzleConfig->id,
        ]);

        $this->assertEquals($puzzleConfig->id, $solve->puzzleConfig->id);
    }

    public function test_solve_apply_solution_correct()
    {
        $solve = Solve::factory()->create([
            'puzzle' => '3x3',
            'scramble' => 'R',
        ]);

        $solve->applySolution('1000:Y 2000#START 3000:F- 4000#END');

        $this->assertEquals('complete', $solve->status);
        $this->assertEquals(2000, $solve->time);
    }

    public function test_solve_apply_solution_incorrect()
    {
        $solve = Solve::factory()->create([
            'puzzle' => '3x3',
            'scramble' => 'R',
        ]);

        // L does not solve this scramble
        $solve->applySolution('1000#START 2000:L 3000#END');

        $this->assertEquals('dnf', $solve->status);
        $this->assertEquals(0, $solve->time);
    }
}
