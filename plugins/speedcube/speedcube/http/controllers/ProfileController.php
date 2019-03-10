<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Auth;
use Exception;
use Speedcube\Speedcube\Classes\ApiController;

class ProfileController extends ApiController
{
    /**
     * Save a profile.
     *
     * @return Response
     */
    public function twitter()
    {
        try {
            $user = Auth::getUser();
            $profile = $user->profile;

            $data = input();

            $profile->twitter_broadcasting = array_get($data, 'broadcasting') ?: false;
            $profile->twitter_handle = array_get($data, 'handle') ?: '';
            $profile->save();

            return $this->success([
                'profile' => $profile,
            ]);
        } catch (Exception $err) {
            return $this->failed($err);
        }
    }
}