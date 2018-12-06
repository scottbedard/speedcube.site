<?php namespace Speedcube\Speedcube\Models;

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
        'solution' => '',
    ];

    /**
     * @var array Attribute casting
     */
    protected $casts = [
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
    ];

    /**
     * Before create
     */
    public function beforeCreate()
    {
        // verify that our solution is correct
        if (!$this->testSolution()) {
            throw new InvalidSolutionException;
        }

        // store solve details
        $this->setMoves();
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
     * Remove time offsets from the solution.
     * 
     * @return string
     */
    protected function getTimelessSolution()
    {
        return preg_replace('/\d+\:|!!/', '', $this->solution);
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
     * Set move data.
     * 
     * @return void
     */
    protected function setMoves()
    {
        // ...
    }

    /**
     * Set the solve time.
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
    }

    /**
     * Test the solution.
     * 
     * @return void
     */
    protected function testSolution()
    {
        $scramble = $this->scramble;

        $cubePath = base_path('themes/site/node_modules/bedard-cube/cli.js');
        $sizeArg = escapeshellarg($scramble->getCubeSize());
        $stateArg = escapeshellarg($scramble->scrambled_state);
        $solutionArg = escapeshellarg($this->getTimelessSolution());

        return exec("node {$cubePath} test {$sizeArg} {$stateArg} {$solutionArg}") === '1';
    }
}
