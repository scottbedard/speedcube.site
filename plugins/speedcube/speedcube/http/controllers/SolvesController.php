<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Auth;
use Exception;
use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\Solve;

class SolvesController extends ApiController
{
    /**
     * Create a solve.
     * 
     * @return Response
     */
    public function create()
    {
        $data = input();

        try {
            $user = Auth::getUser();

            $solve = Solve::create([
                'scramble_id' => $data['scrambleId'],
                'solution' => $data['solution'],
                'user_id' => $user ? $user->id : null,
            ]);

            // success
            return $this->success([
                'solve' => $solve->toArray(),
            ]);
        } catch (Exception $e) {
            // failure
            return $this->failed($e);
        }
    }

    /**
     * Get the fastest solves of all time.
     * 
     * @return Response
     */
    public function index()
    {
        try {
            $data = input();
            $size = array_key_exists('cubeSize', $data) ? $data['cubeSize'] : 3;

            $solves = Solve::rated()
                ->size($size)
                ->fastest()
                ->select([
                    'average_speed',
                    'created_at',
                    'cube_size',
                    'id',
                    'moves',
                    'time',
                    'user_id',
                ])
                ->limit(20)
                ->withUserSummary()
                ->get();

            return $this->success([
                'solves' => $solves,
            ]);
        } catch (Exception $e) {
            return $this->failed($e);
        }
    }
}
