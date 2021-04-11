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
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class User extends BaseModel implements
    AuthenticatableContract,
    AuthorizableContract,
    CanResetPasswordContract
{
    use Authenticatable,
        Authorizable,
        CanResetPassword,
        HasFactory,
        MustVerifyEmail,
        Notifiable;

    /**
     * Default attributes.
     */
    public $attributes = [
        'email_verified_at' => null,
        'email' => '',
        'username' => '',
    ];

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
        'current_password',
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
        'current_password',
        'password_confirmation',
        'password',
        'remember_token',
    ];

    /**
     * Attributes to remove before saving.
     *
     * @var array
     */
    public $purgeable = [
        'current_password',
        'password_confirmation',
    ];

    /**
     * Validation rules.
     *
     * @var array
     */
    public $rules = [
        'current_password' => ['required_with_update:password'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique'],
        'password' => ['required_create', 'string', 'confirmed', 'min:8'],
        'username' => ['required', 'string', 'between:2,255', 'unique'],
    ];

    /**
     * Boot.
     */
    public static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            if ($model->current_password) {
                $model->checkCurrentPassword();
            }
        });
    }

    /**
     * Test the current password attribute.
     */
    protected function checkCurrentPassword()
    {
        if (!Hash::check($this->current_password, $this->getRawOriginal('password'))) {
            throw ValidationException::withMessages([
                'current_password' => [__('validation.password')],
            ]);
        }
    }
}
