<?php namespace Speedcube\Speedcube\Models;

use Model;

/**
 * Scramble Model
 */
class Scramble extends Model
{
    /**
     * @var string The database table used by the model.
     */
    public $table = 'speedcube_speedcube_scrambles';

    /**
     * @var array Attribute casting
     */
    protected $casts = [
        'cube_size' => 'integer',
        'id' => 'integer',
        'solve_id' => 'integer',
    ];

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'cube_size',
    ];

    /**
     * @var array Jsonable fields
     */
    protected $jsonable = [];

    /**
     * @var array Relations
     */
    public $hasMany = [
        'solves' => 'Speedcube\Speedcube\Models\Solve',
    ];

    /**
     * Before create.
     * 
     * @return void
     */
    public function beforeCreate()
    {
        $this->scramble = $this->generateScramble();
    }

    /**
     * Generate a scramble.
     * 
     * @return string
     */
    public function generateScramble()
    {
        $cubePath = base_path('themes/site/node_modules/bedard-cube/cli.js');
        $sizeArg = escapeshellarg($this->cube_size);

        return exec("node {$cubePath} scramble {$sizeArg}");
    }

    /**
     * Generate a scramble.
     * 
     * @return void
     */
    public function setScrambleAttribute($scramble)
    {
        $cubePath = base_path('themes/site/node_modules/bedard-cube/cli.js');
        $sizeArg = escapeshellarg($this->cube_size);
        $scrambleArg = escapeshellarg($scramble);

        $this->attributes['scramble'] = $scramble;
        $this->attributes['scrambled_state'] = exec("node {$cubePath} turn {$sizeArg} {$scrambleArg}");
    }
}
