<?php

namespace Speedcube\Speedcube\Models;

use Illuminate\Notifications\Notifiable;
use Model;
use Speedcube\Speedcube\Notifications\PersonalRecordNotification;

/**
 * PersonalRecord Model.
 */
class PersonalRecord extends Model
{
    use Notifiable;

    /**
     * @var array Attribute casting
     */
    protected $casts = [
        'solve_id' => 'integer',
        'user_id'  => 'integer',
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
        'user'  => 'RainLab\User\Models\User',
    ];

    /**
     * After Update.
     */
    public function afterSave()
    {
        $this->broadcastTwitterNotification();
    }

    /**
     * Dispatch a twitter notification is the user has broadcasting enabled.
     *
     * @return void
     */
    protected function broadcastTwitterNotification()
    {
        if ($this->user->profile->twitter_broadcasting) {
            $this->notify(new PersonalRecordNotification($this));
        }
    }

    public function scopeJoinSolve($query)
    {
        $query->join(
            'speedcube_speedcube_solves',
            'speedcube_speedcube_solves.id',
            '=',
            'speedcube_speedcube_personal_records.solve_id'
        );
    }

    public function scopePuzzle($query, $puzzle)
    {
        return $query->whereHas('solve.scramble', function ($scramble) use ($puzzle) {
            $scramble->where('puzzle', $puzzle);
        });
    }
}
