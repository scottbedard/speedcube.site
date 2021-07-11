<?php

namespace Tests\Unit;

use App\Classes\Solution;
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

        $this->assertEquals(-1, $solution->getEventTimestamp('NOT-FOUND'));
        $this->assertEquals(2000, $solution->getEventTimestamp('START'));
    }

    public function test_get_turns_between_events()
    {
        $solution = new Solution('1000:A 2000#START 3000:B 4000:C 5000:D 6000#END 7000:E');

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
        ], $solution->getTurnsBetweenEvents('START', 'END'));
    }
}
