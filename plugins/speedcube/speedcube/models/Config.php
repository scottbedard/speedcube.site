<?php

namespace Speedcube\Speedcube\Models;

use Model;
use October\Rain\Database\Builder;

/**
 * Config Model
 */
class Config extends Model
{
    use \October\Rain\Database\Traits\Validation;

    /**
     * @var array Default attributes
     */
    public $attributes = [
        'data' => '{}',
        'is_active' => true,
        'puzzle_id' => 0,
        'user_id' => 0,
    ];

    /**
     * @var array Belongs to
     */
    public $belongsTo = [
        'user' => 'RainLab\User\Models\User',
    ];

    /**
     * @var array Attributes to be cast to native types
     */
    protected $casts = [
        'id' => 'integer',
        'is_active' => 'boolean',
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
        'data',
        'is_active',
        'puzzle_id',
        'user_id',
    ];

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Has many
     */
    public $hasMany = [
        'solves' => 'Speedcube\Speedcube\Models\Solve',
    ];

    /**
     * @var array Hidden fields
     */
    protected $hidden = [
        'created_at',
        'is_active',
        'updated_at',
        'user_id',
    ];

    /**
     * @var array Jsonable fields
     */
    protected $jsonable = [
        'data',
    ];

    /**
     * @var array Validation rules
     */
    public $rules = [
        'data' => 'array',
        'is_active' => 'boolean',
        'puzzle_id' => 'required|integer|min:0',
        'user_id' => 'required|integer|min:0',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'speedcube_speedcube_configs';

    /**
     * After create.
     */
    public function afterCreate()
    {
        $this->managePriorConfig();
    }

    /**
     * Manage the prior config.
     */
    protected function managePriorConfig()
    {
        // delete configs that have no related solves
        self::isActive()
            ->where('id', '!=', $this->id)
            ->where('puzzle_id', $this->puzzle_id)
            ->where('user_id', $this->user_id)
            ->doesntHave('solves')
            ->delete();

        // and deactivate all others
        self::isActive()
            ->where('id', '!=', $this->id)
            ->where('puzzle_id', $this->puzzle_id)
            ->where('user_id', $this->user_id)
            ->update([
                'is_active' => false,
            ]);
    }

    /**
     * Select active configs.
     *
     * @param October\Rain\Database\Builder $query
     *
     * @return October\Rain\Database\Builder
     */
    public function scopeIsActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
