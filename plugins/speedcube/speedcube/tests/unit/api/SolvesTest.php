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
            'config' => '{"colors":["#000","#111","#222","#333","#444","#555"]}',
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
        $this->assertEquals('#000', json_decode($solve->config, true)['colors'][0]);
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
            'config' => '{"colors":["#000","#111","#222","#333","#444","#555"]}',
            'scrambleId' => $scramble->id,
            'solution' => '100:X 200:X- 1000#START 2000:R 3000:U- 4000:R- 5000#END',
        ]);

        $response->assertStatus(200);
        $data = json_decode($response->getContent(), true);

        // one solve should now exist in our database
        $solve = Solve::find($data['solve']['id']);

        $this->assertEquals(1, Solve::count());
        $this->assertEquals($user->id, $solve->user_id);
        $this->assertEquals(4000, $solve->time);
        $this->assertEquals(1, count($data['recentSolves']));
        $this->assertNull($data['recordAverage']);

        // adding 5 more solves should return a record average
        for ($i = 0; $i < 3; $i++) {
            Factory::create(new Solve, [
                'user_id' => $user->id,
                'scramble_id' => self::createScramble('R')->id,
            ])->complete("0#START 5000:R- 10000#END");
        }

        $scramble2 = self::createScramble('R');

        $solve2 = Factory::create(new Solve, [
            'scramble_id' => $scramble2->id,
            'user_id' => $user->id,
        ]);

        $response2 = $this->post("/api/speedcube/speedcube/solves", [
            'config' => '{"colors":["#000","#111","#222","#333","#444","#555"]}',
            'scrambleId' => $scramble2->id,
            'solution' => '100:X 200:X- 1000#START 2000:R 3000:U- 4000:R- 5000#END',
        ]);

        $data2 = json_decode($response2->getContent(), true);
        
        $this->assertEquals(1, $data2['recordAverage']['id']);
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
        // create a user and scramble
        $user = Factory::registerUser();

        $scramble = Factory::createScrambleWithTurns('R');

        // create and complete a solve, we should be able to find this
        $solve = Factory::create(new Solve, [
            'scramble_id' => $scramble->id,
            'user_id' => $user->id,
        ]);

        $solve->complete('500#START 1000:R- 1500#END');
        
        $response = $this->get("/api/speedcube/speedcube/solves/{$solve->id}");
        $data = json_decode($response->getContent(), true);
        
        $this->assertEquals($solve->id, $data['solve']['id']);
        $this->assertEquals($solve->scramble->id, $data['solve']['scramble']['id']);
        $this->assertEquals($solve->user->username, $data['solve']['user']['username']);
    
        // solves that aren't complete should fail
        $pendingSolve = Factory::create(new Solve, [
            'scramble_id' => $scramble->id,
            'user_id' => $user->id,
        ]);

        $failedResponse = $this->get("/api/speedcube/speedcube/solves/{$pendingSolve->id}");
        $failedData = json_decode($failedResponse->getContent(), true);

        $failedResponse->assertStatus(500);
        $this->assertEquals('failed', $failedData['status']);
    }

    //
    // highlighted
    //
    public function test_fetching_the_highlighted_solve()
    {
        // scaffold a user, scramble, and solve
        $user = Factory::registerUser();

        $scramble = Factory::create(new Scramble, ['puzzle' => '3x3']);
        $scramble->scramble = 'R';
        $scramble->save();

        // throw a junk dnf solve in, this shouldn't be returned
        Factory::create(new Solve, [
            'scramble_id' => $scramble->id,
            'solution' => '500#START 1000:F 1500#END',
            'status' => 'dnf',
        ]);

        // create our record solve
        $solve = Factory::create(new Solve, [
            'scramble_id' => $scramble->id,
            'solution' => '500#START 1000:R- 2000#END',
            'status' => 'complete',
            'user_id' => $user->id,
        ]);

        // fetch the highlighted solve
        $response = $this->get('/api/speedcube/speedcube/solves/highlighted');

        $data = json_decode($response->getContent(), true);

        // we should have a solve with the user summary and scramble
        $response->assertStatus(200);
        $this->assertEquals($scramble->id, $data['solve']['scramble']['id']);
        $this->assertEquals($solve->id, $data['solve']['id']);
        $this->assertEquals($user->id, $data['solve']['user']['id']);
    }

    //
    // log replay watch
    //
    public function test_logging_a_replay_watch()
    {
        // create a user and scramble
        $user = Factory::registerUser();

        $scramble = Factory::createScrambleWithTurns('R');

        // create and complete a solve, we should be able to find this
        $solve = Factory::create(new Solve, [
            'scramble_id' => $scramble->id,
            'user_id' => $user->id,
        ]);

        $solve->complete('500#START 1000:R- 1500#END');

        // log a replay watch
        $success = $this->post("/api/speedcube/speedcube/solves/replay/{$solve->id}");
        $success->assertStatus(200);

        // test logging a replay for a non-existant solve
        $failed = $this->post("/api/speedcube/speedcube/solves/replay/12345");
        $failed->assertStatus(500);
    }
}
