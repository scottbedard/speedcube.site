<?php

namespace Speedcube\Speedcube\Http\Controllers;

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
            $solve = Solve::create([
                'scramble_id' => $data['scrambleId'],
                'solution' => $data['solution'],
            ]);

            // success
            return $this->success([
                'solve' => $solve->toArray(),
            ]);
        } catch (Exception $err) {
            // failure
            return $this->failed($err);
        }
    }
}
