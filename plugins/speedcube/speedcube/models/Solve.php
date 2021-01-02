<?php namespace Speedcube\Speedcube\Models;

use Model;

/**
 * Solve Model
 */
class Solve extends Model
{
    use \October\Rain\Database\Traits\Validation;

    /**
     * @var array Default attributes
     */
    public $attributes = [
        'config_id' => 0,
        'puzzle_id' => 0,
        'user_id' => 0,
    ];

    /**
     * @var array Belongs to
     */
    public $belongsTo = [
        'config' => 'Speedcube\Speedcube\Models\Config',
        'user' => 'RainLab\User\Models\User',
    ];

    /**
     * @var array Attributes to be cast to native types
     */
    protected $casts = [
        'config_id' => 'integer',
        'id' => 'integer',
        'puzzle_id' => 'integer',
        'user_id' => 'integer',
    ];

    /**
     * @var array Attributes to be cast to Argon (Carbon) instances
     */
    protected $dates = [
        'created_at',
        'updated_at',
    ];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'config_id',
        'puzzle_id',
        'user_id',
    ];

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Attributes to be removed from the API representation of the model (ex. toArray())
     */
    protected $hidden = [];

    /**
     * @var array Validation rules for attributes
     */
    public $rules = [
        'config_id' => 'required|integer|min:0',
        'user_id' => 'required|integer|min:0',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'speedcube_speedcube_solves';
}
