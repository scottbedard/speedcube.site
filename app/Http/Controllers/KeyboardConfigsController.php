<?php

namespace App\Http\Controllers;

use App\Models\KeyboardConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KeyboardConfigsController extends Controller
{
    /**
     * Store
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        KeyboardConfig::create([
            'config' => $request->config,
            'puzzle' => $request->puzzle,
            'user_id' => $user->id,
        ]);

        return [
            'keyboard_configs' => $user->keyboardConfigs()->get(),
        ];
    }
}
