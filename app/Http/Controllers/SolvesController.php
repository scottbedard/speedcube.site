<?php

namespace App\Http\Controllers;

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
        $solve = Solve::create([
            'puzzle' => $request->puzzle,
            'user_id' => Auth::id(),
        ]);

        return [
            'solve' => $solve,
        ];
    }
}
