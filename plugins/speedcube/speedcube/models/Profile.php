<?php namespace Speedcube\Speedcube\Models;

use Model;

/**
 * Profile Model
 */
class Profile extends Model
{
    /**
     * @var string The database table used by the model.
     */
    public $table = 'speedcube_speedcube_profiles';

    /**
     * @var array Attribute casting
     */
    protected $casts = [
        'id' => 'integer',
        'twitter_broadcasting' => 'boolean',
        'twitter_handle' => 'string',
        'user_id' => 'integer',
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
     * @var array Relations
     */
    public $belongsTo = [
        'user' => 'RainLab\User\Models\User',
    ];
}
