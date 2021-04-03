<?php

namespace App\Models;

use App\Models\BaseModel;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\Access\Authorizable;

class User extends BaseModel implements
    AuthenticatableContract,
    AuthorizableContract,
    CanResetPasswordContract
{
    use Authenticatable, Authorizable, CanResetPassword, HasFactory, MustVerifyEmail;

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email',
        'password_confirmation',
        'password',
        'username',
    ];

    /**
     * The attributes to hash before saving.
     *
     * @var array
     */
    public $hashable = [
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Attributes to remove before saving.
     *
     * @var array
     */
    public $purgeable = [
        'password_confirmation',
    ];

    /**
     * Validation rules.
     *
     * @var array
     */
    public $rules = [
        'email' => ['required', 'string', 'email', 'max:255', 'unique'],
        'password' => ['required:create', 'string', 'confirmed', 'min:8'],
        'username' => ['required', 'string', 'between:2,255', 'unique'],
    ];
}
