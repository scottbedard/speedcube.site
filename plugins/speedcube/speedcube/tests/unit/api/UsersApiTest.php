<?php

namespace Speedcube\Speedcube\Tests\Unit\Api;

use Auth;
use Carbon\Carbon;
use RainLab\User\Models\User;
use Speedcube\Speedcube\Models\Solve;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class UsersApiTest extends PluginTestCase
{
    // helper command to scaffold users
    public static function createUsers($num)
    {
        for ($x = 0; $x < $num; $x++) {
            Factory::registerUser();
        }
    }

    // helper to scaffold solves for a user
    public static function createSolves($user, $num)
    {
        for ($x = 0; $x < $num; $x++) {
            $scramble = Factory::createScrambleWithTurns('R U R-');

            $solve = Factory::create(new Solve, [
                'scramble_id' => $scramble->id,
                'user_id' => $user->id,
            ]);

            $solve->complete('0#START 100:R 200:U- 300:R- 400#END');
        }
    }

    public function test_getting_users()
    {
        self::createUsers(10);

        $response = $this->get('/api/speedcube/speedcube/users?orderBy=id,desc&skip=2&take=5');

        $response->assertStatus(200);

        $data = json_decode($response->getContent(), true);

        // test that pagination worked
        $this->assertEquals(10, $data['pagination']['totalUsers']);
        $this->assertEquals(2, $data['pagination']['totalPages']);
        $this->assertEquals(5, $data['pagination']['pageSize']);
        $this->assertEquals(5, count($data['users']));

        // test that skipping and sorting worked
        $this->assertEquals(8, $data['users'][0]['id']);
        $this->assertEquals(4, $data['users'][4]['id']);
    }

    public function test_getting_solves()
    {
        // scaffold a user and some solves
        $user = Factory::registerUser();
        self::createSolves($user, 10);
        
        // fetch the users solves
        $response = $this->get("/api/speedcube/speedcube/users/{$user->username}/solves");
        $response->assertStatus(200);
        $data = json_decode($response->getContent(), true);

        // we should have 10 of them
        $this->assertEquals(10, count($data['solves']));
    }

    public function test_getting_solves_between_date_range()
    {
        $user = Factory::registerUser();
        
        // create some solves over a few days
        $before = Factory::createScrambleWithTurns('R U R-');
        $during = Factory::createScrambleWithTurns('R U R-');
        $after = Factory::createScrambleWithTurns('R U R-');

        Factory::create(new Solve, [
            'created_at' => Carbon::now()->subDays(4),
            'scramble_id' => $before->id,
            'user_id' => $user->id,
        ])->complete('0#START 100:R 200:U- 300:R- 400#END');

        $solve = Factory::create(new Solve, [
            'created_at' => Carbon::now()->subDays(2),
            'scramble_id' => $during->id,
            'user_id' => $user->id,
        ]);
        
        $solve->complete('0#START 100:R 200:U- 300:R- 400#END');

        Factory::create(new Solve, [
            'created_at' => Carbon::now(),
            'scramble_id' => $after->id,
            'user_id' => $user->id,
        ])->complete('0#START 100:R 200:U- 300:R- 400#END');
        
        // fetch only the middle solve
        $start = Carbon::now()->subDays(3)->toDateTimeString();
        $end = Carbon::now()->subDays(1)->toDateTimeString();

        $response = $this->get("/api/speedcube/speedcube/users/{$user->username}/solves?date={$start},{$end}");
        $response->assertStatus(200);

        $data = json_decode($response->getContent(), true);
        
        // we should have gotten only that solve
        $this->assertEquals(1, count($data['solves']));
        $this->assertEquals($solve->id, $data['solves'][0]['id']);
    }

    public function test_getting_solves_for_certain_puzzles()
    {
        $user = Factory::registerUser();
        
        // create some solves over a few days
        $scrambleA = Factory::createScrambleWithTurns('R U R-', '2x2');
        $scrambleB = Factory::createScrambleWithTurns('R U R-', '3x3');
        $scrambleC = Factory::createScrambleWithTurns('R U R-', '4x4');

        $solveA = Factory::create(new Solve, [
            'created_at' => Carbon::now()->subDays(4),
            'scramble_id' => $scrambleA->id,
            'user_id' => $user->id,
        ]);
        
        $solveA->complete('0#START 100:R 200:U- 300:R- 400#END');

        $solveB = Factory::create(new Solve, [
            'created_at' => Carbon::now()->subDays(2),
            'scramble_id' => $scrambleB->id,
            'user_id' => $user->id,
        ]);
        
        $solveB->complete('0#START 100:R 200:U- 300:R- 400#END');

        Factory::create(new Solve, [
            'created_at' => Carbon::now(),
            'scramble_id' => $scrambleC->id,
            'user_id' => $user->id,
        ])->complete('0#START 100:R 200:U- 300:R- 400#END');
        
        // fetch only the 2x2 and 3x3 solves
        $response = $this->get("/api/speedcube/speedcube/users/{$user->username}/solves?puzzle=2x2,3x3&order=id,asc");
        $response->assertStatus(200);

        $data = json_decode($response->getContent(), true);
        
        // we should have gotten only that solve
        $this->assertEquals(2, count($data['solves']));
        $this->assertEquals($solveA->id, $data['solves'][0]['id']);
        $this->assertEquals($solveB->id, $data['solves'][1]['id']);
    }

    public function test_fetching_the_authenticated_user()
    {
        // users must be authenticated
        $xhr1 = $this->get('/api/speedcube/speedcube/user');
        $xhr1->assertStatus(403);

        // create and auth a user
        $user = Factory::registerUser();

        // fetch the authenticated user
        $xhr2 = $this->get('/api/speedcube/speedcube/user');
        $xhr2->assertStatus(200);
        $data = json_decode($xhr2->getContent(), true);
        $this->assertEquals($user->id, $data['user']['id']);
    }
}
