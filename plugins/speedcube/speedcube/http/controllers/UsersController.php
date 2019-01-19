<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use RainLab\User\Models\User;
use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\Solve;

class UsersController extends ApiController
{
    /**
     * Fetch the stats for a user.
     * 
     * @param  string   $username
     * @return Response
     */
    public function find($username)
    {
        try {
            // fetch the user with their avatar
            $user = User::whereUsername($username)
                ->with('avatar:attachment_id,attachment_type,disk_name')
                ->firstOrFail();

            // fetch user records
            $records = $user->records()
                ->with([
                    'solve' => function ($solve) {
                        $solve
                            ->select('id', 'scramble_id', 'time')
                            ->with('scramble:id,puzzle');
                    },
                ])
                ->get();

            // fetch puzzle breakdown
            $totals = $user->solves()
                ->completed()
                ->countByPuzzle();

            // fetch recent completed solves
            $solves = $user
                ->solves()
                ->completed()
                ->select([
                    'created_at',
                    'id',
                    'scramble_id',
                    'time',
                ])
                ->createdPastDays(30)
                ->with('scramble:id,puzzle')
                ->get();

            return $this->success([
                'records' => $records,
                'solves' => $solves,
                'totals' => $totals,
                'user' => [
                    'avatar' => $user->avatar,
                    'created_at' => (string) $user->created_at,
                    'name' => $user->name,
                    'username' => $user->username,
                ],
            ]);
        }

        // user not found
        catch (ModelNotFoundException $err) {
            return $this->failed('not_found');
        }

        // unknown error
        catch (Exception $err) {
            return $this->failed($err);
        }
    }

    /**
     * Get the solve history for a user.
     * 
     * @param  string   $username
     * @return Response
     */
    public function solves($username)
    {
        try {
            $params = input();
            $days = (int) array_get($params, 'days', 30);

            $user = User::whereUsername($username)->firstOrFail();

            $solves = $user
                ->solves()
                ->select([
                    'created_at',
                    'id',
                    'moves',
                    'status',
                    'time',
                ])
                ->createdPastDays($days)
                ->get();

            return $this->success([
                'solves' => $solves->toArray(),
            ]);
        }

        // unknown error
        catch (Exception $err) {
            return $this->failed($err);
        }
    }
}
