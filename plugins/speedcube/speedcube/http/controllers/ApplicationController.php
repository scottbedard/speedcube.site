<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Auth;
use Illuminate\Routing\Controller;

class ApplicationController extends Controller
{
    /**
     * Index.
     */
    public function index()
    {
        return 'Hello from the index';
    }
}
