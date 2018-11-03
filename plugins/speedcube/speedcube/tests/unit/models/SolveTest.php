<?php

namespace Speedcube\Speedcube\Tests\Unit\Models;

use Speedcube\Speedcube\Models\Solve;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class SolveTest extends PluginTestCase
{
    public function test_creating_a_solve_generates_a_scramble()
    {
        $solve = Factory::create(new Solve, ['size' => 3]);
        
        $this->assertGreaterThan(0, strlen($solve->scramble));
    }
}
