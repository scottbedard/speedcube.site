<?php

namespace Speedcube\Speedcube\Tests\Unit\Api;

use Speedcube\Speedcube\Models\Scramble;
use Speedcube\Speedcube\Models\Solve;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class SolvesApiTest extends PluginTestCase
{
    //
    // create
    //
    public function test_creating_a_solve_3x3()
    {
        // create a dummy scramble
        $scramble = Factory::create(new Scramble, ['cube_size' => 2]);
        $scramble->scramble = 'R U R-';
        $scramble->save();

        // submit a solution for it
        $response = $this->post('/api/speedcube/speedcube/solves', [
            'scrambleId' => $scramble->id,
            'solution' => '100:X 200:X- 300#START 400:R 500:U- 600:R-',
        ]);

        $content = json_decode($response->getContent(), true);

        // we should have one solution
        $this->assertEquals(1, Solve::count());

        // verify that the solve was saved correctly
        $solve = Solve::find($content['solve']['id']);
        
        $this->assertEquals(300, $solve->time);
        $this->assertEquals(2, $solve->cube_size);
        $this->assertEquals(3, $solve->moves);
        $this->assertEquals(100, $solve->average_speed);
    }

    public function test_creating_invalid_solves_throws_error()
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

    public function test_creating_multiple_solves_for_same_scramble_throws_error()
    {
        $scramble = Factory::create(new Scramble);
        $scramble->scramble = 'R';
        $scramble->save();

        $first = $this->post('/api/speedcube/speedcube/solves', [
            'scrambleId' => $scramble->id,
            'solution' => '0:R-',
        ]);

        $second = $this->post('/api/speedcube/speedcube/solves', [
            'scrambleId' => $scramble->id,
            'solution' => '0:R-',
        ]);

        // both requests should return a 200
        $first->assertStatus(200);
        $second->assertStatus(200);

        // but only the first solve should be rated
        $firstContent = json_decode($first->getContent(), true);
        $secondContent = json_decode($second->getContent(), true);
        
        $this->assertTrue($firstContent['solve']['isRated']);
        $this->assertFalse($secondContent['solve']['isRated']);
    }

    //
    // fastest all time
    //
    public function test_fetching_fastest_solves()
    {
        // create some dummy scrambles
        $a = Factory::create(new Scramble, ['cube_size' => 3]);
        $a->scramble = 'R';
        $a->save();

        $b = Factory::create(new Scramble, ['cube_size' => 3]);
        $b->scramble = 'R';
        $b->save();

        $c = Factory::create(new Scramble, ['cube_size' => 2]);
        $c->scramble = 'R';
        $c->save();

        // create a solve for each scramble. solveB will be the fastest
        // solveC is not rated, and should not be present in the results
        $solveA = Factory::create(new Solve, [
            'scramble_id' => $a->id,
            'solution' => '200:R-',
        ]);

        $solveB = Factory::create(new Solve, [
            'scramble_id' => $b->id,
            'solution' => '100:R-',
        ]);

        // this solve is a duplicate of scramble b and should be unrated
        Factory::create(new Solve, [
            'scramble_id' => $b->id,
            'solution' => '300:R-',
        ]);

        // this solve is for a scramble of a different size
        Factory::create(new Solve, [
            'scramble_id' => $c->id,
            'solution' => '300:R-',
        ]);
        
        // fetch the fastest solves
        $response = $this->get('/api/speedcube/speedcube/solves?cubeSize=3&orderBy=time');
        $data = json_decode($response->getContent(), true);
        
        $this->assertEquals(2, count($data['solves']));
        $this->assertEquals($solveB->id, $data['solves'][0]['id']);
        $this->assertEquals($solveA->id, $data['solves'][1]['id']);
    }
}
