<?php namespace Speedcube\Speedcube\Models;

use Model;

/**
 * KeyboardConfig Model
 */
class KeyboardConfig extends Model
{
    use \October\Rain\Database\Traits\Validation;

    /**
     * @var array Default attributes
     */
    public $attributes = [
        'data' => '{}',
        'puzzle_id' => 0,
        'user_id' => 0,
    ];

    /**
     * @var array Belongs to
     */
    public $belongsTo = [
        'user' => 'RainLab\User\Models\User',
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
        'data',
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
    protected $hidden = [
        'user_id',
    ];

    /**
     * @var array Attributes to be cast to JSON
     */
    protected $jsonable = [
        'data',
    ];

    /**
     * @var array Validation rules for attributes
     */
    public $rules = [];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'speedcube_speedcube_keyboard_configs';
}
