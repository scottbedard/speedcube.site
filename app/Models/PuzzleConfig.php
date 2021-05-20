<?php

namespace App\Models;

use App\Models\BaseModel;
use App\Models\Solve;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PuzzleConfig extends BaseModel
{
    use HasFactory;

    /**
     * Default attributes.
     */
    public $attributes = [
        'config' => '{}',
        'is_active' => true,
        'puzzle' => '',
        'user_id' => 0,
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'config',
        'is_active',
        'puzzle',
        'user_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at',
        'id',
        'is_active',
        'updated_at',
        'user_id',
    ];

    /**
     * Boot
     */
    public static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            if ($model->is_active) {
                $model->deactivateOtherConfigs();
            }
        });
    }

    /**
     * Deactivate old puzzles.
     */
    public function deactivateOtherConfigs()
    {
        self::isActive()
            ->where('puzzle', $this->puzzle)
            ->where('user_id', $this->user_id)
            ->update([
                'is_active' => false,
            ]);
    }

    /**
     * Select active puzzle configs.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeIsActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Solves.
     */
    public function solves()
    {
        return $this->hasMany(Solve::class);
    }

    /**
     * User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
