<?php

namespace Speedcube\Speedcube\Tests\Unit\Api;

use Auth;
use Speedcube\Speedcube\Classes\Utils;
use Speedcube\Speedcube\Models\Scramble;
use Speedcube\Speedcube\Models\Solve;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class ShieldsApiTest extends PluginTestCase
{
    // helper function to create an easily solved scramble
    public static function createScramble($turns = '', $puzzle = '3x3') {
        $scramble = Factory::create(new Scramble, ['puzzle' => $puzzle]);
        $scramble->scramble = $turns;
        $scramble->save();

        return $scramble;
    }

    public function test_fetching_records_for_a_puzzle()
    {
        // scaffold a user and begin generating a solve
        $user = Factory::registerUser();
        
        $scramble = self::createScramble('R U R-');

        $solve = Factory::create(new Solve, [
            'scramble_id' => $scramble->id,
            'user_id' => $user->id,
        ]);

        // complete the solve
        Auth::login($user);

        $this->post("/api/speedcube/speedcube/solves", [
            'config' => '{"colors":["#000","#111","#222","#333","#444","#555"]}',
            'scrambleId' => $scramble->id,
            'solution' => '100:X 200:X- 1000#START 2000:R 3000:U- 4000:R- 5000#END',
        ]);

        // fetch the record solve
        $response = $this->get('/shields/single/3x3');
        $response->assertStatus(200);

        // our badge should display the record time
        $data = json_decode($response->getContent(), true);
        $this->assertEquals($scramble->puzzle, $data['label']);
        $this->assertEquals(Utils::formatShortTime($solve->fresh()->time), $data['message']);
    }

    public function test_fetching_records_for_a_puzzle_and_username()
    {
        // user 1
        $user1 = Factory::registerUser();

        $scramble1 = self::createScramble('R U R-', '3x3');

        $solve1 = Factory::create(new Solve, [
            'scramble_id' => $scramble1->id,
            'user_id' => $user1->id,
        ]);

        // user 2
        $user2 = Factory::registerUser();

        $scramble2 = self::createScramble('R U R-', '3x3');

        $solve2 = Factory::create(new Solve, [
            'scramble_id' => $scramble2->id,
            'user_id' => $user2->id,
        ]);

        // complete the solve for user 1
        Auth::login($user1);

        $this->post("/api/speedcube/speedcube/solves", [
            'config' => '{"colors":["#000","#111","#222","#333","#444","#555"]}',
            'scrambleId' => $scramble1->id,
            'solution' => '100:X 200:X- 1000#START 2000:R 3000:U- 4000:R- 5000#END',
        ]);

        // complete the solve for user 2, slower than user 1
        Auth::login($user2);

        $this->post("/api/speedcube/speedcube/solves", [
            'config' => '{"colors":["#000","#111","#222","#333","#444","#555"]}',
            'scrambleId' => $scramble2->id,
            'solution' => '100:X 200:X- 1000#START 2000:R 3000:U- 5000:R- 6000#END',
        ]);

        // fetch user 2's record solve
        $response = $this->get("/shields/single/3x3?username={$user2->username}");
        $response->assertStatus(200);

        // our badge should display user 2's record solve time
        $data = json_decode($response->getContent(), true);
        $this->assertEquals($scramble2->puzzle, $data['label']);
        $this->assertEquals(Utils::formatShortTime($solve2->fresh()->time), $data['message']);
    }

    public function test_redirect_to_replay()
    {
        // scaffold a user and begin generating a solve
        $user = Factory::registerUser();
        
        $scramble = self::createScramble('R U R-');

        $solve = Factory::create(new Solve, [
            'scramble_id' => $scramble->id,
            'user_id' => $user->id,
        ]);

        // complete the solve
        Auth::login($user);

        $this->post("/api/speedcube/speedcube/solves", [
            'config' => '{"colors":["#000","#111","#222","#333","#444","#555"]}',
            'scrambleId' => $scramble->id,
            'solution' => '100:X 200:X- 1000#START 2000:R 3000:U- 4000:R- 5000#END',
        ]);

        // we should be redirected to the replay url
        $response = $this->get('/shields/single/3x3/replay');
        $response->assertRedirect("/replay/{$solve->id}");
    }
}
