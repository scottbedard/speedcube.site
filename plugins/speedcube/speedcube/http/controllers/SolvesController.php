<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Auth;
use Illuminate\Support\Arr;
use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\Solve;

/**
 * Solves
 */
class SolvesController extends ApiController
{
    /**
     * Create
     */
    public function create()
    {
        $data = post();

        $user = Auth::getUser();

        $model = Solve::create([
            'puzzle_id' => $data['puzzle_id'],
            'user_id' => $user ? $user->id : 0,
        ]);

        return $this->success([
            'model' => Arr::only($model->toArray(), [
                'id',
                'puzzle_id',
                'scrambled_state',
                'user_id',
            ]),
        ]);
    }
}
