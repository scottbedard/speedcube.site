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

        $this->assertEquals(1, Solve::count());
        $this->assertEquals('3x3', $data['solve']['puzzle']);
    }
}