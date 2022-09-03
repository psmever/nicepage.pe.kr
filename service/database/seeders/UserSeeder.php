<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(env('APP_ENV') !== "production") {

            DB::table('users')->insert([
                'uuid' => Str::uuid()->toString(),
                'name' => Str::random(10),
                'nickname' => Str::random(10),
                'email' => 'admin@site.com',
                'password' => Hash::make('password'),
                'level' => 'A02999',
                'email_verified_at' => \Carbon\Carbon::now(),
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ]);

            DB::table('users')->insert([
                'uuid' => Str::uuid()->toString(),
                'name' => Str::random(10),
                'nickname' => Str::random(10),
                'email' => 'test@test.com',
                'password' => Hash::make('password'),
                'level' => 'A02000',
                'email_verified_at' => \Carbon\Carbon::now(),
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ]);
        }
    }
}
