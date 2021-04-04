<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class UsersTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_user()
    {
        $response = $this->json('POST', '/api/users', [
            'username' => 'AwesomeCuber',
            'email' => 'awesome.cuber@example.com',
            'password' => '12345678',
            'passwordConfirmation' => '12345678',
        ]);

        $response->assertStatus(200);

        $data = $response->json();

        $this->assertEquals(1, User::count());
        $this->assertEquals('AwesomeCuber', $data['user']['username']);
        $this->assertEquals('awesome.cuber@example.com', $data['user']['email']);

        $user = Auth::user();

        $this->assertEquals('AwesomeCuber', $user->username);
    }

    public function test_forgot_password()
    {
        $user = User::create([
            'email' => 'awesome.cuber@example.com',
            'password_confirmation' => '12345678',
            'password' => '12345678',
            'username' => 'AwesomeCuber',
        ]);

        $response = $this->json('POST', '/api/users/forgot-password', [
            'email' => 'awesome.cuber@example.com',
        ]);

        $response->assertStatus(200);

        $data = $response->json();

        $this->assertEquals([
            'status' => 'passwords.sent',
        ], $data);
    }
}
