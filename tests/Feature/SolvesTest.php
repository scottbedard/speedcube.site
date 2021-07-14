<?php

namespace Tests\Feature;

use App\Models\PuzzleConfig;
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

        PuzzleConfig::factory()->create([
            'user_id' => $john->id,
            'puzzle' => '2x2', // <- a different puzzle
        ]);

        $puzzleConfig = PuzzleConfig::factory()->create([
            'user_id' => $john->id,
            'puzzle' => '3x3',
        ]);

        $req1 = $this
            ->actingAs($john)
            ->json('POST', '/api/solves', [
                'puzzle' => '3x3',
            ]);
            
        $solve1 = Solve::find($req1->json()['solveId']);

        $this->assertEquals('3x3', $solve1->puzzle);
        $this->assertEquals('pending', $solve1->status);
        $this->assertEquals($puzzleConfig->id, $solve1->puzzle_config_id);

        $req2 = $this
            ->actingAs($mary)
            ->json('POST', '/api/solves', [
                'puzzle' => '3x3',
            ]);

        // mary's solve should have no puzzle config id
        $solve2 = Solve::find($req2->json()['solveId']);
        $this->assertEquals(null, $solve2->puzzle_config_id);

        // creating a new solve for john should close the first one
        $this
            ->actingAs($john)
            ->json('POST', '/api/solves', [
                'puzzle' => '3x3',
            ]);

        // john's first solve should be closed
        $solve1->refresh();
        $this->assertEquals('dnf', $solve1->status);

        // mary's solve should be pending
        $solve2->refresh();
        $this->assertEquals('pending', $solve2->status);
    }

    public function test_complete_solve_as_guest()
    {
        $solve = Solve::factory()->create([
            'puzzle' => '3x3',
            'scramble' => 'R-',
        ]);

        $request = $this
            ->json('POST', '/api/solves/complete', [
                'solution' => '1000#START 2000:R 3000#END',
                'solveId' => $solve->id,
            ]);

        $request->assertStatus(200);

        $data = $request->json();
        
        $solve->refresh();

        $this->assertEquals('complete', $solve->status);

        $this->assertEquals($solve->id, $data['solve']['id']);
        $this->assertEquals([], $data['recent']);
    }

    public function test_complete_solve_as_user()
    {
        $user = User::factory()->create();

        $puzzleConfig = PuzzleConfig::factory()->create([
            'config' => '{"turnDuration":100}',
            'puzzle' => '3x3',
            'user_id' => $user->id,
        ]);

        $solve = Solve::factory()->create([
            'puzzle_config_id' => $puzzleConfig->id,
            'puzzle' => '3x3',
            'scramble' => 'R',
            'user_id' => $user->id,
        ]);

        $request = $this
            ->actingAs($user)
            ->json('POST', '/api/solves/complete', [
                'solution' => '500:X 600:X- 1000#START 1250:R 1500:R 1750:R 2000#END',
                'solveId' => $solve->id,
            ]);

        $request->assertStatus(200);

        $data = $request->json();
        
        $solve->refresh();

        $this->assertEquals('complete', $solve->status);
        $this->assertEquals(3, $solve->turns);

        $this->assertEquals($solve->id, $data['solve']['id']);
        $this->assertEquals([
            [
                'id' => $solve->id,
                'puzzle' => $solve->puzzle,
                'status' => $solve->status,
                'time' => $solve->time,
                'userId' => $solve->user_id,
            ]
        ], $data['recent']);
    }

    public function test_abort_solve_as_guest()
    {
        $solve = Solve::factory()->create([
            'puzzle' => '3x3',
            'scramble' => 'R-',
        ]);

        $request = $this
            ->json('POST', '/api/solves/abort', [
                'solution' => '1000#START 2000:F 3000#ABORT',
                'solveId' => $solve->id,
            ]);

        $request->assertStatus(200);

        $data = $request->json();
        
        $solve->refresh();

        $this->assertEquals('dnf', $solve->status);

        $this->assertEquals($solve->id, $data['solve']['id']);
        $this->assertEquals([], $data['recent']);
    }

    public function test_abort_solve_as_user()
    {
        $user = User::factory()->create();

        $solve = Solve::factory()->create([
            'user_id' => $user->id,
            'puzzle' => '3x3',
            'scramble' => 'R-',
        ]);

        $request = $this
            ->actingAs($user)
            ->json('POST', '/api/solves/abort', [
                'solution' => '1000#START 2000:F 3000#ABORT',
                'solveId' => $solve->id,
            ]);

        $data = $request->json();

        $solve->refresh();

        $this->assertEquals('dnf', $solve->status);

        $this->assertEquals($solve->id, $data['solve']['id']);
        $this->assertEquals([
            [
                'id' => $solve->id,
                'puzzle' => $solve->puzzle,
                'status' => $solve->status,
                'time' => $solve->time,
                'userId' => $solve->user_id,
            ]
        ], $data['recent']);
    }

    public function test_cannot_abort_a_completed_solve()
    {
        $user = User::factory()->create();

        $solve = Solve::factory()->complete()->create([
            'user_id' => $user->id,
        ]);
        
        $request = $this
            ->actingAs($user)
            ->json('POST', '/api/solves/abort', [
                'solution' => '1000#START 2000:F 3000#ABORT',
                'solveId' => $solve->id,
            ]);

        $solve->refresh();
        
        $this->assertEquals('complete', $solve->status);
    }
}