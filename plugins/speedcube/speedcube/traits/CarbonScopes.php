<?php

namespace Speedcube\Speedcube\Traits;

use Carbon\Carbon;

trait CarbonScopes
{
    /**
     * Select records from the previous month.
     */
    public function scopeLastMonth($query)
    {
        return $query->where(function ($q) {
            $startOfMonth = Carbon::now()->startOfMonth();
            $startOfLastMonth = Carbon::now()->startOfMonth()->subMonths(1);

            return $q
                ->where('created_at', '>=', $startOfLastMonth)
                ->where('created_at', '<', $startOfMonth);
        });
    }

    /**
     * Select records from this month.
     */
    public function scopeThisMonth($query)
    {
        return $query->where('created_at', '>=', Carbon::now()->startOfMonth());
    }
}
