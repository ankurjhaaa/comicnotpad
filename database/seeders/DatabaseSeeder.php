<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Ankur Jha',
            'username' => 'ankur',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'), // password
        ]);

        $this->callWith(NodeSeeder::class, ['user' => $user]);
    }
}
