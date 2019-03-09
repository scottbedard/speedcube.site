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
     * After Update
     */
    public function afterSave()
    {
        $this->broadcastTwitterNotification();
    }

    /**
     * Broadcast a twitter notification.
     *
     * @return void
     */
    protected function broadcastTwitterNotification()
    {
        $this->notify(new PersonalRecordNotification($this));
    }
}
