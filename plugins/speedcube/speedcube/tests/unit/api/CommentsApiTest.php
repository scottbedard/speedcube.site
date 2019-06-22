<?php

namespace Speedcube\Speedcube\Tests\Unit\Api;

use Speedcube\Speedcube\Models\Comment;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class CommentsApiTest extends PluginTestCase
{
    public function test_commenting_on_a_solve()
    {
        // scaffold a user and solve
        $user = Factory::authenticatedUser();

        $solve = Factory::completedSolve($user);

        // comment on the solve
        $response = $this->post('/api/speedcube/speedcube/comments', [
            'body' => 'What an awesome solve!',
            'commentable_id' => $solve->id,
            'commentable_type' => 'Speedcube\Speedcube\Models\Solve',
        ]);

        $response->assertStatus(200);

        // we should now have one comment in the database
        $comment = Comment::first();
        $this->assertEquals(1, Comment::count());
        $this->assertEquals($user->id, $comment->user_id);
        $this->assertEquals('What an awesome solve!', $comment->body);

        // and that new solve should be returned
        $data = json_decode($response->getContent(), true);
        $this->assertEquals($comment->id, $data['comment']['id']);
    }

    public function test_getting_comments_for_a_solve()
    {
        // scaffold a user, solve, and comment
        $user = Factory::authenticatedUser();

        $solve = Factory::completedSolve($user);
        
        // add a handful of comments to the solve
        for ($i = 0; $i < 30; $i++) {
            $response = $this->post('/api/speedcube/speedcube/comments', [
                'body' => 'What an awesome solve!',
                'commentable_id' => $solve->id,
                'commentable_type' => 'Speedcube\Speedcube\Models\Solve',
            ]);
        }
        
        // fetch the comments for our solve
        $response = $this->get("/api/speedcube/speedcube/comments/solve/{$solve->id}");
        $response->assertStatus(200);

        // our paginated comment data should be returned
        $data = json_decode($response->getContent(), true);
        $this->assertEquals(20, count($data['comments']));
        $this->assertEquals(1, $data['pagination']['currentPage']);
        $this->assertEquals(2, $data['pagination']['lastPage']);
        $this->assertEquals(30, $data['pagination']['results']);
    }
}
