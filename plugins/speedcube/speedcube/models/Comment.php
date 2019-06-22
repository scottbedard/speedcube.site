<?php namespace Speedcube\Speedcube\Models;

use Model;

/**
 * Comment Model
 */
class Comment extends Model
{
    use \October\Rain\Database\Traits\Validation,
        \Speedcube\Speedcube\Traits\CarbonScopes;

    /**
     * @var array Attribute casting
     */
    protected $casts = [
        'commentable_id' => 'integer',
        'id' => 'integer',
        'user_id' => 'integer',
    ];
    
    /**
     * @var string The database table used by the model.
     */
    public $table = 'speedcube_speedcube_comments';

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'body',
        'commentable_id',
        'commentable_type',
    ];

    /**
     * @var array Relations
     */
    public $belongsTo = [
        'user' => 'RainLab\User\Models\User',
    ];

    public $morphTo = [
        'commentable' => [],
    ];

        /**
     * @var array Validation rules
     */
    public $rules = [
        'body' => 'required',
        'commentable_id' => 'required|integer|min:1',
        'commentable_type' => 'required|string',
        'user_id' => 'required|integer|min:1',
    ];

    /**
     * Query scopes.
     */
    public function scopeFor($query, $type, $id)
    {
        $model = '';

        if ($type === 'solve') {
            $model = 'Speedcube\Speedcube\Models\Solve';
        }

        return $query->where(function ($q) use ($model, $id) {
            $q->where('commentable_type', $model)->where('commentable_id', $id);
        });
    }

    public function scopeWithUserSummary($query)
    {
        return $query->with([
            'user' => function ($user) {
                $user->select(['id', 'name', 'username']);
            },
        ]);
    }
}
