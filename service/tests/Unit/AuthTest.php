<?php

namespace Tests\Unit;

use App\Models\User;
use Tests\CustomTestCase;

class AuthTest extends CustomTestCase
{
    public function setUp(): void
    {
        parent::setUp();
    }

    public function test_로그인()
    {
        $this->withHeaders($this->defaultRequestHeaders())->json('POST', "/api/v1/auth/login", [
            "email" => User::where('level', config('extract.default.normal_user_level'))->orderBy('id', 'ASC')->first()->email,
            "password" => "password"
        ])
            ->assertStatus(200)
            ->assertJsonStructure([
                'access_token',
                'refresh_token'
            ]);
    }

    public function test_토큰_리프레시()
    {
        $task = $this->withHeaders($this->defaultRequestHeaders())->json('POST', "/api/v1/auth/login", [
            "email" => User::where('level', config('extract.default.normal_user_level'))->orderBy('id', 'ASC')->first()->email,
            "password" => "password"
        ])
            ->assertStatus(200)
            ->assertJsonStructure([
                'access_token',
                'refresh_token'
            ]);

        $this->withHeaders($this->defaultRequestHeaders())->json('POST', "/api/v1/auth/token-refresh", [
            "refresh_token" => $task['refresh_token'],
        ])
            ->assertStatus(200)
            ->assertJsonStructure([
                'access_token',
                'refresh_token'
            ]);
    }

    public function test_로그아웃()
    {
        $this->withHeaders($this->accessTokenRequestHeader())->json('POST', "/api/v1/auth/logout")
            ->assertStatus(204);
    }
}
