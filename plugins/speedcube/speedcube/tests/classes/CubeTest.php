<?php

namespace Speedcube\Speedcube\Tests\Classes;

use Speedcube\Speedcube\Classes\Cube;
use Speedcube\Speedcube\Tests\PluginTestCase;

class CubeTest extends PluginTestCase
{
    public function test_counting_intersecting_turns()
    {
        $this->assertEquals(3, Cube::countTurns('X Y Z R U U F-'));
    }
}
