<?php

namespace Speedcube\Speedcube\Models;

use DB;
use Model;
use October\Rain\Database\Builder;
use October\Rain\Exception\ValidationException;

/**
 * Config Model
 */
class Config extends Model
{
    use \October\Rain\Database\Traits\Validation;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'speedcube_speedcube_configs';

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'puzzle_id',
        'json',
    ];

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Hidden fields
     */
    protected $hidden = [
        'created_at',
        'updated_at',
        'user_id',
    ];

    /**
     * @var array Validation rules for attributes
     */
    public $rules = [
        'json' => 'required',
        'puzzle_id' => 'required|integer|min:0',
        'user_id' => 'required|integer|min:0',
    ];

    /**
     * @var array Attributes to be cast to native types
     */
    protected $casts = [
        'id' => 'integer',
        'puzzle_id' => 'integer',
        'user_id' => 'integer',
    ];

    /**
     * @var array Attributes to be cast to JSON
     */
    protected $jsonable = [
        'json',
    ];

    /**
     * @var array Attributes to be cast to Argon (Carbon) instances
     */
    protected $dates = [
        'created_at',
        'updated_at',
    ];

    /**
     * @var array Relations
     */
    public $belongsTo = [
        'user' => 'RainLab\User\Models\User',
    ];

    /**
     * Select current configs
     *
     * @param October\Rain\Database\Builder $query
     *
     * @return October\Rain\Database\Builder
     */
    public function scopeCurrent(Builder $query): Builder
    {
        $current = self::select(DB::raw('max(id)'))
            ->groupBy(['puzzle_id', 'user_id'])
            ->toSql();

        return $query->whereRaw("id in ($current)");
    }
}
