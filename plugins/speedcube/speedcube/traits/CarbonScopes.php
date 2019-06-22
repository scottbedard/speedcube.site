<?php

namespace Speedcube\Speedcube\Traits;

use Carbon\Carbon;

trait CarbonScopes
{
    public function scopeCreatedPastDays($query, $days)
    {
        $query->where('created_at', '>=', Carbon::now()->subDays($days)->startOfDay());
    }

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

    public function scopeNewest($query)
    {
        $query->orderBy('created_at', 'desc');
    }

    public function scopeThisMonth($query)
    {
        return $query->where('created_at', '>=', Carbon::now()->startOfMonth());
    }
}
