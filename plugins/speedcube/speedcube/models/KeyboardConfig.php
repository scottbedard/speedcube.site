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
        // keyboard configurations are case-sensitive. because of this
        // we'll avoid jsonifying the object in order to prevent our
        // camel casing middleware from effecting object key cases.
    ];

    /**
     * @var array Relations
     */
    public $belongsTo = [
        'user' => 'RainLab\User\Models\User',
    ];
}
