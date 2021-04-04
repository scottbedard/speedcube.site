<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_success()
    {
        $user = User::create([
            'email' => 'awesome.cuber@example.com',
            'password_confirmation' => '12345678',
            'password' => '12345678',
            'username' => 'AwesomeCuber',
        ]);

        $this->assertFalse(Auth::check());

        $response = $this->json('POST', '/api/auth/login', [
            'password' => '12345678',
            'remember' => false,
            'username' => 'AwesomeCuber',
        ]);

        $response->assertStatus(200);

        $data = $response->json();

        $this->assertTrue(Auth::check());
        $this->assertEquals('AwesomeCuber', $data['user']['username']);
        $this->assertEquals('awesome.cuber@example.com', $data['user']['email']);
    }

    public function test_login_failed()
    {
        $user = User::create([
            'email' => 'awesome.cuber@example.com',
            'password_confirmation' => '12345678',
            'password' => '12345678',
            'username' => 'AwesomeCuber',
        ]);

        $this->assertFalse(Auth::check());

        $response = $this->json('POST', '/api/auth/login', [
            'password' => 'wrong password',
            'remember' => false,
            'username' => 'AwesomeCuber',
        ]);

        $response->assertStatus(401);

        $this->assertFalse(Auth::check());
    }

    public function test_logout()
    {
        Auth::login(User::create([
            'email' => 'awesome.cuber@example.com',
            'password_confirmation' => '12345678',
            'password' => '12345678',
            'username' => 'AwesomeCuber',
        ]));

        $this->assertTrue(Auth::check());

        $response = $this->get('/api/auth/logout');

        $response->assertStatus(200);

        $this->assertFalse(Auth::check());
    }
}
