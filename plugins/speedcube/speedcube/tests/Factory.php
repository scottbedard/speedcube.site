<?php

namespace Speedcube\Speedcube\Tests;

use Auth;
use Carbon\Carbon;
use Faker;
use Model;
use RainLab\User\Models\User;
use Speedcube\Speedcube\Models\Config;
use Speedcube\Speedcube\Models\KeyboardConfig;
use Speedcube\Speedcube\Models\Scramble;
use Speedcube\Speedcube\Models\Solve;

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
     * Create and complete a solve.
     * 
     * @param  \RainLab\User\Models\User            $user
     * @param  integer                              $duration
     * @param  string                               $puzzle
     * @return \Speedcube\Speedcube\Models\Solve
     */
    public static function completedSolve($user, $duration = 5000, $puzzle = '3x3')
    {
        $scramble = self::create(new Scramble, ['puzzle' => $puzzle]);
        $scramble->scramble = 'R U R-';
        $scramble->save();

        $solve = Factory::create(new Solve, [
            'scramble_id' => $scramble->id,
            'user_id' => $user->id,
        ]);

        $endAt = $duration + 1000;

        $solve ->complete("100:X 200:X- 1000#START 2000:R 3000:U- 4000:R- {$endAt}#END");

        return $solve;
    }

    /**
     * Create a model and save it to the database.
     *
     * @param  Model    $model  Model to create
     * @param  array    $omit   Data to fill model with
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
     * Comment
     */    
    public static function comment(array $data = [])
    {
        return [
            // ...
        ];
    }

    /**
     * Create a scramble with a given set of turns.
     * 
     * @param  string   $turns
     * @param  string   $puzzle
     * @return Scramble
     */
    public static function createScrambleWithTurns($turns = '', $puzzle = '3x3')
    {
        $scramble = self::create(new Scramble, [
            'puzzle' => $puzzle,
        ]);

        $scramble->scramble = $turns;

        $scramble->save();

        return $scramble;
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
            case 'Speedcube\Speedcube\Models\Comment': $seed = self::comment($data); break;
            case 'Speedcube\Speedcube\Models\Config': $seed = self::config($data); break;
            case 'Speedcube\Speedcube\Models\KeyboardConfig': $seed = self::keyboardConfig($data); break;
            case 'Speedcube\Speedcube\Models\PersonalRecordAverage': $seed = self::personalRecordAverage($data); break;
            case 'Speedcube\Speedcube\Models\Scramble': $seed = self::scramble($data); break;
            case 'Speedcube\Speedcube\Models\Solve': $seed = self::solve($data); break;
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
     * Speedcube\Speedcube\Models\Solve
     *
     * @param  array $data
     * @return array
     */
    public static function getSolveData(array $data = [])
    {
        $faker = Faker\Factory::create();

        return [
            
        ];
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

    /**
     * Config
     */
    public static function config(array $data = [])
    {
        return [
            'config' => [],
            'puzzle' => '',
        ];
    }

    /**
     * KeyboardConfig
     */
    public static function keyboardConfig(array $data = [])
    {
        return [
            // ...
        ];
    }

    /**
     * PersonalRecordAverage
     */
    public static function personalRecordAverage(array $data = [])
    {
        return [
            // ...
        ];
    }

    /**
     * Scramble
     */
    public static function scramble(array $data = [])
    {
        return [
            'puzzle' => '3x3',
        ];
    }

    /**
     * Solve
     */
    public static function solve(array $data = [])
    {
        return [
            // ...
        ];
    }
}