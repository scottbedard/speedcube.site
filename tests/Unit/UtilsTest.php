<?php

namespace Tests\Unit;

use App\Classes\Utils;
use PHPUnit\Framework\TestCase;

class UtilsTest extends TestCase
{
    public function test_camelKeysRecursive()
    {
        $actual = Utils::camelKeysRecursive([
            'foo_bar' => [
                'hello_world' => 1,
            ],
        ]);

        $this->assertEquals([
            'fooBar' => [
                'helloWorld' => 1,
            ],
        ], $actual);
    }

    public function test_isJson()
    {
        $valid = [
            '[1,2,3]',
            '{"foo":"bar"}',
            '1',
            'false',
            'true',
        ];

        $invalid = [
            '',
            'invalid json',
            'null',
            [],
            1,
            false,
            null,
            true,
        ];

        foreach ($valid as $val) {
            $this->assertTrue(Utils::isJson($val), 'Failed asserting that ' . json_encode($val) . ' is valid json');
        }

        foreach ($invalid as $val) {
            $this->assertFalse(Utils::isJson($val), 'Failed asserting that ' . json_encode($val) . ' is invalid json');
        }
    }

    public function test_snakeKeysRecursive()
    {
        $actual = Utils::snakeKeysRecursive([
            'fooBar' => [
                'helloWorld' => 1,
            ],
        ]);

        $this->assertEquals([
            'foo_bar' => [
                'hello_world' => 1,
            ],
        ], $actual);
    }
}
