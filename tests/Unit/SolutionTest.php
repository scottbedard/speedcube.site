<?php

namespace Tests\Unit;

use App\Classes\Solution;
use Tests\TestCase;

class SolutionTest extends TestCase
{
    public function test_setting_solution_nodes()
    {
        $solution = new Solution('1000:A 2000#FOO');

        $this->assertEquals([
            [
                'time' => 1000,
                'type' => 'turn',
                'value' => 'A',
            ],
            [
                'time' => 2000,
                'type' => 'event',
                'value' => 'FOO',
            ],
        ], $solution->getNodes());

        $solution->setSolution('500:B 1500#BAR');

        $this->assertEquals([
            [
                'time' => 500,
                'type' => 'turn',
                'value' => 'B',
            ],
            [
                'time' => 1500,
                'type' => 'event',
                'value' => 'BAR',
            ],
        ], $solution->getNodes());
    }

    // public function test_getting_event_timestamp()
    // {

    // }
}
