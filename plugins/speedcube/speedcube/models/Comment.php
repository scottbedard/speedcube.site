<?php namespace Speedcube\Speedcube\Models;

use Model;

/**
 * Comment Model
 */
class Comment extends Model
{
    use \October\Rain\Database\Traits\Validation;

    /**
     * @var array Attribute casting
     */
    protected $casts = [
        'commentable_id' => 'integer',
        'id' => 'integer',
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
        'user_id',
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
     * @var array Validation error messages
     */
    public $customMessages = [
        'twitter_handle:between' => 'Twitter handles must be between 5 and 15 characters long.',
        'twitter_handle.regex'   => 'Twitter handles may only contain letters, numbers, and underscores.',
    ];
}
