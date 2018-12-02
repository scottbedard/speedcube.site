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
    public $hasOne = [];
    public $hasMany = [];
    public $belongsTo = [];
    public $belongsToMany = [];
    public $morphTo = [];
    public $morphOne = [];
    public $morphMany = [];
    public $attachOne = [];
    public $attachMany = [];

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

        $sizeArg = escapeshellarg($this->getCubeSize());

        return exec("node {$cubePath} scramble {$sizeArg}");
    }

    /**
     * Parse the puzzle size.
     * 
     * @return string
     */
    public function getCubeSize()
    {
        if (preg_match('/cube(\d+)/', $this->puzzle, $matches)) {
            return (int) $matches[1];
        }

        return null;
    }

    /**
     * Generate a scramble.
     * 
     * @return void
     */
    public function setScrambleAttribute($scramble)
    {
        $cubePath = base_path('themes/site/node_modules/bedard-cube/cli.js');

        $sizeArg = escapeshellarg($this->getCubeSize());
        $scrambleArg = escapeshellarg($scramble);

        $this->attributes['scramble'] = $scramble;
        $this->attributes['scrambled_state'] = exec("node {$cubePath} turn {$sizeArg} {$scrambleArg}");
    }
}
