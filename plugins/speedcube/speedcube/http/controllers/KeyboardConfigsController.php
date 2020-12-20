<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Auth;
use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\Config;

/**
 * Keyboard Configs
 */
class KeyboardConfigsController extends ApiController
{
    /**
     * Create a new config.
     */
    public function create()
    {
        $data = post();

        $user = Auth::getUser();

        $model = $user->keyboardConfigs()->create([
            'data' => $data['data'],
            'puzzle_id' => $data['puzzle_id'],
        ]);
        
        return $this->success([
            'model' => $model,
        ]);
    }
}
