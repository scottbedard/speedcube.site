<?php

namespace Tests\Feature;

use App\Models\User;
use DB;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Tests\TestCase;

class UsersTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_user()
    {
        $response = $this->json('POST', '/api/users', [
            'email' => 'awesome.cuber@example.com',
            'password' => '12345678',
            'passwordConfirmation' => '12345678',
            'username' => 'AwesomeCuber',
        ]);

        $response->assertStatus(200);

        $data = $response->json();

        $this->assertEquals(1, User::count());
        $this->assertEquals('AwesomeCuber', $data['user']['username']);
        $this->assertEquals('awesome.cuber@example.com', $data['user']['email']);

        $user = Auth::user();

        $this->assertEquals('AwesomeCuber', $user->username);
    }

    public function test_password_can_be_reset_with_valid_token()
    {
        Notification::fake();

        $user = User::create([
            'email' => 'awesome.cuber@example.com',
            'password_confirmation' => '12345678',
            'password' => '12345678',
            'username' => 'AwesomeCuber',
        ]);

        $this->post('/api/users/forgot-password', ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPassword::class, function ($notification) use ($user) {
            $response = $this->post('/api/users/reset-password', [
                'email' => $user->email,
                'password_confirmation' => 'password',
                'password' => 'password',
                'token' => $notification->token,
            ]);

            $response->assertSessionHasNoErrors();

            $response->assertStatus(200);

            $this->assertEquals([
                'success' => true,
            ], $response->json());
            
            return true;
        });
    }
}
