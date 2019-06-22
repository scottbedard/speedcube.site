<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\Comment;

class CommentsController extends ApiController
{
    public function create()
    {
        $comment = Comment::create(input());

        return $this->success([
            'comment' => $comment,
        ]);
    }
}