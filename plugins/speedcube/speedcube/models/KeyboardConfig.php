<?php

namespace Speedcube\Speedcube\Models;

use Model;

/**
 * KeyboardConfig Model.
 */
class KeyboardConfig extends Model
{
    /**
     * @var string The database table used by the model.
     */
    public $table = 'speedcube_speedcube_keyboard_configs';

    /**
     * @var array Attributes
     */
    public $attributes = [
        'config' => '{}',
    ];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'config',
        'puzzle',
        'user_id',
    ];

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Jsonable fields
     */
    protected $jsonable = [
        'config',
    ];

    /**
     * @var array Relations
     */
    public $belongsTo = [
        'user' => 'RainLab\User\Models\User',
    ];
}
