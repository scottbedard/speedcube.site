<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Illuminate\Routing\Controller;
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
        return View::make('speedcube.speedcube::index', [
            'context' => [
                'user' => null,
            ],
        ]);
    }
}
