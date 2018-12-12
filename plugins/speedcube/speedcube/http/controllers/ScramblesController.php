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
        try{
            $user = Auth::getUser();
            $params = input();

            // create a scramble
            $scramble = Scramble::create([
                'cube_size' => $params['cubeSize'],
            ]);
            
            // create a solve if the user is signed in
            if ($user) {
                $scramble->solves()->create([
                    'scramble_id' => $scramble->id,
                    'user_id' => $user->id,
                ]);
            }
        } catch (Exception $err) {
            return $this->failed($err);
        }
        
        return $this->success([
            'id' => $scramble->id,
            'scrambled_state' => json_decode($scramble->scrambled_state, true),
        ]);
    }
}
