<?php namespace Speedcube\Speedcube\Models;

use Model;

/**
 * PersonalRecord Model
 */
class PersonalRecord extends Model
{
    /**
     * @var array Attribute casting
     */
    protected $casts = [
        'solve_id' => 'integer',
        'user_id' => 'integer',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'speedcube_speedcube_personal_records';

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'solve_id',
        'user_id',
    ];

    /**
     * @var array Relations
     */
    public $belongsTo = [
        'solve' => 'Speedcube\Speedcube\Models\Solve',
        'user' => 'RainLab\User\Models\User',
    ];
}
