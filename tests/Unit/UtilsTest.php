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
