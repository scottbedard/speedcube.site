<?php

namespace Tests\Feature;

use App\Models\BaseModel;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
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
                'field' => ['required:create'],
            ];
        };

        $this->assertEquals([
            'field' => ['required'],
        ], $model->validation());

        $model->save();

        $this->assertEquals([
            'field' => [],
        ], $model->validation());
    }

    public function test_validation_required_update()
    {
        $model = new class extends TestModel
        {
            public $attributes = [
                'field' => '',
            ];

            public $rules = [
                'field' => ['required:update'],
            ];
        };

        $this->assertEquals([
            'field' => []
        ], $model->validation());

        $model->save();

        $this->assertEquals([
            'field' => ['required'],
        ], $model->validation());
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
        ], $model->validation());
    }
}
