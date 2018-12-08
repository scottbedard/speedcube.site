<?php namespace Speedcube\Speedcube\Models;

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
        'is_rated' => false,
        'solution' => '',
    ];

    /**
     * @var array Attribute casting
     */
    protected $casts = [
        'average_speed' => 'integer',
        'cube_size' => 'integer',
        'is_rated' => 'boolean',
        'scramble_id' => 'integer',
        'size' => 'integer',
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
        'solution',
    ];

    /**
     * @var array Relations
     */
    public $belongsTo = [
        'scramble' => 'Speedcube\Speedcube\Models\Scramble',
        'user' => 'RainLab\User\Models\User',
    ];

    /**
     * Before create
     */
    public function beforeCreate()
    {
        // verify that our solution is correct
        if (!Cube::testSolution($this->scramble, $this->solution)) {
            throw new InvalidSolutionException;
        }

        // store solve details
        $this->setCubeSize();
        $this->setRated();
        $this->setTime();
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
     * Get the last turn in the solution.
     * 
     * @return string
     */
    public function getLastTurn()
    {
        return array_values(array_slice($this->getTurns(), -1))[0];
    }

    /**
     * Parse a turn.
     * 
     * @return Array
     */
    protected function parseTurn($turn)
    {
        return [
            'time' => (int) explode(':', $turn)[0],
        ];
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
     * Set the rated attribute.
     * 
     * @return void
     */
    protected function setRated()
    {
        if (!self::where('scramble_id', $this->scramble_id)->exists()) {
            $this->is_rated = true;
        }
    }

    /**
     * Set time and move data.
     * 
     * @return void
     */
    protected function setTime()
    {
        $lastTurn = $this->getLastTurn();

        if ($lastTurn) {
            $parsedTurn = $this->parseTurn($lastTurn);

            $this->time = $parsedTurn['time'];
        }

        $this->moves = Cube::countTurns($this->solution);

        $this->average_speed = round($this->time / $this->moves);
    }
}
