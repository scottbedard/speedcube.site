<?php namespace Speedcube\Speedcube\Models;

use Model;
use October\Rain\Database\Builder;
use Speedcube\Speedcube\Classes\Puzzle;

/**
 * Solve Model
 */
class Solve extends Model
{
    use \October\Rain\Database\Traits\Validation,
        \Speedcube\Speedcube\Traits\CarbonScopes;

    /**
     * @var array Default attributes
     */
    public $attributes = [
        'config_id' => 0,
        'puzzle_id' => 0,
        'scramble' => '',
        'scrambled_state' => '{}',
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
     * @var array Jsonable fields
     */
    protected $jsonable = [
        'scrambled_state',
    ];

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
     * Before create
     */
    public function beforeCreate()
    {
        $this->scramble();
    }

    /**
     * Before validate
     */
    public function beforeValidate()
    {
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

    /**
     * Get scrambled state as string.
     *
     * @return string
     */
    public function getScrambledStateJsonAttribute()
    {
        return \json_encode((object) $this->scrambled_state, JSON_PRETTY_PRINT);
    }

    /**
     * Generate scramble
     */
    protected function scramble()
    {
        if ($this->puzzle_id) {
            $scramble = Puzzle::scramble($this->puzzle_id);
            $this->scramble = $scramble['scramble'];
            $this->scrambled_state = $scramble['state'];
        }
    }

    /**
     * Set configuration data from string.
     *
     * @param string $value
     */
    public function setScrambledStateJsonAttribute($value)
    {
        $data = \json_decode($value, true);
        
        if ($data === null) {
            throw new \Exception('Invalid JSON');
        }

        $this->scrambled_state = $data;
    }

    /**
     * Select by puzzles
     */
    public function scopePuzzles($query, array $puzzleIds)
    {
        return $query->whereIn('puzzle_id', $puzzleIds);
    }

    /**
     * Select user summary
     */
    public function scopeWithUserSummary($query)
    {
        return $query->with([
            'user' => function ($user) {
                $user->select(['id', 'name', 'username']);
            },
        ]);
    }
}
