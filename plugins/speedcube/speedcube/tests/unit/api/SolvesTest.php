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
        $scramble = Factory::create(new Scramble, ['puzzle' => '3x3']);
        $scramble->scramble = $turns;
        $scramble->save();

        return $scramble;
    }

    //
    // complete
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
        $this->assertEquals(3, $solve->moves);
        $this->assertEquals(133, $solve->average_speed);
        $this->assertEquals('#000000', $solve->config['colors'][0]);
        $this->assertEquals('complete', $solve->status);
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
        
        $this->assertEquals('dnf', $data['solve']['status']);
    }

    public function test_creating_multiple_solves_for_same_scramble_throws_error()
    {
        $scramble = self::createScramble('R');

        // the first solve should be work fine
        $responseA = $this->post('/api/speedcube/speedcube/solves', [
            'scrambleId' => $scramble->id,
            'solution' => '0#START 100:R- 200#END',
        ]);

        $responseA->assertStatus(200);

        // and subsequent solves should fail
        $responseB = $this->post('/api/speedcube/speedcube/solves', [
            'scrambleId' => $scramble->id,
            'solution' => '0#START 100:R- 200#END',
        ]);

        $responseB->assertStatus(500);
    }

    public function test_aborting_a_solve()
    {
        $scramble = self::createScramble('R');

        $response = $this->post('/api/speedcube/speedcube/solves', [
            'abort' => true,
            'scrambleId' => $scramble->id,
            'solution' => '0#START 100:F 200#END',
        ]);

        $response->assertStatus(200);

        $data = json_decode($response->getContent(), true);

        $solve = Solve::find($data['solve']['id']);

        $this->assertEquals('dnf', $solve->status);
    }

    //
    // index
    //
    public function test_fetching_fastest_solves()
    {
        $user = Factory::registerUser();

        // create some dummy scrambles
        $scrambleA = self::createScramble('R');
        $scrambleB = self::createScramble('R');
        $scrambleC = self::createScramble('R');

        // create a solve for each scramble, with solveB being the fastest
        $solveA = Factory::create(new Solve, [
            'scramble_id' => $scrambleA->id,
            'user_id' => $user->id,
        ]);

        $solveA->complete('0#START 100:R- 300#END');

        $solveB = Factory::create(new Solve, [
            'scramble_id' => $scrambleA->id,
            'user_id' => $user->id,
        ]);

        $solveB->complete('0#START 100:R- 200#END');

        // fetch the fastest solves
        $response = $this->get('/api/speedcube/speedcube/solves?puzzle=3x3&orderBy=time');

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

        $scramble = Factory::create(new Scramble, ['puzzle' => '3x3']);
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
        $this->assertEquals($solve->user->username, $data['solve']['user']['username']);
    }
}
