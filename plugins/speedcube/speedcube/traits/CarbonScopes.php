<?php

namespace Speedcube\Speedcube\Traits;

use Carbon\Carbon;

trait CarbonScopes
{
    /**
     * Records created after a number of days ago.
     *
     * @param  \Illuminate\Database\Eloquent\Builder    $query
     * @param  integer                                  $days
     */
    public function scopeCreatedPastDays($query, $days)
    {
        $query->where('created_at', '>=', Carbon::now()->subDays($days)->startOfDay());
    }
}
