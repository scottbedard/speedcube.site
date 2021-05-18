<?php

namespace Database\Factories;

use App\Models\PuzzleConfig;
use Illuminate\Database\Eloquent\Factories\Factory;

class PuzzleConfigFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PuzzleConfig::class;

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
