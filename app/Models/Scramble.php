<?php

namespace App\Models;

use App\Models\BaseModel;
use App\Models\Solve;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Scramble extends BaseModel
{
    use HasFactory;

    /**
     * Default attributes.
     */
    public $attributes = [];

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
     * Solves.
     */
    public function solves()
    {
        return $this->hasMany(Solve::class);
    }
}
