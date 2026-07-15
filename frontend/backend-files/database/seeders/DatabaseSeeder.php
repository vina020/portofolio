<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin account used to log into the admin panel.
        // CHANGE THIS PASSWORD after first login (see DEPLOYMENT.md).
        User::firstOrCreate(
            ['email' => 'vinanurainina@gmail.com'],
            [
                'name' => 'Vina Nur Aini',
                'password' => Hash::make('ChangeMe123!'),
            ]
        );

        $this->call([
            PortfolioSeeder::class,
        ]);
    }
}
