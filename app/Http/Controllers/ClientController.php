<?php

namespace App\Http\Controllers;

use App\Classes\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class ClientController extends Controller
{
    /**
     * Single page application.
     */
    public function index()
    {
        $context = Utils::camelKeysRecursive([
            'user' => Auth::user(),
        ]);

        $local = app()->environment('local');

        $manifest = json_decode(File::get(public_path('dist/manifest.json')), true);

        return view('index', [
            'context' => json_encode($context),
            'local' => $local,
            'manifest' => $manifest,
        ]);
    }

    /**
     * Development assets
     */
    public function vite($path)
    {
        return File::get(base_path('client/src') . '/' . $path);
    }
}
