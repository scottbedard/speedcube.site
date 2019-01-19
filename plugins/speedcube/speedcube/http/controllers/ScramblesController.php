<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Auth;
use Exception;
use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\Scramble;
use Speedcube\Speedcube\Models\Solve;

class ScramblesController extends ApiController
{
    /**
     * Create a solve.
     * 
     * @return Response
     */
    public function create()
    {
        $user = Auth::getUser();
        $data = input();
        $puzzle = array_get($data, 'puzzle');

        // create a scramble
        $scramble = Scramble::create([
            'puzzle' => $puzzle,
        ]);
        
        // create a solve if the user is signed in
        if ($user) {
            $scramble->solves()->create([
                'scramble_id' => $scramble->id,
                'user_id' => $user->id,
            ]);
        }

        return $this->success([
            'id' => $scramble->id,
            'scrambled_state' => $scramble->scrambled_state,
        ]);
    }
}
