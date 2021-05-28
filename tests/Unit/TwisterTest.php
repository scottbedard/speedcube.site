<?php

namespace Tests\Unit;

use App\Classes\Twister;
use Tests\TestCase;

class TwisterTest extends TestCase
{
    public function test_twister_get_id()
    {
        $this->assertEquals(0, Twister::getId('unknown'));
        $this->assertEquals(2, Twister::getId('2x2'));
        $this->assertEquals(3, Twister::getId('3x3'));
        $this->assertEquals(4, Twister::getId('4x4'));
        $this->assertEquals(5, Twister::getId('5x5'));
    }

    public function test_twister_get_name()
    {
        $this->assertEquals('unknown', Twister::getName(0));
        $this->assertEquals('2x2', Twister::getName(2));
        $this->assertEquals('3x3', Twister::getName(3));
        $this->assertEquals('4x4', Twister::getName(4));
        $this->assertEquals('5x5', Twister::getName(5));
    }

    public function test_twister_scramble()
    {
        $data = Twister::scramble('2x2', 5);

        $this->assertEquals('2x2', $data['puzzle']);
        $this->assertEquals(5, $data['turns']);
    }

    public function test_twister_test()
    {        
        // R is solved by R-
        $this->assertTrue(Twister::test('2x2', 'R', 'R-'));

        // R is not solved by L
        $this->assertFalse(Twister::test('2x2', 'R', 'L'));
    }
}
