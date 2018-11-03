<?php namespace Speedcube\Speedcube\Models;

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
        'config' => '{"colors":"default"}',
        'scramble' => '',
        'solution' => '[]',
    ];

    /**
     * @var array Attribute casting
     */
    protected $casts = [
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
        'size',
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
        $this->generateScramble();
    }

    /**
     * Generate a scramble for the solve.
     * 
     * @return void
     */
    protected function generateScramble()
    {
        $cube = base_path('themes/site/node_modules/bedard-cube/cli.js');

        $this->scramble = exec("node {$cube} scramble {$this->size}", $output);
    }
}
