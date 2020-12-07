<?php

namespace Database\Factories;

use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator;

class CommentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Model::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //
        ];
    }

    $factory->define(App\Comment::class, function (Faker $faker) {
        return [
            'content' => substr($faker->text, 0, 500),
            'user_id' => fn() =>factory(App\User::class->create()->id,
        ];
    });
}
