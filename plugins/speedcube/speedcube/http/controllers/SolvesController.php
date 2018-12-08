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
    public function fastestAllTime()
    {
        try {
            $data = input();
            $size = array_key_exists('cube_size', $data) ? $data['cube_size'] : 3;

            $solves = Solve::rated()
                ->size($size)
                ->fastest()
                ->limit(20)
                ->get();

            return $this->success([
                'solves' => $solves,
            ]);
        } catch (Exception $e) {
            dd($e->getMessage());
            return $this->failed($e);
        }
    }
}
