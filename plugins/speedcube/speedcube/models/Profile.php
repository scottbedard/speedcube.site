<?php

namespace Speedcube\Speedcube\Models;

use Model;

/**
 * Profile Model.
 */
class Profile extends Model
{
    use \October\Rain\Database\Traits\Validation;

    /**
     * @var array Attributes
     */
    public $attributes = [
        'twitter_broadcasting' => false,
        'twitter_handle'       => '',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'speedcube_speedcube_profiles';

    /**
     * @var array Attribute casting
     */
    protected $casts = [
        'id'                   => 'integer',
        'twitter_broadcasting' => 'boolean',
        'twitter_handle'       => 'string',
        'user_id'              => 'integer',
    ];

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'twitter_broadcasting',
        'twitter_handle',
        'user_id',
    ];

    /**
     * @var array Validation rules
     */
    public $rules = [
        'twitter_handle' => 'between:5,15|regex:/^[A-Za-z0-9_]{1,15}$/',
    ];

    /**
     * @var array Validation error messages
     */
    public $customMessages = [
        'twitter_handle:between' => 'Twitter handles must be between 5 and 15 characters long.',
        'twitter_handle.regex'   => 'Twitter handles may only contain letters, numbers, and underscores.',
    ];

    /**
     * @var array Relations
     */
    public $belongsTo = [
        'user' => 'RainLab\User\Models\User',
    ];
}
