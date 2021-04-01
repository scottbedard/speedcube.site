<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UsersTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_user()
    {
        $this->assertEquals(0, User::count());

        $response = $this->json('POST', '/api/users', [
            'username' => 'AwesomeCuber',
            'email' => 'awesome.cuber@example.com',
            'password' => '12345678',
            'passwordConfirmation' => '12345678',
        ]);

        $response->assertStatus(200);
        
        $this->assertEquals(1, User::count());
    }
}
