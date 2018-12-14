<?php namespace Speedcube\Speedcube\Models;

use Carbon\Carbon;
use Speedcube\Speedcube\Classes\Cube;
use Speedcube\Speedcube\Exceptions\InvalidSolutionException;
use Model;

/**
 * Solve Model
 */
class Solve extends Model
{
    /**
     * @var array Attributes
     */
    public $attributes = [
        'config' => '{}',
        'is_rated' => true,
        'solution' => '',
        'status' => 'pending',
    ];

    /**
     * @var array Attribute casting
     */
    protected $casts = [
        'average_speed' => 'integer',
        'cube_size' => 'integer',
        'id' => 'integer',
        'is_rated' => 'boolean',
        'moves' => 'integer',
        'scramble_id' => 'integer',
        'size' => 'integer',
        'time' => 'integer',
        'user_id' => 'integer',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'speedcube_speedcube_solves';

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'config',
        'scramble_id',
        'size',
        'solution',
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
        'scramble' => 'Speedcube\Speedcube\Models\Scramble',
        'user' => 'RainLab\User\Models\User',
    ];

    /**
     * Abort a solve.
     * 
     * @return void
     */
    public function abort($solution = '')
    {
        $this->solution = $solution;
        $this->status = 'dnf';

        $this->save();
    }

    /**
     * Close solves that are older than one day.
     *
     * @return void
     */
    public static function closeAbandoned()
    {
        $abandoned = self::abandoned()->get();

        $abandoned->each(function($solve) {
            $solve->status = 'dnf';

            $solve->save();
        });
    }

    /**
     * Complete a solve.
     *
     * @return void
     */
    public function complete($solution)
    {
        // set the cube solution
        $this->solution = $solution;

        // verify that our solution is correct
        if (Cube::testSolution($this->scramble, $solution)) {
            $this->setCubeSize();
            $this->setTime();
            $this->status = 'complete';
        } else {
            $this->status = 'dnf';
        }

        $this->save();
    }

    /**
     * Get the timestamp of the first occurance of a solve event.
     * 
     * @param  string   $event
     * @return integer
     */
    public function getEventTimestamp($event)
    {
        $turns = $this->getTurns();

        foreach ($turns as $turn) {
            if (preg_match('/\d+\#[a-zA-Z]+/', $turn)) {
                $parts = explode('#', $turn);
                $time = $parts[0];
                $name = $parts[1];

                if ($name === $event) {
                    return (int) $time;
                }
            }
        }

        return 0;
    }

    /**
     * Get the last turn in the solution.
     * 
     * @return string
     */
    public function getLastTurn()
    {
        return array_values(array_slice($this->getTurns(), -1))[0];
    }

    /**
     * Get the solution as an array.
     * 
     * @return Array
     */
    public function getTurns()
    {
        return explode(' ', $this->solution);
    }

    /**
     * Parse a turn.
     * 
     * @return Array
     */
    public function getTimestampForTurn($turn)
    {
        return (int) explode(':', $turn)[0];
    }

    /**
     * Scopes
     */
    public function scopeAbandoned($query)
    {
        $cutoff = Carbon::now()->subDays(1);

        return $query->pending()->where('created_at', '<', $cutoff);
    }

    public function scopeFastest($query)
    {
        return $query->orderBy('time', 'asc');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'complete');
    }

    public function scopeFewestMoves($query)
    {
        return $query->orderBy('moves', 'asc');
    }

    public function scopeNotPending($query)
    {
        return $query->where('status', '<>', 'pending');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeRated($query)
    {
        return $query->where('is_rated', true);
    }

    public function scopeSize($query, int $size)
    {
        return $query->where('cube_size', $size);
    }

    public function scopeWithUserSummary($query)
    {
        return $query->with([
            'user' => function($user) {
                $user->select(['id', 'name']);
            },
        ]);
    }

    /**
     * Set cube size.
     * 
     * @return void
     */
    protected function setCubeSize()
    {
        if ($this->scramble) {
            $this->cube_size = $this->scramble->cube_size;
        }
    }

    /**
     * Set time and move data.
     * 
     * @return void
     */
    protected function setTime()
    {
        $time = 0;
        $lastTurn = $this->getLastTurn();
        $startAt = $this->getEventTimestamp('START');
        $endAt = $this->getEventTimestamp('END') - $startAt;

        $this->time = $endAt;
        $this->moves = Cube::countTurns($this->solution);

        if ($this->moves > 0) {
            $this->average_speed = round($this->time / $this->moves);
        }
    }
}
