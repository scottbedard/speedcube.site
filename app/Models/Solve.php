<?php

namespace App\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Solve extends BaseModel
{
    use HasFactory;

    /**
     * Default attributes.
     */
    public $attributes = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];
}
