<?php namespace Speedcube\Speedcube\Models;

use Model;

/**
 * Config Model
 */
class Config extends Model
{
    /**
     * @var string The database table used by the model.
     */
    public $table = 'speedcube_speedcube_configs';

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'config',
        'puzzle',
        'user_id',
    ];

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
