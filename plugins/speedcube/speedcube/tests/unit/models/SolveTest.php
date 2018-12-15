<?php

namespace Speedcube\Speedcube\Tests\Unit\Models;

use Carbon\Carbon;
use Speedcube\Speedcube\Models\Solve;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class SolveTest extends PluginTestCase
{
    public function test_creating_a_solve_generates_a_token()
    {
        $solve = Factory::create(new Solve);

        // if this value is ever changed, make sure to migrate the db column
        $this->assertEquals(11, strlen($solve->token));
    }
    
    public function test_closing_abandoned_solves()
    {
        // newly created solves should not be considered abandoned
        $solve = Factory::create(new Solve);

        Solve::closeAbandoned();

        $this->assertEquals('pending', Solve::find($solve->id)->status);

        // and solves older than a day should be ruled as DNF
        $solve->created_at = Carbon::now()->subDays(2);
        $solve->save();

        Solve::closeAbandoned();

        $this->assertEquals('dnf', Solve::find($solve->id)->status);
    }
}
