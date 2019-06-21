<?php namespace Speedcube\Speedcube\Models;

use Model;

/**
 * PersonalRecordAverage Model
 */
class PersonalRecordAverage extends Model
{
    /**
     * @var array Attribute casting
     */
    protected $casts = [
        'average_time' => 'integer',
        'id' => 'integer',
        'previous_id' => 'integer',
        'user_id' => 'integer',
    ];

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
     * @var array Hidden fields
     */
    protected $hidden = [
        'pivot',
    ];

    /**
     * @var array Relations
     */
    public $belongsTo = [
        'user' => 'RainLab\User\Models\User',
    ];

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

    public function scopeFastest($query)
    {
        return $query->orderBy('average_time', 'asc');
    }

    public function scopePuzzle($query, $puzzle)
    {
        return $query->where('puzzle', $puzzle);
    }

    public function scopeUsername($query, $username)
    {
        $query->whereHas('user', function($user) use ($username) {
            $user->where('username', $username);
        });
    }

    public function scopeWithSolveSummary($query)
    {
        return $query->with('solves:id,status,time');
    }
}
