<?php namespace Speedcube\Speedcube\Models;

use Model;

/**
 * PersonalRecordAverage Model
 */
class PersonalRecordAverage extends Model
{
    /**
     * @var string The database table used by the model.
     */
    public $table = 'speedcube_speedcube_personal_record_averages';

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'average_time',
        'previous_id',
        'puzzle',
        'user_id',
    ];

    /**
     * @var array Relations
     */
    public $belongsToMany = [
        'solves' => [
            'Speedcube\Speedcube\Models\Solve',
            'key' => 'personal_record_average_id',
            'otherKey' => 'solve_id',
            'table' => 'speedcube_speedcube_personal_record_average_solve',
        ],
    ];

    public $hasOne = [
        'nextRecordAverage' => [
            'Speedcube\Speedcube\Models\PersonalRecordAverage',
            'key' => 'previous_id',
        ],
    ];

    //
    // scopes
    //
    public function scopeCurrent($query)
    {
        return $query->doesntHave('nextRecordAverage');
    }

    public function scopePuzzle($query, $puzzle)
    {
        return $query->where('puzzle', $puzzle);
    }
}
