<?php

namespace App\Models;

use App\Classes\Solution;
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
    public function applySolution(string $solutionStr)
    {
        $config = $this->puzzleConfig;

        $turnDuration = $config ? $config->getJsonValue('config', 'turnDuration', 0) : 0;

        $solution = new Solution($solutionStr, $turnDuration);

        $algorithm = $solution->getAlgorithm();
        
        $this->solution = $solutionStr;
        $this->status = 'dnf';
        $this->time = 0;
        $this->turns = 0;

        $solved = Twister::test(
            $this->puzzle,
            $this->scramble,
            $algorithm,
        );

        if ($solved) {
            $this->status = 'complete';
            $this->time = $solution->getTimeBetweenEvents('START', 'END');
            $this->turns = count($solution->getTurnsByEvent('START', 'END'));
        }
    }

    /**
     * Puzzle config.
     */
    public function puzzleConfig()
    {
        return $this->belongsTo(PuzzleConfig::class);
    }

    /**
     * Select status 'pending'
     */
    public function scopePending(Builder $query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
