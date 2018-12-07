<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Exception;
use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\Scramble;

class ScramblesController extends ApiController
{
    /**
     * Create a solve.
     * 
     * @return Response
     */
    public function create()
    {
        try{
            $params = input();

            $scramble = Scramble::create([
                'cube_size' => $params['cubeSize'],
            ]);
            
        } catch (Exception $err) {
            return $this->failed($err);
        }
        
        return $this->success([
            'id' => $scramble->id,
            'scrambled_state' => json_decode($scramble->scrambled_state, true),
        ]);
    }
}
