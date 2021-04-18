<?php

namespace App\Http\Controllers;

use App\Models\PuzzleConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PuzzleConfigsController extends Controller
{
    /**
     * Store
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        PuzzleConfig::create([
            'config' => $request->config,
            'puzzle' => $request->puzzle,
            'user_id' => $user->id,
        ]);

        return [
            'puzzle_configs' => $user->puzzleConfigs()->get(),
        ];
    }
}
