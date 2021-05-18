<?php

namespace Database\Factories;

use App\Models\KeyboardConfig;
use Illuminate\Database\Eloquent\Factories\Factory;

class KeyboardConfigFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = KeyboardConfig::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'config' => '{}',
        ];
    }
}
