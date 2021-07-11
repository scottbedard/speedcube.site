<?php

namespace Tests\Unit;

use App\Classes\Solution;
use Exception;
use Tests\TestCase;

class SolutionTest extends TestCase
{
    public function test_setting_solution_nodes()
    {
        $solution = new Solution('1000:A 2000#START');

        $this->assertEquals([
            [
                'time' => 1000,
                'type' => 'turn',
                'value' => 'A',
            ],
            [
                'time' => 2000,
                'type' => 'event',
                'value' => 'START',
            ],
        ], $solution->getNodes());

        $solution->setSolution('500:B 1500#START');

        $this->assertEquals([
            [
                'time' => 500,
                'type' => 'turn',
                'value' => 'B',
            ],
            [
                'time' => 1500,
                'type' => 'event',
                'value' => 'START',
            ],
        ], $solution->getNodes());
    }

    public function test_getting_event_timestamp()
    {
        $solution = new Solution('1000:A 2000#START 3000:B 4000#END');

        $this->assertEquals(2000, $solution->getEventTimestamp('START'));
    }

    public function test_getting_missing_event_timestamp()
    {
        $solution = new Solution('1000:A 2000#START 3000:B 4000#END');

        $this->expectException(Exception::class);

        $solution->getEventTimestamp('NOT-FOUND');
    }

    public function test_get_turns_by_event()
    {
        $solution = new Solution('1000:A 2000#START 3000:B 4000:C 5000:D 6000#END 7000:E');

        // all turns after an event
        $this->assertEquals([
            [
                'time' => 3000,
                'type' => 'turn',
                'value' => 'B',
            ],
            [
                'time' => 4000,
                'type' => 'turn',
                'value' => 'C',
            ],
            [
                'time' => 5000,
                'type' => 'turn',
                'value' => 'D',
            ],
            [
                'time' => 7000,
                'type' => 'turn',
                'value' => 'E',
            ],
        ], $solution->getTurnsByEvent('START'));

        // turns between two events
        $this->assertEquals([
            [
                'time' => 3000,
                'type' => 'turn',
                'value' => 'B',
            ],
            [
                'time' => 4000,
                'type' => 'turn',
                'value' => 'C',
            ],
            [
                'time' => 5000,
                'type' => 'turn',
                'value' => 'D',
            ],
        ], $solution->getTurnsByEvent('START', 'END'));
    }

    public function test_get_time_between_events()
    {
        $solution = new Solution('1000:A 2000#START 3000:B 4000:C 5000:D 6000#END 7000:E');

        $this->assertEquals(4000, $solution->getTimeBetweenEvents('START', 'END'));
    }
}
