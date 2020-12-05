<?php

namespace Speedcube\Speedcube\Tests;

use Auth;
use Carbon\Carbon;
use Faker;
use Model;
use RainLab\User\Models\User;
use Speedcube\Speedcube\Models\Config;

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
     * Create a model and save it to the database.
     *
     * @param  Model    $model  Model to create
     * @param  array    $data   Data to fill model with
     * @param  array    $omit   Data to omit
     * @return Model
     */
    public static function create(Model $model, array $data = [], array $omit = [])
    {
        if (get_class($model) === 'RainLab\User\Models\User') {
            return self::registerUser($data);
        }

        $model = self::fill($model, $data, $omit);
        $model->save();

        return $model;
    }

    /**
     * Create a model and fill it with data.
     *
     * @param  Model    $model  Model to fill
     * @param  array    $data   Data to fill the model with
     * @return Model
     */
    public static function fill(Model $model, array $data = [], array $omit = [])
    {
        $seed = [];

        switch (get_class($model)) {
            case 'RainLab\User\Models\User': $seed = self::user($data); break;
            case 'Speedcube\Speedcube\Models\Config': $seed = self::config($data); break;
        }
        
        $mergedData = array_merge($seed, $data);

        foreach ($mergedData as $key => $value) {
            $model->$key = $value;
        }

        foreach ($omit as $key) {
            unset($model->attributes[$key]);
        }

        return $model;
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
     * Speedcube\Speedcube\Models\Config
     *
     * @return array
     */
    public static function config()
    {
        return [];
    }

    /**
     * RainLab\User\Models\User
     *
     * @return array
     */
    public static function user(array $data = [])
    {
        $faker = Faker\Factory::create('en_US');

        $email = array_key_exists('email', $data) ? $data['email'] : '';
        
        if (!$email) {
            do {
                $email = $faker->safeEmail;
            } while (User::whereEmail($email)->count() > 0);
        }

        $name = array_key_exists('name', $data)
            ? $data['name']
            : $faker->firstName(rand(0, 1)) . ' ' . $faker->lastName;

        $password = array_key_exists('password', $data) ? $data['password'] : '12345678';

        $username = array_key_exists('username', $data) ? $data['username'] : '';

        if (!$username) {
            do {
                $username = preg_replace("/[^A-Za-z0-9 ]/", '', $faker->username);
            } while (User::whereUsername($username)->count() > 0);
        }

        return [
            'created_at' => Carbon::now()->subDays(rand(0, 365)),
            'email' => $email,
            'name' => $name,
            'password_confirmation' => $password,
            'password' => $password,
            'username' => $username,
        ];
    }
}