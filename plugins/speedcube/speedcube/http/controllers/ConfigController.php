<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Auth;
use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\Config;

class ConfigController extends ApiController
{
    /**
     * Get all configs for a user.
     * 
     * @return Response
     */
    public function index()
    {
        $user = Auth::getUser();
        $configs = $user->configs()->get();

        return $this->success([
            'configs' => $configs->toArray(),
        ]);
    }

    /**
     * Save a config.
     * 
     * @return Response
     */
    public function save()
    {
        $data = input();
        $user = Auth::getUser();

        // find the config being modified
        $config = $user->configs()->where('puzzle', $data['key'])->first();

        // update the config if it exists
        if ($config) {
            $config->config = $data['config'];
            $config->save();
        }

        // otherwise create a new entry
        else {
            Config::create([
                'config' => $data['config'],
                'puzzle' => $data['key'],
                'user_id' => $user->id,
            ]);
        }
        
        // return all of the user's configs
        return $this->success([
            'configs' => $user->configs()->get()->toArray(),
        ]);
    }
}
