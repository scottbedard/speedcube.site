<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\Solve;
use Speedcube\Speedcube\Classes\Utils;

class ShieldsController extends ApiController
{
    /**
     * Redirect to replay page so badges can link to solves
     * 
     * @param  string       $puzzle
     * @return Redirect
     */
    public function replay($puzzle)
    {
        $solve = self::findRecordSingle($puzzle);

        return redirect("/replay/{$solve->id}");
    }

    /**
     * Fetch JSON data for use with shields.io
     * 
     * @param  string       $puzzle
     * @return Response
     */
    public function puzzle($puzzle)
    {
        $solve = self::findRecordSingle($puzzle);

        return [
            'color' => 'orange',
            'label' => $puzzle,
            'message' => Utils::formatShortTime($solve->time),
            'schemaVersion' => 1,
        ];
    }

    /**
     * Fetch a record single solve.
     * 
     * @param  string                               $puzzle
     * @param  string|null                          $username
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
            ->remember(10)
            ->firstOrFail();
    }
}