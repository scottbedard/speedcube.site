<?php

namespace Speedcube\Speedcube\Tests\Unit\Api;

use Auth;
use Speedcube\Speedcube\Models\Scramble;
use Speedcube\Speedcube\Models\Solve;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class SolvesApiTest extends PluginTestCase
{
    // helper function to create an easily solved scramble
    public static function createScramble($turns = '') {
        $scramble = Factory::create(new Scramble, ['cube_size' => 3]);
        $scramble->scramble = $turns;
        $scramble->save();

        return $scramble;
    }

    //
    // create
    //
    public function test_completing_a_solve_as_guest()
    {
        // create a dummy scramble
        $scramble = self::createScramble('R U R-');

        // submit a request to complete a solve for it
        $response = $this->post("/api/speedcube/speedcube/solves", [
            'config' => [
                'colors' => ['#000000', '#111111', '#222222', '#333333', '#444444', '#555555'],
            ],
            'scrambleId' => $scramble->id,
            'solution' => '0#START 100:R 200:U- 300:R- 400#END',
        ]);

        $response->assertStatus(200);

        $data = json_decode($response->getContent(), true);

        // one solve should now exist in our database
        $solve = Solve::find($data['solve']['id']);

        $this->assertEquals(1, Solve::count());
        $this->assertNull($solve->user_id);
        $this->assertEquals(3, $solve->cube_size);
        $this->assertEquals(3, $solve->moves);
        $this->assertEquals(133, $solve->average_speed);
        $this->assertEquals('#000000', $solve->config['colors'][0]);
        $this->assertEquals('solved', $solve->result);
    }

    public function test_completing_a_solve_as_a_user()
    {
        $user = Factory::registerUser();

        Auth::login($user);
        
        $scramble = self::createScramble('R U R-');

        $solve = Factory::create(new Solve, [
            'scramble_id' => $scramble->id,
            'user_id' => $user->id,
        ]);

        $response = $this->post("/api/speedcube/speedcube/solves", [
            'config' => [
                'colors' => ['#000000', '#111111', '#222222', '#333333', '#444444', '#555555'],
            ],
            'scrambleId' => $scramble->id,
            'solution' => '0#START 100:R 200:U- 300:R- 400#END',
        ]);

        $response->assertStatus(200);

        $data = json_decode($response->getContent(), true);

        // one solve should now exist in our database
        $solve = Solve::find($data['solve']['id']);

        $this->assertEquals(1, Solve::count());
        $this->assertEquals($user->id, $solve->user_id);
    }
    
    public function test_completing_a_solve_with_an_incorrect_solution()
    {
        // generate a scramble and submit an incorrect solution for it
        $scramble = self::createScramble('R');

        $response = $this->post('/api/speedcube/speedcube/solves', [
            'scrambleId' => $scramble->id,
            'solution' => '0#START 100:F 200#END',
        ]);

        $data = json_decode($response->getContent(), true);
        
        $this->assertEquals('dnf', $data['solve']['result']);
    }

    // public function test_creating_multiple_solves_for_same_scramble_throws_error()
    // {
    //     $scramble = self::createScramble('R');

    //     $first = $this->post('/api/speedcube/speedcube/solves', [
    //         'scrambleId' => $scramble->id,
    //         'solution' => '0:R-',
    //     ]);

    //     $second = $this->post('/api/speedcube/speedcube/solves', [
    //         'scrambleId' => $scramble->id,
    //         'solution' => '0:R-',
    //     ]);

    //     // both requests should return a 200
    //     $first->assertStatus(200);
    //     $second->assertStatus(200);

    //     // but only the first solve should be rated
    //     $firstContent = json_decode($first->getContent(), true);
    //     $secondContent = json_decode($second->getContent(), true);
        
    //     $this->assertTrue($firstContent['solve']['isRated']);
    //     $this->assertFalse($secondContent['solve']['isRated']);
    // }

    //
    // index
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
            'solution' => '0#START 100:R- 200#END',
        ]);

        $solveB = Factory::create(new Solve, [
            'scramble_id' => $b->id,
            'solution' => '0#START 100:R- 150#END',
        ]);

        // this solve is a duplicate of scramble b and should be unrated
        Factory::create(new Solve, [
            'scramble_id' => $b->id,
            'solution' => '0#START 100:R- 200#END',
        ]);

        // this solve is for a scramble of a different size
        Factory::create(new Solve, [
            'scramble_id' => $c->id,
            'solution' => '0#START 100:R- 200#END',
        ]);
        
        // fetch the fastest solves
        $response = $this->get('/api/speedcube/speedcube/solves?cubeSize=3&orderBy=time');
        $data = json_decode($response->getContent(), true);
        
        $this->assertEquals(2, count($data['solves']));
        $this->assertEquals($solveB->id, $data['solves'][0]['id']);
        $this->assertEquals($solveA->id, $data['solves'][1]['id']);
    }

    //
    // find
    //
    public function test_finding_a_solve()
    {
        $user = Factory::registerUser();

        $scramble = Factory::create(new Scramble, ['cube_size' => 3]);
        $scramble->scramble = 'R';
        $scramble->save();

        $solve = Factory::create(new Solve, [
            'scramble_id' => $scramble->id,
            'solution' => '500#START 1000:R- 1500#END',
            'user_id' => $user->id,
        ]);
        
        $response = $this->get("/api/speedcube/speedcube/solves/{$solve->id}");
        $data = json_decode($response->getContent(), true);
        
        $this->assertEquals($solve->id, $data['solve']['id']);
        $this->assertEquals($solve->scramble->id, $data['solve']['scramble']['id']);
        $this->assertEquals($solve->user->id, $data['solve']['user']['id']);
    }
}
