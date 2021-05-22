<?php

namespace App\Http\Controllers;

use App\Classes\Twister;
use App\Models\Solve;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SolvesController extends Controller
{
    /**
     * Store
     */
    public function store(Request $request)
    {
        $userId = Auth::id();

        $scramble = Twister::scramble($request->puzzle);

        $solve = Solve::create([
            'puzzle' => $request->puzzle,
            'scramble' => $scramble['scramble'],
            'user_id' => $userId,
        ]);

        if ($userId) {
            Solve::pending()
                ->where('user_id', $userId)
                ->where('id', '<>', $solve->id)
                ->update([
                    'status' => 'dnf',
                    'updated_at' => now(),
                ]);
        }

        return [
            'solve_id' => $solve->id,
            'state' => $scramble['state'],
        ];
    }
}
