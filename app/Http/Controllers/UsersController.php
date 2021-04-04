<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

class UsersController extends Controller
{
    /**
     * Forgot password
     */
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink($request->only('email'));

        return [
            'status' => $status
        ];
    }

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
