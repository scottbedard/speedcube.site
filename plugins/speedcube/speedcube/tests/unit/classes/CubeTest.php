<?php

namespace Speedcube\Speedcube\Tests\Unit\Classes;

use Speedcube\Speedcube\Classes\Cube;
use Speedcube\Speedcube\Tests\PluginTestCase;

class CubeTest extends PluginTestCase
{
    public function test_counting_intersecting_turns()
    {
        $this->assertEquals(3, Cube::countTurns('X Y Z R U U F-'));
    }

    public function test_parsing_turns()
    {
        $turns = Cube::parseTurns('R');

        $this->assertEquals($turns, [
            [
                'depth' => 1,
                'target' => 'R',
                'wide' => false,
                'rotation' => 1,
            ],
        ]);
    }

    public function test_reversing_a_scramble()
    {
        $this->assertEquals('U R L2 U- R-', Cube::reverseScramble('R U L2 R- U-'));
    }
}
