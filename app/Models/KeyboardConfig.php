<?php

namespace App\Models;

use App\Models\BaseModel;
use App\Models\Traits\PuzzleAlias;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class KeyboardConfig extends BaseModel
{
    use HasFactory,
        PuzzleAlias;

    /**
     * Default attributes.
     */
    public $attributes = [
        'config' => '{}',
        'puzzle_id' => 0,
        'user_id' => 0,
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'config',
        'puzzle_id',
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
        'puzzle_id',
        'updated_at',
        'user_id',
    ];

    /**
     * User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
