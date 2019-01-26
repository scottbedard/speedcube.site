<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Auth;
use Exception;
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
        try {
            $data = input();
            $config = array_get($data, 'config', []);
            $puzzle = array_get($data, 'puzzle');
            $user = Auth::getUser();

            // update an existing configuration if one exists
            $existingConfig = $user
                ->configs()
                ->where('puzzle', $puzzle)
                ->first();

            if ($existingConfig) {
                $existingConfig->config = $config;
                $existingConfig->save();
            }

            // otherwise create a new config model
            else {
                Config::create([
                    'config' => $config,
                    'puzzle' => $puzzle,
                    'user_id' => $user->id,
                ]);
            }

            // return all of the user's config models
            return $this->success([
                'configs' => $user->configs()->get(),
            ]);
        } catch (Exception $err) {
            return $this->failed($err);
        }
    }
}
