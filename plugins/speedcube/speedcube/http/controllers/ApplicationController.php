<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Auth;
use File;
use Illuminate\Routing\Controller;

class ApplicationController extends Controller
{
    /**
     * Index.
     */
    public function index()
    {
        return view('speedcube.speedcube::index');
    }
}
