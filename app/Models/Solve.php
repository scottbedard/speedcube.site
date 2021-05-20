<?php

namespace App\Models;

use App\Models\BaseModel;
use App\Models\PuzzleConfig;
use App\Models\Scramble;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Solve extends BaseModel
{
    use HasFactory;

    /**
     * Default attributes.
     */
    public $attributes = [
        'scramble_id' => 0,
        'solution' => '',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    /**
     * Puzzle config.
     */
    public function puzzleConfig()
    {
        return $this->belongsTo(PuzzleConfig::class);
    }

    /**
     * Scramble.
     */
    public function scramble()
    {
        return $this->belongsTo(Scramble::class);
    }

    /**
     * User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
