<?php

namespace Tests\Model;

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
    
        $config = Solve::factory()->create([
            'user_id' => $user->id,
        ]);

        $this->assertEquals($user->id, $config->user->id);
    }
}
