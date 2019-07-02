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
        // create a user and enough solves for an average
        $user = Factory::registerUser();

        Factory::completedSolve($user);
        Factory::completedSolve($user);
        Factory::completedSolve($user);
        Factory::completedSolve($user);
        Factory::completedSolve($user);
        
        // fetch the first (any only) personal record average
        $avg = PersonalRecordAverage::withSolveSummary()
            ->first()
            ->toArray();

        // information about our solves should have been eager loaded
        $this->assertEquals(5, count($avg['solves']));
        
        $this->assertEquals(
            ['id', 'status', 'time'],
            array_keys($avg['solves'][0])
        );
    }
}
