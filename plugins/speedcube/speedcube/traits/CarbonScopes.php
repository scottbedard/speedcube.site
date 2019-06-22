<?php

namespace Speedcube\Speedcube\Traits;

use Carbon\Carbon;

trait CarbonScopes
{

    /**
     * Query scopes
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCreatedPastDays($query, $days)
    {
        $query->where('created_at', '>=', Carbon::now()->subDays($days)->startOfDay());
    }

    public function scopeNewest($query)
    {
        $query->orderBy('created_at', 'desc');
    }
}
