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
     * @param string $username
     *
     * @return Response
     */
    public function find($username)
    {
        try {
            $params = input();
            $days = (int) array_get($params, 'days', 30);

            // fetch the user with their avatar
            $user = User::whereUsername($username)
                ->with('avatar:attachment_id,attachment_type,disk_name')
                ->firstOrFail();

            // fetch user records
            $records = $user->records()
                ->with([
                    'solve' => function ($solve) {
                        $solve
                            ->select('id', 'created_at', 'scramble_id', 'time')
                            ->with('scramble:id,puzzle');
                    },
                ])
                ->get();

            // fetch record averages
            $recordAverages = $user->recordAverages()
                    ->current()
                    ->select([
                        'average_time',
                        'created_at',
                        'id',
                        'puzzle',
                        'user_id',
                    ])
                    ->withSolveSummary()
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
                ->createdPastDays($days)
                ->with('scramble:id,puzzle')
                ->get();

            return $this->success([
                'recordAverages' => $recordAverages,
                'records'        => $records,
                'solves'         => $solves,
                'totals'         => $totals,
                'user'    => [
                    'avatar'     => $user->avatar,
                    'created_at' => (string) $user->created_at,
                    'name'       => $user->name,
                    'username'   => $user->username,
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
     * List users.
     *
     * @return Response
     */
    public function index()
    {
        try {
            $data = input();
            $skip = (int) array_get($data, 'skip', '0');
            $take = min((int) array_get($data, 'take', '0'), 100) ?: 25;
            $orderBy = array_get($data, 'orderBy', 'id,asc');

            // count the total users
            $total = User::count();

            // fetch users
            $query = User::select([
                    'created_at',
                    'id',
                    'name',
                    'username',
                ])
                ->with('avatar:attachment_id,attachment_type,disk_name')
                ->with([
                    'records' => function ($records) {
                        $records
                            ->select('solve_id', 'user_id')
                            ->with([
                                'solve' => function ($solve) {
                                    $solve
                                        ->select('id', 'created_at', 'scramble_id', 'time')
                                        ->with([
                                            'scramble' => function ($scramble) {
                                                $scramble->select('id', 'puzzle');
                                            },
                                        ]);
                                },
                            ]);
                    },
                ]);

            if ($skip > 0) {
                $query->skip($skip);
            }

            // sorting
            [$col, $dir] = array_merge(explode(',', $orderBy), ['asc']);

            $query->orderBy($col, $dir === 'asc' ? 'asc' : 'desc');

            $users = $query
                ->take($take)
                ->get();

            return $this->success([
                'pagination' => [
                    'totalUsers' => $total,
                    'totalPages' => ceil($total / $take),
                    'pageSize'   => $take,
                ],
                'users' => $users,
            ]);
        }

        // unknown err
        catch (Exception $err) {
            return $this->failed($err);
        }
    }

    /**
     * Get the solve history for a user.
     *
     * @param string $username
     *
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
                ->completed()
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
