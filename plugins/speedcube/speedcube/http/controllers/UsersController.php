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
     * @return Response d
     */
    public function find($username)
    {
        try {
            // fetch the user with their avatar
            $user = User::whereUsername($username)
                ->with('avatar:attachment_id,attachment_type,disk_name')
                ->firstOrFail();

            // load the user's records
            $records = $user->records()
                ->with([
                    'solve' => function ($solve) {
                        $solve
                            ->select('id', 'scramble_id', 'time')
                            ->with('scramble:id,puzzle');
                    },
                ])
                ->get();

            return $this->success([
                'records' => $records,
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
}
