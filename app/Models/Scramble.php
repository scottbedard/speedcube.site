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
     * Solves.
     */
    public function solves()
    {
        return $this->hasMany(Solve::class);
    }
}
