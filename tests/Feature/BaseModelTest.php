<?php

namespace Tests\Feature;

use App\Models\BaseModel;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class TestModel extends BaseModel
{
    protected $table = 'models';
}

class BaseModelTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        Schema::create('models', function (Blueprint $table) {
            $table->temporary();
            $table->id();
            $table->string('field');
            $table->timestamps();
        });
    }

    public function test_hashable()
    {
        $model = new class extends TestModel
        {
            public $hashable = ['field'];
        };
        
        $model->field = 'value';

        $this->assertEquals('value', $model->field);

        $model->save();

        $this->assertEquals(60, strlen($model->field));
        $this->assertTrue(Str::startsWith($model->field, '$2y$'));
    }

    public function test_purgeable()
    {
        $model = new class extends TestModel
        {
            public $attributes = [
                'field' => 'value',
                'password_confirmation' => '12345678',
            ];

            public $purgeable = [
                'password_confirmation',
            ];
        };

        $this->assertArrayHasKey('password_confirmation', $model->attributes);

        $model->save();

        $this->assertEquals('value', $model->field);
        $this->assertArrayNotHasKey('password_confirmation', $model->attributes);
    }

    public function test_validation_failure()
    {
        $model = new class extends TestModel
        {
            public $attributes = [
                'field' => 'not an email',
            ];

            public $rules = [
                'field' => ['email'],
            ];
        };

        $this->expectException(ValidationException::class);

        $model->save();
    }

    public function test_validation_required_create()
    {
        $model = new class extends TestModel
        {
            public $attributes = [
                'field' => 'value',
            ];

            public $rules = [
                'field' => ['required_create'],
            ];
        };

        $this->assertEquals([
            'field' => ['required'],
        ], $model->validationRules());

        $model->save();

        $this->assertEquals([
            'field' => [],
        ], $model->validationRules());
    }

    public function test_validation_required_update()
    {
        $model = new class extends TestModel
        {
            public $attributes = [
                'field' => '',
            ];

            public $rules = [
                'field' => ['required_update'],
            ];
        };

        $this->assertEquals([
            'field' => []
        ], $model->validationRules());

        $model->save();

        $this->assertEquals([
            'field' => ['required'],
        ], $model->validationRules());
    }

    public function test_validation_required_with_update()
    {
        $model = new class extends TestModel
        {
            public $attributes = [
                'field' => '',
            ];

            public $rules = [
                'field' => ['required_with_update:foo,bar'],
            ];
        };

        $this->assertEquals([
            'field' => []
        ], $model->validationRules());

        $model->save();

        $this->assertEquals([
            'field' => ['required_with:foo,bar'],
        ], $model->validationRules());
    }

    public function test_validation_unique()
    {
        $model = new class extends TestModel
        {
            public $attributes = [
                'id' => 1,
            ];

            public $rules = [
                'field' => ['unique'],
            ];
        };

        $this->assertEquals([
            'field' => ['unique:models,field,1,id'],
        ], $model->validationRules());
    }

    public function test_validation_hashable()
    {
        $model = new class extends TestModel
        {
            public $hashable = ['field'];

            public $purgeable = ['field_confirmation'];

            public $rules = [
                'field' => ['confirmed'],
            ];
        };

        // create should validate
        $model->field = 'one';
        $model->field_confirmation = 'one';
        $this->assertArrayHasKey('field', $model->validationAttributes());
        $model->save();

        // non-dirty hashable fields should not re-validate
        $this->assertArrayNotHasKey('field', $model->validationAttributes());
        $model->save();

        // dirty hashable fields should re-validate
        $model->field = 'two';
        $this->assertArrayHasKey('field', $model->validationAttributes());
        $this->expectException(ValidationException::class);
        $model->save();
    }
}
