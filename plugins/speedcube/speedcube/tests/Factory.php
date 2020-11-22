<?php

namespace Speedcube\Speedcube\Tests;

use Auth;
use Carbon\Carbon;
use Faker;
use RainLab\User\Models\User;

class Factory
{
    /**
     * Create a fully authenticated user.
     * 
     * @return \RainLab\User\Models\User
     */
    public static function authenticatedUser()
    {
        $user = self::registerUser();
        
        Auth::login($user);

        return $user;
    }

    /**
     * Register a user
     * 
     * @return \RainLab\User\Models\User
     */
    public static function registerUser(array $data = [], $autoActivate = true)
    {
        return Auth::register(self::user($data), $autoActivate);
    }

    /**
     * User
     */
    public static function user(array $data = [])
    {
        $faker = Faker\Factory::create('en_US');

        $email = '';
        $username = '';
        
        do {
            $email = $faker->safeEmail;
        } while (User::whereEmail($email)->count() > 0);

        do {
            $username = preg_replace("/[^A-Za-z0-9 ]/", '', $faker->username);
        } while (User::whereUsername($username)->count() > 0);

        return [
            'created_at' => Carbon::now()->subDays(rand(0, 365)),
            'email' => $email,
            'name' => $faker->firstName(rand(0, 1)) . ' ' . $faker->lastName,
            'password' => '12345678',
            'password_confirmation' => '12345678',
            'username' => $username,
        ];
    }
}