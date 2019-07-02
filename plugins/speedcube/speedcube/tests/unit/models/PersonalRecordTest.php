<?php

namespace Speedcube\Speedcube\Tests\Unit\Models;

use RainLab\User\Models\User;
use Speedcube\Speedcube\Models\PersonalRecord;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class PersonalRecordTest extends PluginTestCase
{
    public function test_join_solve_scope()
    {
        $user = Factory::registerUser();
        $solve = Factory::completedSolve($user);

        $record = PersonalRecord::joinSolve()->first();
        
        $this->assertEquals($solve->time, $record->time);
    }

    public function test_fetching_records_by_puzzle()
    {
        $user = Factory::registerUser();
        $solve1 = Factory::completedSolve($user, 5000, '2x2');
        $solve2 = Factory::completedSolve($user, 5000, '3x3');
        
        $this->assertEquals(2, PersonalRecord::count());
        $this->assertEquals($solve1->id, PersonalRecord::puzzle('2x2')->first()->id);
        $this->assertEquals($solve2->id, PersonalRecord::puzzle('3x3')->first()->id);
    }
}
