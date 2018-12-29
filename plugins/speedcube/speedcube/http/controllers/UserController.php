<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use RainLab\User\Models\User;
use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\Solve;

class UserController extends ApiController
{
    /**
     * Fetch the stats for a user.
     * 
     * @param  string   $username
     * @return Response
     */
    public function stats($username)
    {
        try {
            // fetch the user with their avatar
            $user = User::whereUsername($username)
                ->with('avatar')
                ->firstOrFail();

            // fetch the user's non-pending solves
            $solves = Solve::whereUserId($user->id)
                ->notPending()
                ->select([
                    'status',
                    'id',
                    'time',
                ])
                ->get();

            return $this->success([
                'solves' => $solves,
                'user' => [
                    'avatar' => $user->avatar,
                    'created_at' => (string) $user->created_at,
                    'name' => $user->name,
                    'username' => $user->username,
                ],
            ]);
        }

        // username not found
        catch (Exception $err) {
            return $this->failed('user_not_found');
        }
    }
}
