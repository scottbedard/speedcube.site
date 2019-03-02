<?php

namespace Speedcube\Speedcube\Models;

use Carbon\Carbon;
use DB;
use Model;
use Speedcube\Speedcube\Classes\Cube;

/**
 * Solve Model.
 */
class Solve extends Model
{
    use \Speedcube\Speedcube\Traits\CarbonScopes;

    /**
     * @var array Attributes
     */
    public $attributes = [
        'config'   => '{}',
        'solution' => '',
        'status'   => 'pending',
    ];

    /**
     * @var array Attribute casting
     */
    protected $casts = [
        'average_speed' => 'integer',
        'id'            => 'integer',
        'moves'         => 'integer',
        'replay_count'  => 'integer',
        'scramble_id'   => 'integer',
        'size'          => 'integer',
        'time'          => 'integer',
        'user_id'       => 'integer',
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
    protected $jsonable = [];

    /**
     * @var array Relations
     */
    public $belongsTo = [
        'scramble' => 'Speedcube\Speedcube\Models\Scramble',
        'user'     => 'RainLab\User\Models\User',
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
     * After create.
     *
     * @return void
     */
    public function afterCreate()
    {
        $this->closeOtherUserSolves();
    }

    /**
     * Check for a personal record.
     *
     * @return void
     */
    protected function checkPersonalRecords()
    {
        // do nothing if this is a guest solve
        if (!$this->user_id) {
            return;
        }

        // find the previous record for this user and puzzle
        $record = $this->user
            ->records()
            ->whereHas('solve.scramble', function ($query) {
                $query->wherePuzzle($this->scramble->puzzle);
            })
            ->with('solve:id,time')
            ->first();

        // if there was no previous record, create the first one
        if ($record === null) {
            $this->user
                ->records()
                ->create(['solve_id' => $this->id]);
        }

        // otherwise update the record if this solve was faster
        elseif ($record->solve->time > $this->time) {
            $record->solve_id = $this->id;
            $record->save();
        }
    }

    /**
     * Close solves that are older than one day.
     *
     * @return void
     */
    public static function closeAbandoned()
    {
        $abandoned = self::abandoned()->get();

        $abandoned->each(function ($solve) {
            $solve->status = 'dnf';

            $solve->save();
        });
    }

    /**
     * Close other solves if a user is authenticated.
     *
     * @return void
     */
    protected function closeOtherUserSolves()
    {
        if ($this->user_id) {
            self::pending()
                ->where('id', '!=', $this->id)
                ->get()->each(function ($solve) {
                    $solve->status = 'dnf';
                    $solve->save();
                });
        }
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
            $this->setTime();
            $this->status = 'complete';
        } else {
            $this->status = 'dnf';
        }

        $this->save();

        if ($this->status === 'complete') {
            $this->checkPersonalRecords();
        }
    }

    /**
     * Get the timestamp of the first occurance of a solve event.
     *
     * @param string $event
     *
     * @return int
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
     * @return array
     */
    public function getTurns()
    {
        return explode(' ', $this->solution);
    }

    /**
     * Parse a turn.
     *
     * @return array
     */
    public function getTimestampForTurn($turn)
    {
        return (int) explode(':', $turn)[0];
    }

    /**
     * Scopes.
     */
    public function scopeAbandoned($query)
    {
        $cutoff = Carbon::now()->subDays(1);

        return $query->pending()->where('created_at', '<', $cutoff);
    }

    public function scopeCountByPuzzle($query)
    {
        return $query->leftJoin('speedcube_speedcube_scrambles', 'speedcube_speedcube_scrambles.id', '=', 'scramble_id')
            ->select('puzzle', DB::raw('count(*) as total'))
            ->groupBy('puzzle')
            ->get();
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'complete');
    }

    public function scopeDnf($query)
    {
        return $query->where('status', 'dnf');
    }

    public function scopeFastest($query)
    {
        return $query->orderBy('time', 'asc');
    }

    public function scopeFindByToken($query, $token)
    {
        return $query->whereToken($token)->find();
    }

    public function scopeFewestMoves($query)
    {
        return $query->orderBy('moves', 'asc');
    }

    public function scopeJoinPuzzle($query)
    {
        $query->join(
            'speedcube_speedcube_scrambles',
            'speedcube_speedcube_solves.scramble_id',
            '=',
            'speedcube_speedcube_scrambles.id'
        )->addSelect('speedcube_speedcube_scrambles.puzzle');
    }

    public function scopeLastMonth($query)
    {
        return $query->where(function ($q) {
            $startOfMonth = Carbon::now()->startOfMonth();
            $startOfLastMonth = Carbon::now()->startOfMonth()->subMonths(1);

            return $q
                ->where('created_at', '>=', $startOfLastMonth)
                ->where('created_at', '<', $startOfMonth);
        });
    }

    public function scopeNotPending($query)
    {
        return $query->where('status', '<>', 'pending');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopePuzzle($query, $puzzle)
    {
        return $query->whereHas('scramble', function ($scramble) use ($puzzle) {
            $scramble->wherePuzzle($puzzle);
        });
    }

    public function scopePuzzles($query, array $puzzles)
    {
        return $query->whereHas('scramble', function ($scramble) use ($puzzles) {
            $scramble->whereIn('puzzle', $puzzles);
        });
    }

    public function scopeThisMonth($query)
    {
        return $query->where('created_at', '>=', Carbon::now()->startOfMonth());
    }

    public function scopeWithUserSummary($query)
    {
        return $query->with([
            'user' => function ($user) {
                $user->select(['id', 'name', 'username']);
            },
        ]);
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
