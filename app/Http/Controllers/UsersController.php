<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Store
     */
    public function store(Request $request)
    {
        $data = $request->post();

        $user = User::create($data);
    
        return [
            'user' => $user,
        ];
    }
}
