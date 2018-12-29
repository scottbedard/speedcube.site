<?php namespace Speedcube\Speedcube\Models;

use Model;

/**
 * Scramble Model
 */
class Scramble extends Model
{
    use \October\Rain\Database\Traits\Validation;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'speedcube_speedcube_scrambles';

    /**
     * @var array Attribute casting
     */
    protected $casts = [
        'id' => 'integer',
        'puzzle' => 'string',
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
        'puzzle',
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
     * @var array Validation rules
     */
    public $rules = [
        'puzzle' => 'required',
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

        $sizeArg = escapeshellarg([
            'cube2' => 2,
            'cube3' => 3,
            'cube4' => 4,
            'cube5' => 5,
            'cube6' => 6,
            'cube7' => 7,
            'cube8' => 8,
            'cube9' => 9,
            'cube10' => 10,
        ][$this->puzzle]);

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

        $scrambleArg = escapeshellarg($scramble);

        $sizeArg = escapeshellarg([
            'cube2' => 2,
            'cube3' => 3,
            'cube4' => 4,
            'cube5' => 5,
            'cube6' => 6,
            'cube7' => 7,
            'cube8' => 8,
            'cube9' => 9,
            'cube10' => 10,
        ][$this->puzzle]);

        $this->attributes['scramble'] = $scramble;
        $this->attributes['scrambled_state'] = exec("node {$cubePath} turn {$sizeArg} {$scrambleArg}");
    }
}
