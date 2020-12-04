<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Bedard\RainLabUserApi\Classes\AccountManager;
use Illuminate\Routing\Controller;
use Speedcube\Speedcube\Classes\Util;
use View;

/**
 * Single page application
 */
class SpaController extends Controller
{
    /**
     * Index
     */
    public function index()
    {
        $user = AccountManager::getAuthenticatedUser();

        if ($user) {
            $user->load('activeConfigs');
        }

        $data = Util::camelCaseKeysRecursive([
            'context' => [
                'user' => $user,
            ],
        ]);

        return View::make('speedcube.speedcube::index', $data);
    }
}
