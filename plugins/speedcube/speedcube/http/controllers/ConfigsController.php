<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Auth;
use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\Config;

/**
 * Configs
 */
class ConfigsController extends ApiController
{
    /**
     * Create
     */
    public function create()
    {
        $data = post();

        $user = Auth::getUser();

        $model = $user->configs()->create([
            'puzzle_id' => $data['puzzle_id'],
            'json' => $data['json'],
        ]);
        
        return $this->success([
            'model' => $model,
        ]);
    }
}
