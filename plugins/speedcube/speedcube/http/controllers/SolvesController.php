<?php

namespace Speedcube\Speedcube\Http\Controllers;

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

        $solve = Solve::create([
            'size' => $data['size'],
        ]);

        $state = $solve->getScrambledState();
        
        return $this->success([
            'id' => $solve->id,
            'state' => $state,
        ]);
    }
}
