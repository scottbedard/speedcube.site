<?php

namespace App\Http\Controllers;

use App\Classes\Twister;
use App\Models\PuzzleConfig;
use App\Models\Solve;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SolvesController extends Controller
{
    /**
     * Abort a solve.
     */
    public function abort(Request $request)
    {
        $userId = Auth::id();

        $solve = Solve::pending()
            ->where('user_id', $userId)
            ->findOrFail($request->solve_id);

        $solve->solution = $request->solution ?: '';
        $solve->status = 'dnf';

        $solve->save();

        return [
            'solve' => $solve,
        ];
    }

    /**
     * Complete a solve.
     */
    public function complete(Request $request)
    {
        $userId = Auth::id();

        $solve = Solve::pending()
            ->where('user_id', $userId)
            ->findOrFail($request->solve_id);
        
        $solve->applySolution($request->solution);

        $solve->save();

        return [
            'solve' => $solve,
        ];
    }

    /**
     * Store
     */
    public function store(Request $request)
    {
        $scramble = Twister::scramble($request->puzzle);
        $userId = Auth::id();
        $puzzleConfigId = null;

        if ($userId) {
            // close pending solves
            Solve::pending()
                ->where('user_id', $userId)
                ->update([
                    'status' => 'dnf',
                    'updated_at' => now(),
                ]);

            // apply user's puzzle config id
            $puzzleConfig = PuzzleConfig::where('user_id', $userId)
                ->puzzle($request->puzzle)
                ->isActive()
                ->latest()
                ->first();
            
            if ($puzzleConfig) {
                $puzzleConfigId = $puzzleConfig->id;
            }
        }

        $solve = Solve::create([
            'puzzle' => $request->puzzle,
            'puzzle_config_id' => $puzzleConfigId,
            'scramble' => $scramble['scramble'],
            'user_id' => $userId,
        ]);

        return [
            'solve_id' => $solve->id,
            'state' => $scramble['state'],
        ];
    }
}
