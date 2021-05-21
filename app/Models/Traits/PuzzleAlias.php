<?php

namespace App\Models\Traits;

use App\Classes\Twister;
use Illuminate\Database\Eloquent\Builder;

trait PuzzleAlias
{
    /**
     * Get the puzzle name from ID.
     */
    public function getPuzzleAttribute()
    {
        return Twister::getName($this->puzzle_id);
    }

    /**
     * Append puzzle to serialization.
     */
    public function initializePuzzleAlias()
    {
        $this->append('puzzle');
    }

    /**
     * Set puzzle ID from name.
     */
    public function setPuzzleAttribute(string $name)
    {
        $this->attributes['puzzle_id'] = Twister::getId($name);
    }

    /**
     * Select a puzzle name name.
     */
    public function scopePuzzle(Builder $query, string $name)
    {
        return $query->where('puzzle_id', Twister::getId($name));
    }
}