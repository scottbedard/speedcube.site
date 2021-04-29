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
        $user = Auth::user();

        $context = Utils::camelKeysRecursive([
            'keyboard_configs' => $user
                ? $user->keyboardConfigs()->get()
                : [],
            'puzzle_configs' => $user
                ? $user->puzzleConfigs()->get()
                : [],
            'user' => $user,
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
