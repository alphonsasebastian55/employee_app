<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
Use Database\Seeders\DesignationSeeder;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            DesignationSeeder::class,
        ]);
         \App\Models\Employee::factory(3)->create();
    }
}
