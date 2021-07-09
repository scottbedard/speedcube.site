<?php

namespace Database\Factories;

use App\Models\Solve;
use Illuminate\Database\Eloquent\Factories\Factory;

class SolveFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Solve::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'puzzle' => '3x3',
        ];
    }

    /**
     * Complete
     */
    public function complete()
    {
        return $this->state(function (array $attributes) {
            return [
                'scramble' => 'R-',
                'solution' => '1000#START 2000:R 3000#END',
                'status' => 'complete',
                'time' => 2000,
            ];
        });
    }
}
