<?php

namespace App\Models;

use App\Models\BaseModel;
use App\Models\KeyboardConfig;
use App\Models\PuzzleConfig;
use App\Models\Solve;
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
        'allow_comments' => true,
        'email_verified_at' => null,
        'email' => '',
        'public_solves' => true,
        'public_stats' => true,
        'username' => '',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'allow_comments' => 'boolean',
        'email_verified_at' => 'datetime',
        'public_solves' => 'boolean',
        'public_stats' => 'boolean',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'allow_comments',
        'current_password',
        'email',
        'password_confirmation',
        'password',
        'public_solves',
        'public_stats',
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

        static::updating(function ($model) {
            $model->prohibitUsernameChanges();
        });
    }

    /**
     * Test the current password attribute.
     */
    protected function checkCurrentPassword()
    {
        if (!Hash::check($this->current_password, $this->getRawOriginal('password'))) {
            throw ValidationException::withMessages([
                'current_password' => [
                    __('validation.password'),
                ],
            ]);
        }
    }

    /**
     * Keyboard configs.
     */
    public function keyboardConfigs()
    {
        return $this->hasMany(KeyboardConfig::class);
    }

    /**
     * Load recent solve.
     *
     * @param int $quantity
     * @param string $puzzle
     */
    public function loadRecentSolves(int $quantity, string $puzzle)
    {
        $this->load([
            'solves' => function ($query) use ($quantity, $puzzle) {
                $query
                    ->select([
                        'id',
                        'puzzle_id',
                        'status',
                        'time',
                        'user_id',
                    ])
                    ->puzzle($puzzle)
                    ->limit($quantity)
                    ->latest();
            },
        ]);
    }

    /**
     * Prevent a user from modifying their username.
     */
    protected function prohibitUsernameChanges()
    {
        if ($this->isDirty('username')) {
            throw ValidationException::withMessages([
                'current_password' => [
                    __('validation.prohibited', ['attribute' => 'username'])
                ],
            ]);
        }
    }

    /**
     * Active puzzle configs.
     */
    public function puzzleConfigs()
    {
        return $this->hasMany(PuzzleConfig::class)->isActive();
    }

    /**
     * Solves.
     */
    public function solves()
    {
        return $this->hasMany(Solve::class);
    }
}
