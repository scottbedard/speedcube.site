<?php

namespace Speedcube\Speedcube\Tests\Unit\Classes;

use Speedcube\Speedcube\Classes\Utils;
use Speedcube\Speedcube\Tests\PluginTestCase;

class UtilsTest extends PluginTestCase
{
    public function test_formatting_time_values()
    {
        $tests = [
            '0' => '0:00.00',
            '1000' => '0:01.00',
            '10000' => '0:10.00',
            '10' => '0:00.01',
            '61234' => '1:01.23',
        ];
        
        foreach ($tests as $time => $expected) {
            $this->assertEquals($expected, Utils::formatTime($time));
        }
    }

    public function test_ends_with()
    {
        $this->assertTrue(Utils::endsWith('abc', ''));
        $this->assertTrue(Utils::endsWith('abc', 'c'));
        $this->assertFalse(Utils::endsWith('abc', 'b'));
    }
}
