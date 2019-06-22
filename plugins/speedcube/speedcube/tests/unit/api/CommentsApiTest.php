<?php

namespace Speedcube\Speedcube\Tests\Unit\Api;

use Speedcube\Speedcube\Models\Comment;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class CommentsApiTest extends PluginTestCase
{
    public function test_commenting_on_a_solve()
    {
        $user = Factory::authenticatedUser();
        $solve = Factory::completedSolve($user);

        // comment on the solve
        $response = $this->post('/api/speedcube/speedcube/comments', [
            'body' => 'What an awesome solve!',
            'commentable_id' => $solve->id,
            'commentable_type' => 'Speedcube\Speedcube\Models\Solve',
            'user_id' => $user->id,
        ]);

        // $response->assertStatus(200);

        $data = json_decode($response->getContent(), true);

        // we should now have one comment in the database
        $comment = Comment::first();

        $this->assertEquals(1, Comment::count());
        $this->assertEquals($user->id, $comment->user_id);
        $this->assertEquals('What an awesome solve!', $comment->body);
    }
}
