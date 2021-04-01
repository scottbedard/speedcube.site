<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class UsersTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_user()
    {
        Event::fake();

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

        Event::assertDispatched(Registered::class);
    }
}
