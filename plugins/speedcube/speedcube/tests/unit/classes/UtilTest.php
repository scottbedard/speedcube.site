<?php

namespace Speedcube\Speedcube\Tests\Unit\Classes;

use Speedcube\Speedcube\Classes\Util;
use TestCase;

class UtilTest extends TestCase
{
    public function test_camelCaseKeysRecursive()
    {
        $result = Util::camelCaseKeysRecursive([
            'a_b' => 1,
            'c_d' => [
                'e_f' => 2,
            ],
        ]);

        $this->assertEquals([
            'aB' => 1,
            'cD' => [
                'eF' => 2,
            ],
        ], $result);
    }

    public function test_keyByRecursive()
    {
        $result = Util::keyByRecursive([
            'foo' => 1,
            'bar' => [
                'baz' => 2,
            ],
        ], function ($value, $key) {
            return strtoupper($key);
        });

        $this->assertEquals([
            'FOO' => 1,
            'BAR' => [
                'BAZ' => 2,
            ],
        ], $result);
    }

    public function test_snakeCaseKeysRecursive()
    {
        $result = Util::snakeCaseKeysRecursive([
            'aB' => 1,
            'cD' => [
                'eF' => 2,
            ],
        ]);

        $this->assertEquals([
            'a_b' => 1,
            'c_d' => [
                'e_f' => 2,
            ],
        ], $result);
    }
}
