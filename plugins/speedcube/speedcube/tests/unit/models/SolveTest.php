<?php

namespace Speedcube\Speedcube\Tests\Unit\Models;

use Carbon\Carbon;
use Illuminate\Support\Facades\Notification;
use Speedcube\Speedcube\Models\PersonalRecord;
use Speedcube\Speedcube\Models\PersonalRecordAverage;
use Speedcube\Speedcube\Models\Scramble;
use Speedcube\Speedcube\Models\Solve;
use Speedcube\Speedcube\Notifications\PersonalRecordNotification;
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

    public function test_creating_a_solve_closes_other_incomplete_solves()
    {
        // create a user, scramble, and solve
        $user = Factory::registerUser();

        $scramble = Factory::createScrambleWithTurns('R');

        $solve = Factory::create(new Solve, [
            'user_id' => $user->id,
            'scramble_id' => $scramble->id,
        ]);

        // since there are no other solves, this one should be pending
        $this->assertEquals('pending', $solve->fresh()->status);

        // and creating a new solve should change it's status to dnf
        Factory::create(new Solve, [
            'user_id' => $user->id,
            'scramble_id' => $scramble->id,
        ]);

        $this->assertEquals('dnf', $solve->fresh()->status);
    }

    // https://github.com/scottbedard/speedcube.site/issues/58
    public function test_creating_a_solve_only_closes_other_solves_for_authenticated_user()
    {
        // scaffold a couple users
        $john = Factory::registerUser();
        $sally = Factory::registerUser();

        // create a scramble and solve for john
        $scramble1 = Factory::createScrambleWithTurns('R');

        $solve1 = Factory::create(new Solve, [
            'user_id' => $john->id,
            'scramble_id' => $scramble1->id,
        ]);
        
        // create a scramble and solve for sally
        $scramble2 = Factory::createScrambleWithTurns('R');

        $solve2 = Factory::create(new Solve, [
            'user_id' => $sally->id,
            'scramble_id' => $scramble1->id,
        ]);

        // both solves should have a pending status
        $this->assertEquals('pending', $solve1->fresh()->status);
        $this->assertEquals('pending', $solve2->fresh()->status);
        
        // create a new solve for sally
        $scramble3 = Factory::createScrambleWithTurns('R');

        $solve3 = Factory::create(new Solve, [
            'user_id' => $sally->id,
            'scramble_id' => $scramble1->id,
        ]);

        // sally's first solve should be closed, and johns solve should still be pending
        $this->assertEquals('pending', $solve1->fresh()->status);
        $this->assertEquals('dnf', $solve2->fresh()->status);
    }

    public function test_personal_records_dispatch_a_twitter_notification()
    {
        // create a user, twitter broadcasting is on by default
        $user = Factory::registerUser();
        $user->profile->update(['twitter_broadcasting' => true]);

        // complete a solve which sets a personal record
        $scramble1 = Factory::createScrambleWithTurns('R');

        $solve1 = Factory::create(new Solve, [
            'user_id' => $user->id,
            'scramble_id' => $scramble1->id,
        ]);

        $solve1->complete('0#START 4000:R- 5000#END');
        
        // a twitter notification should have been fired for the personal record
        $personalRecord = $user->records()->first();

        Notification::assertSentToTimes($personalRecord, PersonalRecordNotification::class, 1);
    }

    public function test_personal_records_do_not_dispatch_a_twitter_notification_when_broadcasting_is_disabled()
    {
        // create a user and disable twitter broadcasting
        $user = Factory::registerUser();
        $user->profile->update(['twitter_broadcasting' => false]);

        // complete a solve which sets a personal record
        $scramble1 = Factory::createScrambleWithTurns('R');

        $solve1 = Factory::create(new Solve, [
            'user_id' => $user->id,
            'scramble_id' => $scramble1->id,
        ]);

        $solve1->complete('0#START 4000:R- 5000#END');
        
        // no notifications should have been sent
        Notification::assertNothingSent();
    }

    //
    // personal record average relationship
    //
    public function test_creating_solves_created_a_personal_record_average()
    {
        $user = Factory::registerUser();
        
        // create a handful of solves with values from this array
        $times = [
            8000,
            7000,
            6000,
            5000, // <- fastest
            'dnf', // <- slowest
        ];

        foreach ($times as $endTime) {
            $scramble = Factory::createScrambleWithTurns('R');
            
            $solve = Factory::create(new Solve, [
                'user_id' => $user->id,
                'scramble_id' => $scramble->id,
            ]);

            if ($endTime === 'dnf') {
                $solve->abort();
            } else {
                $turnTime = $endTime / 2;
                $solve->complete("0#START {$turnTime}:R- {$endTime}#END");
            }
        }

        $recordAverages = $user->recordAverages()->get();

        // one record average should have been created
        $this->assertEquals(1, $recordAverages->count());
        $this->assertEquals(7000, $recordAverages->first()->average_time);
        $this->assertNull($recordAverages->first()->previous_id);

        // adding a faster solve should improve the average
        Factory::create(new Solve, [
            'user_id' => $user->id,
            'scramble_id' => Factory::createScrambleWithTurns('R')->id,
        ])->complete("0#START 2000:R- 4000#END");

        $recordAverages = $user->recordAverages()->get();
        $currentRecordAverage = $user->recordAverages()->current()->first();

        $this->assertEquals(2, $recordAverages->count());
        $this->assertEquals(6000, $currentRecordAverage->average_time);

        // and adding a slower solve should not effect the averages
        Factory::create(new Solve, [
            'user_id' => $user->id,
            'scramble_id' => Factory::createScrambleWithTurns('R')->id,
        ])->complete("0#START 5000:R- 10000#END");

        $recordAverages = $user->recordAverages()->get();
        $currentRecordAverage = $user->recordAverages()->current()->first();

        $this->assertEquals(2, $recordAverages->count());
        $this->assertEquals(6000, $currentRecordAverage->average_time);
    }

    public function test_no_average_is_created_when_multiple_dnf_solves_are_present()
    {
        $user = Factory::registerUser();
        
        // create a handful of solves with values from this array
        $times = [
            8000,
            7000,
            6000,
            'dnf',
            'dnf',
        ];

        foreach ($times as $endTime) {
            $scramble = Factory::createScrambleWithTurns('R');
            
            $solve = Factory::create(new Solve, [
                'user_id' => $user->id,
                'scramble_id' => $scramble->id,
            ]);

            if ($endTime === 'dnf') {
                $solve->abort();
            } else {
                $turnTime = $endTime / 2;
                $solve->complete("0#START {$turnTime}:R- {$endTime}#END");
            }
        }
        
        // no averages should have been created
        $this->assertEquals(0, $user->recordAverages()->count());
    }

    public function test_fastest_and_slowest_are_discared_when_no_dnf_is_present()
    {
        $user = Factory::registerUser();
        
        // create a handful of solves with values from this array
        $times = [
            8000, // <- slowest
            7000,
            6000,
            5000,
            4000, // <- fastest
        ];

        foreach ($times as $endTime) {
            $scramble = Factory::createScrambleWithTurns('R');
            
            $solve = Factory::create(new Solve, [
                'user_id' => $user->id,
                'scramble_id' => $scramble->id,
            ]);

            $turnTime = $endTime / 2;
            $solve->complete("0#START {$turnTime}:R- {$endTime}#END");
        }

        $recordAverages = $user->recordAverages()->get();

        // one record average should have been created
        $this->assertEquals(1, $recordAverages->count());
        $this->assertEquals(6000, $recordAverages->first()->average_time);
    }

    public function test_averages_are_calculated_correctly_with_multiple_slowest_solves()
    {
        $user = Factory::registerUser();
        
        // create a handful of solves with values from this array
        $times = [
            7000, // <- slowest
            7000, // <- slowest
            6000,
            5000,
            4000, // <- fastest
        ];

        foreach ($times as $endTime) {
            $scramble = Factory::createScrambleWithTurns('R');
            
            $solve = Factory::create(new Solve, [
                'user_id' => $user->id,
                'scramble_id' => $scramble->id,
            ]);

            $turnTime = $endTime / 2;
            $solve->complete("0#START {$turnTime}:R- {$endTime}#END");
        }

        $recordAverage = $user->recordAverages()->first();

        $this->assertEquals(6000, $recordAverage->average_time);
    }

    public function test_averages_are_calculated_correctly_with_multiple_fastest_solves()
    {
        $user = Factory::registerUser();
        
        // create a handful of solves with values from this array
        $times = [
            7000, // <- slowest
            6000,
            5000,
            4000, // <- fastest
            4000, // <- fastest
        ];

        foreach ($times as $endTime) {
            $scramble = Factory::createScrambleWithTurns('R');
            
            $solve = Factory::create(new Solve, [
                'user_id' => $user->id,
                'scramble_id' => $scramble->id,
            ]);

            $turnTime = $endTime / 2;
            $solve->complete("0#START {$turnTime}:R- {$endTime}#END");
        }

        $recordAverage = $user->recordAverages()->first();

        $this->assertEquals(5000, $recordAverage->average_time);
    }

    public function test_zero_is_returned_when_an_event_doesnt_exist_in_solution()
    {
        $solve = Factory::create(new Solve, [
            'scramble_id' => Factory::createScrambleWithTurns('R')->id,
        ]);

        $solve->complete("0#START 1000:R- 2000#END");

        $this->assertEquals(0, $solve->getEventTimestamp('TEST'));
    }

    //
    // scopes
    //
    public function test_solve_dnf_scope()
    {
        Factory::create(new Solve);
        
        $dnf = Factory::create(new Solve, ['status' => 'dnf']);
        
        $this->assertEquals(1, Solve::dnf()->count());
        $this->assertEquals($dnf->id, Solve::dnf()->first()->id);
    }

    public function test_count_by_puzzle_scope()
    {
        $two = Factory::create(new Scramble, ['puzzle' => '2x2']);
        $three = Factory::create(new Scramble, ['puzzle' => '3x3']);

        Factory::create(new Solve, ['scramble_id' => $two->id]);
        Factory::create(new Solve, ['scramble_id' => $three->id]);
        Factory::create(new Solve, ['scramble_id' => $three->id]);

        $totals = Solve::countByPuzzle();

        $this->assertEquals(1, $totals->where('puzzle', '2x2')->first()->total);
        $this->assertEquals(2, $totals->where('puzzle', '3x3')->first()->total);
    }

    public function test_join_puzzle_scope()
    {
        $scramble = Factory::create(new Scramble, ['puzzle' => '3x3']);
        $solve = Factory::create(new Solve, ['scramble_id' => $scramble->id]);

        $result = Solve::select('*')->joinPuzzle()->first();

        $this->assertEquals($solve->id, $result->id);
        $this->assertEquals('3x3', $result->puzzle);
    }

    public function test_fewest_moves_scope()
    {
        // solve 1 will have two moves
        $solve1 = Factory::create(new Solve, [
            'scramble_id' => Factory::createScrambleWithTurns('R U')->id,
        ]);

        $solve1->complete('0#START 1000:U- 2000:R- 3000#END');

        // solve 2 will have 1 move
        $solve2= Factory::create(new Solve, [
            'scramble_id' => Factory::createScrambleWithTurns('R')->id,
        ]);


        $solve2->complete('0#START 2000:R- 3000#END');
        
        $this->assertEquals($solve2->id, Solve::fewestMoves()->first()->id);
    }
}
