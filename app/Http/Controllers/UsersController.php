<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    /**
     * Store
     */
    public function store(Request $request)
    {
        $user = User::create([
            'email' => $request->email,
            'name' => $request->name,
            'password_confirmation' => $request->password_confirmation,
            'password' => $request->password,
            'username' => $request->username,
        ]);

        Auth::login($user);
    
        return [
            'user' => $user,
        ];
    }
}
