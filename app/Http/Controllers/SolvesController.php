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
        $scramble = Twister::scramble($request->puzzle);

        $solve = Solve::create([
            'puzzle' => $request->puzzle,
            'scramble' => $scramble['scramble'],
            'user_id' => Auth::id(),
        ]);

        return [
            'solve_id' => $solve->id,
            'state' => $scramble['state'],
        ];
    }
}
