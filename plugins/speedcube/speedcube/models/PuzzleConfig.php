<?php

namespace Speedcube\Speedcube\Models;

use Model;
use October\Rain\Exception\ValidationException;

/**
 * PuzzleConfig Model
 */
class PuzzleConfig extends Model
{
    use \October\Rain\Database\Traits\Validation;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'speedcube_speedcube_puzzle_configs';

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'puzzle_id',
        'json',
    ];

    /**
     * @var array Validation rules for attributes
     */
    public $rules = [
        'json' => 'required',
        'puzzle_id' => 'required|integer|min:0',
        'user_id' => 'required|integer|min:0',
    ];

    /**
     * @var array Attributes to be cast to native types
     */
    protected $casts = [
        'id' => 'integer',
        'puzzle_id' => 'integer',
        'user_id' => 'integer',
    ];

    /**
     * @var array Attributes to be cast to JSON
     */
    protected $jsonable = [
        'json',
    ];

    /**
     * @var array Attributes to be cast to Argon (Carbon) instances
     */
    protected $dates = [
        'created_at',
        'updated_at',
    ];

    /**
     * @var array Relations
     */
    public $belongsTo = [
        'user' => 'RainLab\User\Models\User',
    ];
}
