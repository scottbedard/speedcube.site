<?php

namespace App\Models;

use App\Classes\Twister;
use App\Models\BaseModel;
use App\Models\PuzzleConfig;
use App\Models\Traits\PuzzleAlias;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class Solve extends BaseModel
{
    use HasFactory,
        PuzzleAlias;

    /**
     * Default attributes.
     */
    public $attributes = [
        'puzzle_config_id' => null,
        'puzzle_id' => 0,
        'scramble' => '',
        'solution' => '',
        'status' => 'pending',
        'time' => 0,
        'turns' => 0,
        'user_id' => null,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'puzzle_config_id',
        'puzzle_id',
        'puzzle',
        'scramble',
        'user_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'puzzle_id',
        'updated_at',
    ];
    
    /**
     * Set solution and puzzle status.
     */
    public function applySolution(string $solution)
    {
        $parsedSolution = self::parseSolution($solution);

        $algorithm = $this->getTurns($parsedSolution);
        
        $this->solution = $solution;
        $this->status = 'dnf';
        $this->time = 0;
        $this->turns = array_reduce(
            Arr::pluck(Twister::parseAlgorithm($this->puzzle, $algorithm)['turns'], 'whole'),
            function ($acc, $whole) {
                return $acc + ($whole ? 0 : 1);
            },
            0
        );

        $solved = Twister::test(
            $this->puzzle,
            $this->scramble,
            $algorithm,
        );

        if ($solved) {
            $startAt = $this->getEventTimestamp('START', $parsedSolution);
            $endAt = $this->getEventTimestamp('END', $parsedSolution);

            if ($startAt > -1 && $endAt > -1) {
                $this->status = 'complete';
                $this->time = $endAt - $startAt;
            }
        }
    }

    /**
     * Get solution event timestamp, or -1 if not found.
     */
    public function getEventTimestamp(string $event, array $parsedSolution = null)
    {
        $parsedSolution = $parsedSolution ?: self::parseSolution($this->solution);

        $event = Arr::first($parsedSolution, function ($part) use ($event) {
            return $part['type'] === 'event' && $part['value'] === $event;
        });

        if ($event) {
            return $event['offset'];
        }

        return -1;
    }

    /**
     * Get solution turns as a string
     */
    public function getTurns(array $parsedSolution = null)
    {
        $parsedSolution = $parsedSolution ?: self::parseSolution($this->solution);

        $turns = array_filter($parsedSolution, function ($part) {
            return $part['type'] === 'turn';
        });

        return implode(' ', array_column($turns, 'value'));
    }

    /**
     * Convert a solution string to array.
     */
    public static function parseSolution(string $solution)
    {
        $parts = array_filter(explode(' ', $solution));

        return array_map(function ($part) {
            $offset = 0;
            $type = 'unknown';
            $value = '';

            // turns = timestamp:value
            $turnDelimeter = strpos($part, ':');

            if ($turnDelimeter) {
                $offset = (int) substr($part, 0, $turnDelimeter);
                $type = 'turn';
                $value = substr($part, $turnDelimeter + 1);
            }

            // events = timestamp#value
            $eventDelimeter = strpos($part, '#');

            if ($eventDelimeter) {
                $offset = (int) substr($part, 0, $eventDelimeter);
                $type = 'event';
                $value = substr($part, $eventDelimeter + 1);
            }
            
            return [
                'offset' => $offset,
                'type' => $type,
                'value' => $value,
            ];
        }, $parts);
    }

    /**
     * Select status 'pending'
     */
    public function scopePending(Builder $query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Puzzle config.
     */
    public function puzzleConfig()
    {
        return $this->belongsTo(PuzzleConfig::class);
    }

    /**
     * User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
