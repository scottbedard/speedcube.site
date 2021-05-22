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
        $this->assertEquals('pending', $solve->status);
    }

    public function test_create_solve_as_user()
    {
        $john = User::factory()->create();
        $mary = User::factory()->create();

        $req1 = $this
            ->actingAs($john)
            ->json('POST', '/api/solves', [
                'puzzle' => '3x3',
            ]);
            
        $solve1 = Solve::find($req1->json()['solveId']);
        $this->assertEquals('pending', $solve1->status);
        $this->assertEquals('3x3', $solve1->puzzle);

        $req2 = $this
            ->actingAs($mary)
            ->json('POST', '/api/solves', [
                'puzzle' => '3x3',
            ]);

        $req3 = $this
            ->actingAs($john)
            ->json('POST', '/api/solves', [
                'puzzle' => '3x3',
            ]);

        // john's first solve should be closed
        $solve1->refresh();
        $this->assertEquals('dnf', $solve1->status);

        // mary's solve should be pending
        $solve2 = Solve::find($req2->json()['solveId']);
        $this->assertEquals('pending', $solve2->status);
    }
}