<?php namespace Speedcube\Speedcube\Models;

use Model;
use October\Rain\Database\Builder;
use Speedcube\Speedcube\Classes\Puzzle;

/**
 * Solve Model
 */
class Solve extends Model
{
    use \October\Rain\Database\Traits\Validation;

    /**
     * @var array Default attributes
     */
    public $attributes = [
        'config_id' => 0,
        'puzzle_id' => 0,
        'user_id' => 0,
    ];

    /**
     * @var array Belongs to
     */
    public $belongsTo = [
        'config' => 'Speedcube\Speedcube\Models\Config',
        'user' => 'RainLab\User\Models\User',
    ];

    /**
     * @var array Attributes to be cast to native types
     */
    protected $casts = [
        'config_id' => 'integer',
        'id' => 'integer',
        'puzzle_id' => 'integer',
        'user_id' => 'integer',
    ];

    /**
     * @var array Attributes to be cast to Argon (Carbon) instances
     */
    protected $dates = [
        'created_at',
        'updated_at',
    ];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'config_id',
        'puzzle_id',
        'user_id',
    ];

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Attributes to be removed from the API representation of the model (ex. toArray())
     */
    protected $hidden = [];

    /**
     * @var array Validation rules for attributes
     */
    public $rules = [
        'config_id' => 'required|integer|min:0',
        'user_id' => 'required|integer|min:0',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'speedcube_speedcube_solves';

    /**
     * Before validate
     */
    public function beforeValidate() {
        if (!$this->user_id) {
            $this->user_id = 0;
        }
    }

    /**
     * Get puzzle name.
     *
     * @return string
     */
    public function getPuzzleName()
    {
        return Puzzle::getName($this->puzzle_id);
    }

    /**
     * Get puzzle filter options.
     *
     * @return array
     */
    public function getPuzzleFilterOptions()
    {
        $options = [];

        foreach (Puzzle::IDS as $name => $id) {
            $options[$id] = ucfirst($name);
        }

        return $options;
    }
}
