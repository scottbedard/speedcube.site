<?php

namespace App\Models;

use App\Models\BaseModel;
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
        'config' => 'array',
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
     * User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
