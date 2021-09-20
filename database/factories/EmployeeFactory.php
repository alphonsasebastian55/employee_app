<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Designation;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Employee::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'image_path' =>storage_path('files/uploads/sample.png'),
            'designation_id' =>  $this->faker->unique()->numberBetween(1, \App\Models\Designation::count()),
        ];
    }
}
