<?php

namespace Tests\Feature\Traits;

use App\Models\Traits\Validation;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class ValidationTest extends TestCase
{
    use Validation;

    public $attributes = [];

    public $exists = false;

    public $id = null;

    public $rules = [];

    protected function getKey()
    {
        return $this->id;
    }

    protected function getKeyName()
    {
        return 'id';
    }

    protected function getTable()
    {
        return 'users';
    }

    protected function setup(): void
    {
        parent::setup();
        $this->attributes = [];
        $this->exists = false;
        $this->id = null;
        $this->rules = [];
    }

    public function test_required_create()
    {
        $this->rules = [
            'email' => ['required:create'],
        ];

        $this->assertEquals([
            'email' => ['required'],
        ], $this->processValidationRules());
    }

    public function test_required_update()
    {
        $this->rules = [
            'email' => ['required:update'],
        ];

        $this->assertEquals([
            'email' => [],
        ], $this->processValidationRules());

        $this->exists = true;

        $this->assertEquals([
            'email' => ['required'],
        ], $this->processValidationRules());
    }

    public function test_unique()
    {
        $this->id = 1;

        $this->rules = [
            'email' => ['unique:users'],
        ];

        $this->assertEquals([
            'email' => ['unique:users,email,1,id'],
        ], $this->processValidationRules());
    }

    public function test_validate()
    {
        $this->attributes = [
            'email' => 'foo@bar.com',
        ];

        $this->rules = [
            'email' => ['email'],
        ];

        $this->validate();

        $this->attributes['email'] = 'not an email address';

        $this->expectException(ValidationException::class);

        $this->validate();
    }
}
