<?php

namespace Tests\Feature;

use App\Models\User;
use DB;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
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

        $user = Auth::user();

        $data = $response->json();

        $this->assertEquals(1, User::count());
        $this->assertEquals($user->email, $data['user']['email']);
        $this->assertEquals($user->id, $data['user']['id']);
        $this->assertEquals($user->username, $data['user']['username']);
    }

    public function test_password_can_be_reset_with_valid_token()
    {
        Notification::fake();

        $user = User::factory()->create();

        $response = $this->json('POST', '/api/users/forgot-password', [
            'email' => $user->email,
        ]);

        $response->assertStatus(200);

        Notification::assertSentTo($user, ResetPassword::class, function ($notification) use ($user) {
            $response = $this->json('POST', '/api/users/reset-password', [
                'email' => $user->email,
                'passwordConfirmation' => 'password',
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

        $this->assertTrue(
            Auth::attempt([
                'username' => $user->username,
                'password' => 'password',
            ])
        );
    }

    public function test_forgot_password_with_bad_email()
    {
        $response = $this->json('POST', '/api/users/forgot-password', [
            'email' => 'foo@bar.com',
        ]);

        $response->assertStatus(401);
    }

    public function test_update_password_success()
    {
        $user = User::factory()->create();

        $request = $this
            ->actingAs($user)
            ->json('POST', '/api/users/' . $user->id, [
                'current_password' => 'password',
                'password' => '12345678',
                'password_confirmation' => '12345678',
            ]);

        $request->assertStatus(200);

        $this->assertFalse(
            Auth::attempt([
                'username' => $user->username,
                'password' => 'password',
            ])
        );

        $this->assertTrue(
            Auth::attempt([
                'username' => $user->username,
                'password' => '12345678',
            ])
        );
    }

    public function test_update_password_as_guest()
    {
        $user = User::factory()->create();

        $request = $this->json('POST', '/api/users/' . $user->id, [
            'current_password' => 'password',
            'password' => '12345678',
            'password_confirmation' => '12345678',
        ]);

        $request->assertStatus(401);
    }

    public function test_update_password_without_current_password()
    {
        $user = User::factory()->create();

        $request = $this
            ->actingAs($user)
            ->json('POST', '/api/users/' . $user->id, [
                'password' => '12345678',
                'password_confirmation' => '12345678',
            ]);

        $request->assertStatus(422);
    }

    public function test_update_password_as_wrong_user()
    {
        $john = User::factory()->create();
        $sally = User::factory()->create();

        $response = $this
            ->actingAs($sally)
            ->json('POST', '/api/users/' . $john->id, [
                'current_password' => 'password',
                'password' => '12345678',
                'password_confirmation' => '12345678',
            ]);

        $response->assertStatus(401);
    }

    public function test_update_password_with_wrong_current_password()
    {
        $user = User::factory()->create();

        $request = $this
            ->actingAs($user)
            ->json('POST', '/api/users/' . $user->id, [
                'current_password' => 'wrong password',
                'password' => '12345678',
                'password_confirmation' => '12345678',
            ]);

        $request->assertStatus(422);
    }
}
