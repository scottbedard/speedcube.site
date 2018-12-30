<?php

namespace Speedcube\Speedcube\Tests\Unit\Models;

use Carbon\Carbon;
use Speedcube\Speedcube\Models\PersonalRecord;
use Speedcube\Speedcube\Models\Scramble;
use Speedcube\Speedcube\Models\Solve;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class SolveTest extends PluginTestCase
{    
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

    public function test_personal_record_relationships_are_created()
    {
        $user = Factory::registerUser();

        // create a 5 second solve, which should set a new personal record
        $scramble1 = Factory::createScrambleWithTurns('R');

        $solve1 = Factory::create(new Solve, [
            'user_id' => $user->id,
            'scramble_id' => $scramble1->id,
        ]);

        $solve1->complete('0#START 4000:R- 5000#END');
        
        // the user should now have one personal record with the solve id
        $this->assertEquals(1, $user->records()->count());
        $this->assertEquals($solve1->id, $user->records()->first()->solve_id);

        // create a faster second solve
        $scramble2 = Factory::createScrambleWithTurns('R');

        $solve2 = Factory::create(new Solve, [
            'user_id' => $user->id,
            'scramble_id' => $scramble2->id,
        ]);

        $solve2->complete('0#START 2000:R- 3000#END');

        // our second solve should now be the record
        $this->assertEquals(1, $user->records()->count());
        $this->assertEquals($solve2->id, $user->records()->first()->solve_id);

        // create a slower third solve
        $scramble3 = Factory::createScrambleWithTurns('R');

        $solve3 = Factory::create(new Solve, [
            'user_id' => $user->id,
            'scramble_id' => $scramble3->id,
        ]);

        $solve2->complete('0#START 8000:R- 9000#END');

        // the second solve should still be the record
        $this->assertEquals(1, $user->records()->count());
        $this->assertEquals($solve2->id, $user->records()->first()->solve_id);
    }
}
