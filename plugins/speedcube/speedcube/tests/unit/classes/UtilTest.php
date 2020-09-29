<?php

namespace Speedcube\Speedcube\Tests\Unit\Classes;

use Speedcube\Speedcube\Classes\Util;
use Speedcube\Speedcube\Tests\PluginTestCase;

class UtilTest extends PluginTestCase
{
    public function test_keyByRecursive()
    {
        $source = [
            'foo' => 1,
            'bar' => [
                'baz' => 2,
            ],
        ];

        $result = Util::keyByRecursive($source, function ($value, $key) {
            return strtoupper($key);
        });

        $this->assertEquals([
            'FOO' => 1,
            'BAR' => [
                'BAZ' => 2,
            ],
        ], $result);
    }
}
