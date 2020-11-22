<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Auth;
use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\PuzzleConfig;

/**
 * Puzzle Configs
 */
class PuzzleConfigsController extends ApiController
{
    /**
     * Create
     */
    public function create()
    {
        $data = post();

        $user = Auth::getUser();

        $model = $user->puzzleConfigs()->create([
            'puzzle_id' => $data['puzzle_id'],
            'json' => $data['json'],
        ]);
        
        return $this->success([
            'model' => $model,
        ]);
    }
}
