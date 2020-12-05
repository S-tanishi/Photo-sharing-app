<?php

namespace Database\Factories;

use App\Models\Photo;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

class PhotoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Photo::class;

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
    $factory->define(App\Models\Photo::class, function (Faker $faker) {
        return [
            'id' => Str::random(12),
            'user_id' => fn() => factory(App\User::class)->create()->id,
            'filename' => Str::random(12) . '.jpg',
            'created_at' => $faker->dateTime(),
            'updated_at' => $faker->dateTime(),
        ];

    });
}
