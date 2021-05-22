<?php

namespace App\Models;

use App\Models\BaseModel;
use App\Models\PuzzleConfig;
use App\Models\Traits\PuzzleAlias;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Solve extends BaseModel
{
    use HasFactory,
        PuzzleAlias;

    /**
     * Default attributes.
     */
    public $attributes = [
        'puzzle_id' => 0,
        'scramble' => '',
        'solution' => '',
        'status' => 'pending',
        'time' => 0,
        'turns' => 0,
        'user_id' => null,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'puzzle_id',
        'puzzle',
        'scramble',
        'user_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'puzzle_id',
        'updated_at',
    ];

    /**
     * Select status 'pending'
     */
    public function scopePending(Builder $query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Puzzle config.
     */
    public function puzzleConfig()
    {
        return $this->belongsTo(PuzzleConfig::class);
    }

    /**
     * User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
