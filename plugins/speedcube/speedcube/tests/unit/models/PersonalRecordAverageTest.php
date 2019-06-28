<?php

namespace Speedcube\Speedcube\Tests\Unit\Models;

use RainLab\User\Models\User;
use Speedcube\Speedcube\Models\PersonalRecordAverage;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class PersonalRecordAverageTest extends PluginTestCase
{
    public function test_eager_loading_user_summary()
    {
        $user = Factory::registerUser();
        $solve1 = Factory::completedSolve($user);
        $solve2 = Factory::completedSolve($user);
        $solve2 = Factory::completedSolve($user);
        $solve2 = Factory::completedSolve($user);
        $solve2 = Factory::completedSolve($user);
        
        $avg = PersonalRecordAverage::withSolveSummary()
            ->first()
            ->toArray();

        $this->assertEquals(5, count($avg['solves']));
        $this->assertEquals(['id', 'status', 'time'], array_keys($avg['solves'][0]));
    }
}
