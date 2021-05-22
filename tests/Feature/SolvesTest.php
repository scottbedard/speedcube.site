<?php

namespace Tests\Feature;

use App\Models\Solve;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class SolvesTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_solve_as_guest()
    {
        $request = $this
            ->json('POST', '/api/solves', [
                'puzzle' => '3x3',
            ]);

        $request->assertStatus(200);

        $data = $request->json();

        $solve = Solve::first();

        $this->assertEquals(1, Solve::count());
        $this->assertEquals($solve->id, $data['solveId']);
        $this->assertNull($solve->user_id);
        $this->assertTrue(is_array($data['state']));
    }
}