<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class BaseModel extends Model
{
    /**
     * Attributes to hash if dirty before saving.
     */
    public $hashable = [];

    /**
     * Attributes to purge from the model before saving.
     */
    public $purgeable = [];

    /**
     * Validation rules.
     */
    public $rules = [];

    /**
     * Boot.
     *
     * @return void
     */
    protected static function booted()
    {
        static::saving(function ($model) {
            $model->validate();
            $model->purge();
            $model->hash();
        });
    }

    /**
     * Hash attributes.
     *
     * @return void
     */
    public function hash()
    {
        foreach ($this->hashable as $field) {
            if ($this->isDirty($field)) {
                $this->setAttribute($field, Hash::make($this->getAttribute($field)));
            }
        }
    }

    /**
     * Purge attributes.
     *
     * @return void
     */
    public function purge()
    {
        $this->attributes = array_diff_key($this->attributes, array_flip($this->purgeable));
    }

    /**
     * Validate the model.
     *
     * @return void
     */
    public function validate()
    {
        $validator = Validator::make($this->attributes, $this->validation());

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    /**
     * Process validation rules.
     *
     * @return array
     */
    public function validation()
    {
        $processed = [];

        foreach ($this->rules as $field => $rules) {
            $processed[$field] = [];

            foreach ($rules as $rule) {
                // required:create
                if ($rule === 'required:create') {
                    !$this->exists && array_push($processed[$field], 'required');
                }

                // required:update
                elseif ($rule === 'required:update') {
                    $this->exists && array_push($processed[$field], 'required');
                }

                // unique:table
                elseif (Str::startsWith($rule, 'unique')) {
                    !$this->exists && array_push($processed[$field], $this->validationUnique($rule, $field));
                }

                // standard rules
                else {
                    array_push($processed[$field], $rule);   
                }
            }
        }

        return $processed;
    }

    /**
     * Process validation unique rule.
     *
     * @param string $definition
     * @param string $fieldName
     *
     * @return string
     */
    protected function validationUnique($definition, $fieldName)
    {
        list($table, $column, $except, $idColumn) = array_pad(explode(',', $definition), 4, null);

        $table = 'unique:' . $this->getTable();
        $column = $column ?: $fieldName;
        $except = $except ?: $this->getKey();
        $idColumn = $idColumn ?: $this->getKeyName();

        return implode(',', [$table, $column, $except, $idColumn]);
    }
}
