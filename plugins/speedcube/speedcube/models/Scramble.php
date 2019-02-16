<?php

namespace Speedcube\Speedcube\Models;

use Model;

/**
 * Scramble Model.
 */
class Scramble extends Model
{
    use \October\Rain\Database\Traits\Validation;

    /**
     * @var array Attributes
     */
    public $attributes = [
        'scrambled_state' => '{}',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'speedcube_speedcube_scrambles';

    /**
     * @var array Attribute casting
     */
    protected $casts = [
        'id'       => 'integer',
        'puzzle'   => 'string',
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
            '2x2' => 2,
            '3x3' => 3,
            '4x4' => 4,
            '5x5' => 5,
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
            '2x2' => 2,
            '3x3' => 3,
            '4x4' => 4,
            '5x5' => 5,
        ][$this->puzzle]);

        $this->attributes['scramble'] = $scramble;
        $this->attributes['scrambled_state'] = exec("node {$cubePath} turn {$sizeArg} {$scrambleArg}");
    }
}
