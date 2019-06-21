<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Classes\Utils;
use Speedcube\Speedcube\Models\PersonalRecordAverage;
use Speedcube\Speedcube\Models\Solve;

class ShieldsController extends ApiController
{
    /**
     * @const int
     */
    const CACHE_DURATION = 10;

    /**
     * Fetch a record average.
     * 
     * @param  string   $puzzle
     * @return \Speedcube\Speedcube\Models\PersonalRecordAverage
     */
    public function average($puzzle)
    {
        try {
            $username = input('username');

            $query = PersonalRecordAverage::puzzle($puzzle)
                ->fastest();

            if ($username) {
                $query->username($username);
            }

            $record = $query
                ->remember(self::CACHE_DURATION)
                ->firstOrFail();
        } catch (\Exception $e) {
            return [
                'color' => 'lightgrey',
                'label' => "{$puzzle} avg",
                'message' => 'not enough solves',
                'schemaVersion' => 1,
            ];
        }

        return [
            'color' => 'orange',
            'label' => "{$puzzle} avg",
            'message' => Utils::formatShortTime($record->average_time),
            'schemaVersion' => 1,
        ];
    }

    /**
     * Fetch JSON data for use with shields.io
     * 
     * @param  string   $puzzle
     * @return Response
     */
    public function single($puzzle)
    {
        try {
            $solve = self::findRecordSingle($puzzle);
        } catch (\Exception $e) {
            return [
                'color' => 'lightgrey',
                'label' => "{$puzzle} single",
                'message' => 'no solves',
                'schemaVersion' => 1,
            ]; 
        }

        return [
            'color' => 'orange',
            'label' => "{$puzzle} single",
            'message' => Utils::formatShortTime($solve->time),
            'schemaVersion' => 1,
        ];
    }

    /**
     * Redirect to replay page so badges can link to solves
     * 
     * @param  string       $puzzle
     * @return Redirect
     */
    public function singleRedirect($puzzle)
    {
        $solve = self::findRecordSingle($puzzle);

        return redirect("/replay/{$solve->id}");
    }

    /**
     * Fetch a record single solve.
     * 
     * @param  string   $puzzle
     * @return \Speedcube\Speedcube\Models\Solve
     */
    private function findRecordSingle($puzzle)
    {
        $username = input('username');

        $query = Solve::completed()
            ->puzzle($puzzle)
            ->whereNotNull('user_id');

        // filter results to a given username if one was provided
        if ($username) {
            $query->whereHas('user', function($user) use ($username) {
                $user->where('username', $username);
            });
        }

        return $query
            ->fastest()
            ->remember(self::CACHE_DURATION)
            ->firstOrFail();
    }
}