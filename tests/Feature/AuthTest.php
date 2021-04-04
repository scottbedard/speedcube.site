<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_login()
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

        $this->assertEquals('AwesomeCuber', $data['user']['username']);
        $this->assertEquals('awesome.cuber@example.com', $data['user']['email']);

        $user = Auth::user();
        
        $this->assertEquals('AwesomeCuber', $user->username);
    }
}
