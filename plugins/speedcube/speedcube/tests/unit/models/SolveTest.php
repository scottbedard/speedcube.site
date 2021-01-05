<?php

namespace Speedcube\Speedcube\Tests\Unit\Models;

use Speedcube\Speedcube\Models\Solve;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class SolveTest extends PluginTestCase
{
    public function test_creating_a_solve_closes_incomplete_solves()
    {
        $first = Factory::create(new Solve, [ 'user_id' => 1 ]);
        $second = Factory::create(new Solve, [ 'user_id' => 2 ]);
        $this->assertEquals('pending', $first->status);
        $this->assertEquals('pending', $second->status);

        $third = Factory::create(new Solve, [ 'user_id' => $first->id ]);
        $this->assertEquals('pending', $third->status);

        $first->refresh();
        $second->refresh();
        $this->assertEquals('dnf', $first->status);
        $this->assertEquals('pending', $second->status);
        $this->assertEquals('pending', $third->status);
    }

    public function test_solution_parsing()
    {
        $solve = Factory::create(new Solve, [
            'solution' => '1000:R 2000#START',
        ]);

        $this->assertEquals([
            [
                'time' => 1000,
                'type' => 'turn',
                'value' => 'R',
            ],
            [
                'time' => 2000,
                'type' => 'event',
                'value' => 'START',
            ],
        ], $solve->getNormalizedSolution());
    }
}
