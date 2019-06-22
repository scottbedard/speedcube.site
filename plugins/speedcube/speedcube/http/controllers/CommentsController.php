<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Auth;
use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\Comment;

class CommentsController extends ApiController
{
    /**
     * Create a comment.
     */
    public function create()
    {
        $data = input();

        $user = Auth::getUser();
        
        $comment = new Comment;
        $comment->body = array_get($data, 'body');
        $comment->commentable_id = array_get($data, 'commentable_id');
        $comment->commentable_type = array_get($data, 'commentable_type');
        $comment->user_id = $user->id;
        $comment->save();

        return $this->success([
            'comment' => $comment,
        ]);
    }

    /**
     * Get comments for a model.
     */
    public function find($type, $id)
    {
        //
        // params
        //
        $params = input();
        $order = array_get($params, 'order', 'created_at,desc');
        $pageSize = 20;

        //
        // query
        //
        $query = Comment::for($type, $id)->withUserSummary();

        if ($order) {
            $parts = explode(',', $order);
            $column = trim($parts[0]);
            $direction = trim($parts[1]);

            $query->orderBy($column, $direction);
        }

        $results = $query->paginate($pageSize);

        //
        // response
        //
        return $this->success([
            'comments' => $results->items(),
            'pagination' => [
                'currentPage' => $results->currentPage(),
                'lastPage' => $results->lastPage(),
                'results' => $results->total(),
            ],
        ]);
    }
}