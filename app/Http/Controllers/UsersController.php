<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
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
        $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink($request->only('email'));

        return [
            'success' => $status === Password::RESET_LINK_SENT,
        ];
    }

    /**
     * Reset password
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
            'token' => 'required',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'), 
            function ($user, $password) use ($request) {
                $user->password = $password;
                $user->password_confirmation = $password;
                $user->save();

                event(new PasswordReset($user));
            }
        );

        return [
            'success' => $status == Password::PASSWORD_RESET,
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
