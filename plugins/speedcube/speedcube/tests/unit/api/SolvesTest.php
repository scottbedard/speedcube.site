<?php

namespace Speedcube\Speedcube\Tests\Unit\Api;

use Speedcube\Speedcube\Models\Scramble;
use Speedcube\Speedcube\Models\Solve;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class SolvesApiTest extends PluginTestCase
{
    public function test_creating_a_solve_3x3()
    {
        // create a dummy scramble
        $scramble = Factory::create(new Scramble);
        $scramble->scramble = 'R U R-';
        $scramble->save();

        // submit a solution for it
        $response = $this->post('/api/speedcube/speedcube/solves', [
            'scrambleId' => $scramble->id,
            'solution' => '0:X 10:X- !! 20:R 30:U- 40:R-',
        ]);

        // we should have one solution
        $this->assertEquals(1, Solve::count());
    }

    public function test_creating_invalid_solves_throw_an_error()
    {
        // create a dummy scramble
        $scramble = Factory::create(new Scramble);
        $scramble->scramble = 'R';
        $scramble->save();

        // submit an incorrect solution for it
        $response = $this->post('/api/speedcube/speedcube/solves', [
            'scrambleId' => $scramble->id,
            'solution' => '0:U',
        ]);

        $content = json_decode($response->getContent(), true);
        
        $this->assertEquals('failed', $content['status']);
    }
}
