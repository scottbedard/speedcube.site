<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Auth;
use Exception;
use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\KeyboardConfig;

class KeyboardConfigController extends ApiController
{
    /**
     * Save a keyboard config.
     * 
     * @return Response
     */
    public function save()
    {
        $data = input();
        $config = array_get($data, 'config', []);
        $puzzle = array_get($data, 'puzzle', '');
        $user = Auth::getUser();
        
        // find the user's keyboard config
        $model = $user
            ->keyboardConfigs()
            ->wherePuzzle($puzzle)
            ->first();

        // create and return a new config if none exists for this puzzle
        if ($model === null) {
            $keyboardConfig = KeyboardConfig::create([
                'config' => $config,
                'puzzle' => $puzzle,
                'user_id' => $user->id,
            ]);

            return $this->success([
                'keyboardConfig' => $keyboardConfig,
            ]);
        }
        
        // otherwise update the existing keyboard config
    }
}
